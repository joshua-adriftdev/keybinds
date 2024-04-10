type ShortcutCallback = () => void;

export interface Shortcut {
  label?: string;
  category?: string;
  keys: string[];
  callback: ShortcutCallback;
}

const allShortcuts: Shortcut[] = [];
let categoryMap = new Map<String, Shortcut[]>();

export function initialiseShortcuts(shortcuts: Shortcut[]): () => void {
  const callbackRef: { [key: string]: ShortcutCallback } = {};

  const handleKeyPress = (event: KeyboardEvent) => {
    const allKeys = {
      Control: event.ctrlKey,
      Shift: event.shiftKey,
      Alt: event.altKey,
      Meta: event.metaKey,
      key: event.key,
    };

    const pressedKeys = getPressedKeysNames(allKeys);

    shortcuts.forEach(shortcut => {
      if (shortcut.keys.every((key => pressedKeys.includes(key.toLowerCase())))) {
        shortcut.callback();
      }
    });
  };

  document.addEventListener('keydown', handleKeyPress);

  // Register shortcuts
  shortcuts.forEach((shortcut) => { 
    if (allShortcuts.indexOf(shortcut) === -1) {
      // Shortcut does not already exist
      allShortcuts.push(shortcut);
      const keyString = shortcut.keys.join('+');
      callbackRef[keyString] = shortcut.callback;

      if (shortcut.category) {
        // the shortcut has a specified category
        let category = shortcut.category.toLowerCase();
        console.log("Category: " + category);
        if (categoryMap.has(category)) {
          if (categoryMap.get(category)?.indexOf(shortcut) === -1) {
            categoryMap.get(category)?.push(shortcut);
            console.log("")
          }
        } else {
          let newArray = [shortcut];
          categoryMap.set(category, newArray);
          
          console.log("Creating Category")
          console.log(categoryMap)
        }
      }
    }
  });

  // Return a cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
    // Cleanup callback references
    Object.keys(callbackRef).forEach((key) => {
      delete callbackRef[key];
    });
  };
}

export function callShortcut(shortcut: Shortcut): void {
  shortcut.callback();
}

export function getShortcuts(): Shortcut[] {
  return allShortcuts;
}

export function getCategoryMap(): Map<String, Shortcut[]> {
  console.log("CM: " + categoryMap.has("text") + " | " + categoryMap)

  return categoryMap;
}

function getPressedKeysNames(pressedKeys: {
  Control: boolean;
  Shift: boolean;
  Alt: boolean;
  Meta: boolean;
  key: string;
}): string[] {
  const keys: string[] = [];

  if (pressedKeys.Control) keys.push('control');
  if (pressedKeys.Shift) keys.push('shift');
  if (pressedKeys.Alt) keys.push('alt');
  if (pressedKeys.Meta) keys.push('meta');
  if (pressedKeys.key) keys.push(pressedKeys.key.toLowerCase());

  return keys;
}