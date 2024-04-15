import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
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
  
  const getData = useCallback(() => {
    window.updater.getData()
  }, [])

  const updateData = useCallback((data: IUpdateData) => {
    setData(data)
  }, [])

  useEffect(() => {
    window.updater.handleGetData(updateData)

    return () => window.updater.closeHandleGetData()
  }, [getData])

  useEffect(() => {
    getData()
  }, [getData])

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

export { useUpdate, UpdateProvider }