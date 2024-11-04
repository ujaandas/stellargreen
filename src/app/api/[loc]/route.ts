import { NextRequest, NextResponse } from "next/server";

export type LocationTabData = {
  overview: string;
  keyIndex: string;
  iucnScore: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ loc: string }> }
) {
  const location = (await params).loc;

  const data: LocationTabData = {
    overview: `overview for ${location} goes here`,
    keyIndex: `key index for ${location} goes here`,
    iucnScore: `iucn for ${location} goes here`,
  };

  return NextResponse.json(data);
}
