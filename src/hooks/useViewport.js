import React, { createContext, useContext, useState, useEffect } from 'react'

const ViewportContext = createContext({
  width: window.innerWidth,
  height: window.innerHeight,
})

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const handleResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  )
}

export function useViewport() {
  return useContext(ViewportContext)
}
