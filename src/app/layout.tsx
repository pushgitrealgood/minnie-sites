import { Biryani, Cormorant_Garamond, Dancing_Script, Raleway } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const dancing = Dancing_Script({ variable: "--font-dancing", subsets: ["latin"], weight: ["400", "700"] });
const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin"], weight: ["600", "700", "800"] });
const biryani = Biryani({ variable: "--font-biryani", subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${dancing.variable} ${raleway.variable} ${biryani.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
