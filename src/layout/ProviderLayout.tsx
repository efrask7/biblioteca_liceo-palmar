import { PropsWithChildren } from "react";
import { ModalProvider } from "../context/ModalContext";

export default function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  )
}