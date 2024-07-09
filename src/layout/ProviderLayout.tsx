import { PropsWithChildren } from "react";
import { ModalProvider } from "../context/ModalContext";
import { ThemeProvider } from "../context/ThemeContext";
import { UpdateProvider } from "../context/UpdateContext";

export default function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ModalProvider>
        <UpdateProvider>
          {children}
        </UpdateProvider>
      </ModalProvider>
    </ThemeProvider>
  )
}