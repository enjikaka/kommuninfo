import { pdfText } from "jsr:@pdf/pdftext@1.3.2";

import { Årjäng } from "./kf.ts";
import { summarize } from "./scripts/summarize.ts";

const kommun = new Årjäng();

const protocols = await kommun.getProtocols(2025);

console.log(protocols);
/*
const response = await fetch(Object.entries(protocols)[0][1]);
const pdfBuffer = await response.arrayBuffer();
const page: { [pageno: number]: string } = await pdfText(
  new Uint8Array(pdfBuffer),
);

const summary = await summarize(JSON.stringify(page));

Deno.mkdirSync(`kommunfullmäktige/${kommun.code}`, { recursive: true });

Deno.writeTextFileSync(
  `kommunfullmäktige/${kommun.code}/${Object.entries(protocols)[0][0]}.md`,
  summary,
);
*/
