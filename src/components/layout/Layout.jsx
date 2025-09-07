/**
 * @file Layout.jsx
 * @description This component provides the main layout structure for the application,
 * including the Header, Footer, and a main content area.
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the main content area.
 */
import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }

  const mainStyle = {
    flex: 1,
    paddingTop: '80px', // To offset the fixed header
    paddingLeft: '16px',
    paddingRight: '16px',
  }

  return (
    <div style={layoutStyle}>
      <Header />
      <main style={mainStyle}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
