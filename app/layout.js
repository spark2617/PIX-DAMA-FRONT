

import { Inter } from "next/font/google";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NextUIProvider, useDisclosure } from "@nextui-org/react"
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProvider } from "./context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pix Dama",
  description: "",
  icons: {
    icon: '/favicon.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-stone-950`}>
        <AppProvider>

          <NextUIProvider className="dark">
            <Header />
            {children}
            <Footer />
          </NextUIProvider>
          
        </AppProvider>
      </body>
    </html>
  );
}
