import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


   fetch("http://localhost:8080/games")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

}

export default App
