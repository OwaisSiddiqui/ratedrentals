import { createContext, PropsWithChildren, useContext, useState } from 'react'

const IndexContent = createContext<
  | {
      choiceScreen: {
        show: boolean
        setShow: (value: boolean) => void
      }
      betaHeader: {
        show: boolean
        setShow: (value: boolean) => void
      }
    }
  | undefined
>(undefined)

const IndexProvider = ({ children }: PropsWithChildren<{}>) => {
  const [showChoiceScreen, setShowChoiceScreen] = useState(false)
  const [showBetaHeader, setShowBetaHeader] = useState(true)

  return (
    <IndexContent.Provider
      value={{
        choiceScreen: {
          show: showChoiceScreen,
          setShow: setShowChoiceScreen,
        },
        betaHeader: {
          show: showBetaHeader,
          setShow: setShowBetaHeader,
        },
      }}
    >
      {children}
    </IndexContent.Provider>
  )
}

const useIndex = () => {
  const context = useContext(IndexContent)
  if (context === undefined) {
    throw new Error('useIndex must be used with a IndexProvider')
  }
  return context
}

export { IndexProvider, useIndex }
