import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/Components/Navigation/Navigation";
import styles from "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event planer",
  description: "Schooltask created for an event planer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
