import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Wallpaper from "@/components/Wallpaper";
import CustomCursor from "@/components/CustomCursor";

const tajawal = Tajawal({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Remass Ashmawi — Information Systems Student & Founder",
  description:
    "Information Systems student at KAU (GPA 4.69/5.00), CEO of GreenLedger, KAUST bioinformatics researcher, and frontend developer. Press Cmd+K to explore.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={tajawal.variable}>
      <body className="font-sans font-medium text-ink antialiased selection:bg-signal/30">
        <Wallpaper />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
