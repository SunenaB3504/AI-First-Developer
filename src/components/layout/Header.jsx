/**
 * @file Header.jsx
 * @description This component renders the main header for the application.
 * It is a fixed navigation bar at the top of the page.
 */
import React from 'react'

const Header = () => {
  const headerStyle = {
    backgroundColor: '#2196F3',
    padding: '16px',
    color: 'white',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  }

  return (
    <header style={headerStyle}>
      <h1>Technology Prompts Library</h1>
    </header>
  )
}

export default Header
