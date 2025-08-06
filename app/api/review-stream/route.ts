import { NextResponse } from "next/server";

export async function GET() {
  const rows = [
    {
      id: "1",
      snippet: "Technician was friendly and fixed the issue quickly.",
      attributes: [
        { name: "service", sentiment: "pos" },
        { name: "speed", sentiment: "pos" },
      ],
    },
    {
      id: "2",
      snippet: "Great price but the waiting room was dirty.",
      attributes: [
        { name: "pricing", sentiment: "pos" },
        { name: "cleanliness", sentiment: "neg" },
      ],
    },
    {
      id: "3",
      snippet: "Staff were polite though scheduling took forever.",
      attributes: [
        { name: "staff", sentiment: "pos" },
        { name: "scheduling", sentiment: "neg" },
      ],
    },
    {
      id: "4",
      snippet: "Average experience, nothing special but acceptable.",
      attributes: [{ name: "overall", sentiment: "neu" }],
    },
  ];
  return NextResponse.json({ rows });
}
