import React, { createContext, useState, useEffect } from 'react';

interface SideBarContextData {
  opened: boolean;
  opening(): void;
}

const SideBarContext = createContext<SideBarContextData>(
  {} as SideBarContextData,
);

export const SideBarProvider: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false);
  function opening() {
    setOpened(!opened);
  }
  return (
    <SideBarContext.Provider value={{ opened, opening }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContext;
