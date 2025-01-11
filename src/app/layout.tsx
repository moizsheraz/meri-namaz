import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Meri-Namaz",
  description: "Meri Namaz is a modern and user-friendly mobile application designed to help users maintain their daily prayer routine with ease. The app allows users to mark their five daily prayers, ensuring they don't miss any. If a prayer is missed, it will be automatically moved to the  section, providing users with a clear view of their missed prayers. The app also features a heatmap that tracks the user's prayer consistency over time, with dark purple colors highlighting days when all prayers were completed. Additionally, the app includes a  feature that displays the time of the upcoming prayer, keeping users on track. With an intuitive interface and simple design, Meri Namaz is the perfect companion for individuals looking to stay connected with their spiritual practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
