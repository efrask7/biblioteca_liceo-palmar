import { PropsWithChildren, createContext, useContext, useState } from "react";
import { IUpdateContext } from "./types";

const DEFAULT_DATA: IUpdateData = {
  latest: {
    assets: [],
    changelog: "",
    version: ""
  },
  version: {
    labelLocal: "",
    local: 0
  }
}

const UpdateContext = createContext<IUpdateContext>({
  getData: () => {},
  updateData: DEFAULT_DATA
})

function useUpdate() {
  const context = useContext(UpdateContext)
  if (!context) throw "Update context used outside a provider"
  return context
}

function UpdateProvider({ children }: PropsWithChildren) {
  
  const [data, setData] = useState<IUpdateData>(DEFAULT_DATA)
  
  function getData() {

  }

  return (
    <UpdateContext.Provider
      value={{
        updateData: data,
        getData
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}