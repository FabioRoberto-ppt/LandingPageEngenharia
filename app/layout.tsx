import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Vamos usar a Inter por enquanto
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hebert Soares | Engenharia de Luxo",
  description: "Construções e projetos de alto padrão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}