import { Inter,Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({

  subsets:['latin'],
  weight: ['300','400','500','600','700']
})
export const metadata = {
  title: "Price track",
  description: "This is the Prcie track app ,Price track will save yours Lots of Money and time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
        {children}</body>
    </html>
  );
}
