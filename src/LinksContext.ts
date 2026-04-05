import { createContext } from "react";

export type Links = Record<string, string>;

export type LinksContextType = {
  links: Links;
  addLink: (code: string, url: string) => void;
};

export const LinksContext = createContext<LinksContextType | null>(null);
