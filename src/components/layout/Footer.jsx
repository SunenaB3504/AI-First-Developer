/**
 * @file Footer.jsx
 * @description This component renders the main footer for the application.
 * It contains navigation for previous and next content.
 */
import React from 'react'

const Footer = () => {
  const footerStyle = {
    padding: '16px',
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0',
    marginTop: '32px',
  }

  return (
    <footer style={footerStyle}>
      <p>Previous | Next</p>
    </footer>
  )
}

export default Footer
