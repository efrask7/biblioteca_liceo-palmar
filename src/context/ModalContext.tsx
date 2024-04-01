import { PropsWithChildren, createContext, useContext, useState } from "react"
import { IModalContext } from "./types"
import ModalMsg, { IModalMsg, IModalMsgProps } from "../components/context/ModalMsg"
import ModalOption, { IModalOption, IModalOptionsProps } from "../components/context/ModalOption"

const ModalContext = createContext<IModalContext>({
  modal: {
    open: () => {}
  },
  option: {
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

  const [modalOption, setModalOption] = useState<Omit<IModalOption, "close">>({
    open: false,
    message: "",
    onAccept: () => {}
  })

  function handleOpenModalMsg(props: IModalMsgProps) {
    setModalMsg({
      ...props,
      open: true
    })
  }

  function handleOpenModalOption(props: IModalOptionsProps) {
    setModalOption({
      ...props,
      open: true
    })
  }
  
  return (
    <ModalContext.Provider
      value={{
        modal: {
          open: handleOpenModalMsg
        },
        option: {
          open: handleOpenModalOption
        }
      }}
    >
      {children}

      <ModalMsg
        {...modalMsg}
        close={() => setModalMsg(prev => ({...prev, open:false}))}
      />

      <ModalOption
        {...modalOption}
        close={() => setModalOption(prev => ({...prev, open: false}))}
      />
    </ModalContext.Provider>
  )
}

export { ModalProvider, useModal }