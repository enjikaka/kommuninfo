import { getNewLinks } from "./fetch_links.ts";
import { downloadPDF } from "./download_pdf.ts";
import { extractText } from "./extract_text.ts";
import { summarize } from "./summarize.ts";

const links = await getNewLinks();

for (const link of links) {
  const pdfPath = await downloadPDF(link);
  const text = await extractText(pdfPath);
  const markdown = await summarize(text);

  const kommun = "årjäng"; // TODO: härleda från länken
  const datum = "2025-02-17"; // TODO: härleda från filnamn eller metadata
  await Deno.writeTextFile(`./_data/${kommun}/${datum}.md`, markdown);
}
