import React, { useEffect, useReducer, useState } from "react";
import { callShortcut, getCategoryMap, getShortcuts, Shortcut } from "./shortcuts";
import { Button, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShortcutDialog() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [categories, setCategories] = useState<Map<String, Shortcut[]>>();
  const [loading, setLoading] = useState(true);

  const [displayedShortcuts, setDisplayedShortcuts] = useState<Shortcut[]>([]);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const fetchShortcuts = async () => {
      try {
        const fetchedShortcuts = await getShortcuts();
        setShortcuts(fetchedShortcuts);

      } catch (error) {
        console.error("Error fetching shortcuts:", error);
      } finally {
        //setLoading(false);
      }
    };

    fetchShortcuts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategoryMap();

        setCategories(fetchedCategories);

      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  function format(shortcut: string[]): string {
    let current = "";

    shortcut.forEach(str => {
        current += titleCase(str) + " + ";
    });

    current = current.substring(0, current.length - 3);

    return current;
  }

  function titleCase(str: string): string {
    let current = str.toLowerCase();
    current = current.charAt(0).toUpperCase() + current.slice(1);

    return current;
  }

  function log(str: string) {
    console.log(str);
    return (<div>{str}</div>)
  }

  return (
    <div className="">
      {loading || !categories ? (
        <div>Loading...</div>
      ) : (
        <div> 
            <Popover>
                <PopoverHandler>
                    <Button variant="gradient">Shortcuts</Button>
                </PopoverHandler>
                <PopoverContent style={{ width: "128px"}}>
                  {displayedShortcuts.length >= 1 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <button onClick={() => {
                        setDisplayedShortcuts([])
                      }}>
                        <div className="flex gap-4 align-middle ml-[-10px]">
                          <FontAwesomeIcon size="sm" className="text-black align-middle" style={{marginTop: `3px`}} icon={faChevronLeft}/>
                          <div className="uppercase font-bold text-black">Back</div>
                        </div>
                      </button>
                      {displayedShortcuts.map((shortcut, index) => (
                          <div key={index}>
                              <div style={{ marginBottom: "10px"}}>{shortcut.label}</div>
                              <Button variant="outlined" className="" onClick={() => {
                                  callShortcut(shortcut);
                              }}>{format(shortcut.keys)}</Button>
                          </div>
                        ))}
                    </div>
                    ) : (
                      // Display all categories
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        {
                          // @ts-ignore
                          [...categories].map(([name, shortcuts]) => 
                            <button onClick={() => setDisplayedShortcuts(shortcuts)}>
                              <div className="flex gap-4 align-middle ml-[-10px]">
                                <div className="uppercase font-bold text-black">{name}</div>
                                <FontAwesomeIcon size="sm" className="text-black align-middle" style={{marginTop: `3px`}} icon={faChevronRight}/>
                              </div>
                            </button>
                          )
                        }
                        {shortcuts.map((shortcut, index) => (
                            <div key={index} className={shortcut.category? `hidden` : ``}>
                                <div style={{ marginBottom: "10px"}}>{shortcut.label}</div>
                                <Button variant="outlined" className="" onClick={() => {
                                    callShortcut(shortcut);
                                }}>{format(shortcut.keys)}</Button>
                            </div>
                        ))}
                    </div>
                    )
                  }
                    
                </PopoverContent>
            </Popover>
        </div>
      )}
    </div>
  );
}
