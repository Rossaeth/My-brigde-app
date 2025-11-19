import { NextResponse } from "next/server";

export async function GET() {
  // Ganti URL ini
  const appUrl = process.env.NEXT_PUBLIC_URL || "https://circle-bridge-web.vercel.app";

  const config = {
    // !!! HARUS DIGANTI DENGAN DATA VALIDASI DOMAIN DARI WARPCAST NANTI !!!
    accountAssociation: {
      header: "ANDA-HARUS-MENGGANTI-HEADER-INI",
      payload: "ANDA-HARUS-MENGGANTI-PAYLOAD-INI",
      signature: "ANDA-HARUS-MENGGANTI-SIGNATURE-INI"
    },

    frame: {
      version: "1",
      name: "Circle Base Bridge",
      iconUrl: `${appUrl}/icon.png`, 
      homeUrl: appUrl,
      imageUrl: `${appUrl}/opengraph-image.png`,
      buttonTitle: "Bridge USDC",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#0052FF", 
    },
  };

  return NextResponse.json(config);
}
