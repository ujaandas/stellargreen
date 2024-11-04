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
  console.log(`location: ${location}`);

  switch (location.toLowerCase()) {
    case "hong_kong":
      return NextResponse.json(hongKongData);
    case "kadoorie":
      return NextResponse.json(kadoorieData);
    case "junshan":
      return NextResponse.json(junshanData);
    case "bhutan":
      return NextResponse.json(bhutanData);
  }
}

const hongKongData: LocationTabData = {
  overview: `overview for hong kong goes here`,
  keyIndex: `key index for hong kong goes here`,
  iucnScore: `iucn for hong kong goes here`,
};

const kadoorieData: LocationTabData = {
  overview:
    "As part of our drive to better understand the factors that govern forest succession and constrain the restoration of ecosystem resilience, KFBG established a series of experimental forest restoration plots at the top of our site in 2013. Every year, KFBG organises a number of tree planting activities aimed at gradually converting these degraded grassy slopes into diverse native forest that can support a wide variety of wildlife. Since the plots were set up, more than 60,000 tree seedlings representing more than 300 native species have been planted. All of these seedlings were raised in our nurseries from seeds collected in Hong Kong's Country Parks.",
  keyIndex: `key index for kadoorie goes here`,
  iucnScore: `iucn for kadoorie goes here`,
};

const junshanData: LocationTabData = {
  overview: `overview for junshan goes here`,
  keyIndex: `key index for junshan goes here`,
  iucnScore: `iucn for junshan goes here`,
};

const bhutanData: LocationTabData = {
  overview: `overview for bhutan goes here`,
  keyIndex: `key index for bhutan goes here`,
  iucnScore: `iucn for bhutan goes here`,
};
