import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type DataProps = { position: string; function: string; buyerPersona: string };

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const position = searchParams.get("position")?.toLowerCase();
  const dataRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/data.json`);
  const data: DataProps[] = await dataRes.json();

  const strFunctions = data.map((d) => d.function);
  const functions = strFunctions.filter(
    (strFunction, i) =>
      strFunctions.indexOf(strFunction) === i && strFunction !== ""
  );
  const strBuyerPersonas = data.map((d) => d.buyerPersona);
  const buyerPersonas = strBuyerPersonas.filter(
    (buyerPersona, i) =>
      strBuyerPersonas.indexOf(buyerPersona) === i && buyerPersona !== ""
  );

  const foundData = data.find((d) => d.position.toLowerCase() === position);
  if (foundData) {
    const res = {
      function: foundData.function,
      buyerPersona: foundData.buyerPersona,
    };

    return NextResponse.json(res, { status: 200 });
  }

  const jsonFormat = {
    function: `Insert the function here. It can be only one of those values: ${functions}`,
    buyerPersona: `Insert the buyer persona here. It can be only one of those values: ${buyerPersonas}`,
  };

  const jsonResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `Find the function and buyer persona of the following position: "${position}". Here is an example array of matching data: ${JSON.stringify(
          data
        )}. Provide output in a valid JSON format. The data schema should be one single object like this: ${JSON.stringify(
          jsonFormat
        )}.`,
      },
    ],
  });

  const content = jsonResponse.choices[0].message.content;

  const res = JSON.parse(content || "");

  return NextResponse.json(res, { status: 200 });
}
