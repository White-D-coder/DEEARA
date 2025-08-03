import React, { createContext, useContext, useState } from 'react'

const NavbarContext = createContext()

export const useNavbar = () => {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider')
  }
  return context
}

export const NavbarProvider = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [navbarOpacity, setNavbarOpacity] = useState(0)

  return (
    <NavbarContext.Provider value={{ isScrolled, setIsScrolled, navbarOpacity, setNavbarOpacity }}>
      {children}
    </NavbarContext.Provider>
  )
} 