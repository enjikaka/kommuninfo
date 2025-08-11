import { exists } from "jsr:@std/fs/exists";

import { pdfText } from "jsr:@pdf/pdftext@1.3.2";

import { Årjäng } from "./kf.ts";
import { summarize } from "./scripts/summarize.ts";

const kommun = new Årjäng();

const protocols = await kommun.getProtocols(2025);

for await (const [date, link] of Object.entries(protocols)) {
  const filename = `${kommun.code}/${date}.md`;

  const fileExists = await exists(filename);

  if (fileExists) {
    console.log(`${filename} already exists`);
    continue;
  }

  console.log(`Creating new entry: ${filename}`);

  const response = await fetch(link);
  const pdfBuffer = await response.arrayBuffer();
  const page: { [pageno: number]: string } = await pdfText(
    new Uint8Array(pdfBuffer),
  );

  const summary = await summarize(JSON.stringify(page));

  Deno.mkdirSync(`kommunfullmäktige/${kommun.code}`, { recursive: true });

  Deno.writeTextFileSync(
    `kommunfullmäktige/${kommun.code}/${date}.md`,
    summary,
  );
}
