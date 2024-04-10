import { initialiseShortcuts } from "@/shortcuts/shortcuts";
import { useEffect, useState } from "react";

export default function TestComponent() {
    const [text, setText] = useState(true);

    const toggleText = () => {
        setText((prevText) => !prevText);
      };

    const shortcuts = [
    { label: "Toggle Component Text", keys: ['l'], callback: toggleText},
    ];

    useEffect(() => {
    const cleanupShortcuts = initialiseShortcuts(shortcuts);

    // Cleanup on component unmount
    return () => {
        cleanupShortcuts();
    };
    }, [shortcuts]);
      
    return (
        <div className="text-black">
            {text ? "Component Text B " : "Text C"}
        </div>
    );
}