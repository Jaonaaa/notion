import { createContext, useContext, useState } from "react";
import { menuItems } from "../components/navigation/menu/menu-data";

const MenuContext = createContext({
  items: [],
  isOpen: false,
  toggleOpen: () => {},
});

export function MenuContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  return (
    <MenuContext.Provider value={{ items: menuItems, isOpen, toggleOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  return useContext(MenuContext);
}
