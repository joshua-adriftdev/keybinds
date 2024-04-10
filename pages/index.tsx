
import ShortcutDialog from "@/shortcuts/ShortcutDialog";
import { getCategoryMap, initialiseShortcuts } from "@/shortcuts/shortcuts";
import { useCallback, useEffect, useReducer, useState } from "react";
import TestComponent from "./TestComponent";
import SecondaryComponent from "./SecondaryComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [colour, setColour] = useState(false);
  const [text, setText] = useState(true);

  const toggleText = () => {
    setText((prevText) => !prevText);
  };

  const toggleColour = () => {
    setColour((prevColour) => !prevColour);
  };

  const shortcuts = [
    { label: "Toggle Text", category: "Text Controls", keys: ['t', "CONTROL", "ALT", "SHIFT"], callback: toggleText},
    { label: "Toggle Colour", category: "Text Controls", keys: ['CONTROL', 'Shift', 'K'], callback: toggleColour},
    { label: "A", keys: ['A'], callback: () => {}},
    { label: "BB", keys: ['CONTROL', 'B',], callback: () => {}},
    { label: "Ć", keys: ['CONTROL', 'Shift', 'C'], callback: () => {}},
  ];

  useEffect(() => {
    const cleanupShortcuts = initialiseShortcuts(shortcuts);

    // Cleanup on component unmount
    return () => {
      cleanupShortcuts();
    };
  }, [shortcuts]);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${colour ? 'text-orange-500' : 'text-black'}`}>
      <div>{text ? "Text A" : "Text B"}</div>
                          
      {/* 
        <SecondaryComponent/>
        <TestComponent/> 
      */}
    </main>
  );
}


