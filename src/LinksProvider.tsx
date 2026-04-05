import { useState } from "react";
import { LinksContext } from "./LinksContext.ts";
import type { Links } from "./LinksContext.ts";

export const LinksProvider = ({ children }: { children: React.ReactNode }) => {
  const [links, setLinks] = useState<Links>(() => {
    return JSON.parse(localStorage.getItem("links") || "{}");
  });

  const addLink = (code: string, url: string) => {
    const newData = { ...links, [code]: url };

    localStorage.setItem("links", JSON.stringify(newData));
    setLinks(newData);
  };

  return (
    <LinksContext.Provider value={{ links, addLink }}>
      {children}
    </LinksContext.Provider>
  );
};