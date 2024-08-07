import { Header } from '@/components/HeaderWrapper'
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  other: {
    "frog": "05ef141a1925c5890688f13668f2e303"
  }
};

export default function RootLayout({ children }) {
  const authorized = false;
  return (
      <html lang="en">
        <body className={inter.className}>
          {authorized ? <Header /> : null}
          {children}
        </body>
      </html>
  );
}
