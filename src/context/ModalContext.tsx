import { PropsWithChildren, createContext, useContext, useState } from "react"
import { IModalContext } from "./types"
import ModalMsg, { IModalMsg, IModalMsgProps } from "../components/context/ModalMsg"

const ModalContext = createContext<IModalContext>({
  modal: {
    open: () => {}
  }
})

function useModal() {
  const context = useContext(ModalContext)
  if (!context) throw "Modal context is used outside a provider"
  return context
}

function ModalProvider({ children }: PropsWithChildren) {
  
  const [modalMsg, setModalMsg] = useState<Omit<IModalMsg, "close">>({
    open: false,
    title: "",
    message: ""
  })

  function handleOpenModalMsg(props: IModalMsgProps) {
    setModalMsg({
      ...props,
      open: true
    })
  }
  
  return (
    <ModalContext.Provider
      value={{
        modal: {
          open: handleOpenModalMsg
        }
      }}
    >
      {children}

      <ModalMsg
        {...modalMsg}
        close={() => setModalMsg(prev => ({...prev, open:false}))}
      />
    </ModalContext.Provider>
  )
}

export { ModalProvider, useModal }