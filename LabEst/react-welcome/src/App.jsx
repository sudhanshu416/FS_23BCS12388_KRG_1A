import React from 'react'
import Welcome from './components/Welcome'

export default function App() {
  return (
    <div style={{ fontFamily: 'fantasy', padding: 20 , color:'crimson'}}>
      <Welcome name="Alice" />
      <Welcome />
    </div>
  )
}
