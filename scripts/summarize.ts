const OPENAI_KEY = Deno.env.get("OPENAI_API_KEY")!;

console.log(OPENAI_KEY);

export async function summarize(text: string): Promise<string> {
  const body = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "Du är en journalist som sammanfattar kommunfullmäktigeprotokoll för invånare. Skriv kort, sakligt och i Markdown.",
      },
      {
        role: "user",
        content: text.slice(0, 12000),
      },
    ],
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  console.log(json);
  return json.choices[0].message.content;
}
