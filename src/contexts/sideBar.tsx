import React, { createContext, useState } from 'react';

interface SideBarContextData {
  opened: boolean;
  opening(): void;
  page: string;
  getPage(pageDestination: string): void;
}

const SideBarContext = createContext<SideBarContextData>(
  {} as SideBarContextData,
);

export const SideBarProvider: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(true);
  const [page, setPage] = useState('Home');
  function getPage(pageDestination: string) {
    setPage(pageDestination);
  }
  function opening() {
    setOpened(!opened);
  }
  return (
    <SideBarContext.Provider value={{ opened, opening, page, getPage }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContext;
