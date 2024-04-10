
import ShortcutDialog from "@/shortcuts/ShortcutDialog";
import { initialiseShortcuts } from "@/shortcuts/shortcuts";
import { useCallback, useEffect, useState } from "react";

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
    { keys: ['O'], callback: toggleText},
    { keys: ['P'], callback: toggleColour},
  ];

  useEffect(() => {
    const cleanupShortcuts = initialiseShortcuts(shortcuts);

    // Cleanup on component unmount
    return () => {
      cleanupShortcuts();
    };
  }, [shortcuts]);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${colour ? 'text-blue-500' : 'text-black'}`}>
      <div>{text ? " Hello" : "Secondary Text"}</div>
    </main>
  );
}


