import { parseHTML } from "./helpers.ts";

abstract class Kommun {
  abstract link: string;
  abstract code: number; // https://skr.se/skr/tjanster/kommunerochregioner/faktakommunerochregioner/kommunkoder.2052.html
  abstract getKommunInfo(): string;
  abstract getProtocols(): Promise<Record<string, string>>;
}

export class Årjäng extends Kommun {
  link =
    "https://www.arjang.se/kommunalservice/startsida/kommunochpolitik/kommunensorganisation/kommunfullmaktige.3923.html";
  code = 1765;

  getKommunInfo(): string {
    return "Årjäng kommun";
  }

  async getProtocols(year?: number): Promise<Record<string, string>> {
    const response = await fetch(this.link);
    const html = await response.text();
    const document = parseHTML(html);

    let query = ['a[href*="protokoll"]', 'a[href*="KF"]'];

    if (year) {
      query = [
        `a[href*="${year}-"][href*="KF"][href*="Protokoll"]`,
      ];
    } else {
      query = ['a[href*="protokoll"]', 'a[href*="KF"]'];
    }

    const baseUrl = new URL(this.link);
    const anchors = document.querySelectorAll(query.join(","));

    const hrefs = Array
      .from(anchors)
      .map((a) => a.getAttribute("href"))
      .filter(Boolean) as string[];

    const dates = hrefs.map((href) => {
      return href.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A";
    });

    const links = hrefs
      .map((href) => {
        baseUrl.pathname = href;

        return baseUrl.toString();
      });

    const interleaved = dates.map((date, index) => [date, links[index]]);

    return Object.fromEntries(interleaved);
  }
}
