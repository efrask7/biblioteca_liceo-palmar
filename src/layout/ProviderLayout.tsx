import { PropsWithChildren } from "react";
import { ModalProvider } from "../context/ModalContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </ThemeProvider>
  )
}