import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";

const domParser = new DOMParser();

export function parseHTML(html: string): HTMLDocument {
  return domParser.parseFromString(html, "text/html");
}
