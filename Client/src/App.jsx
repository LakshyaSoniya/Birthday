import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Auth from './Pages/Auth'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Memories from './Pages/Memories'
import Celebrate from './Pages/Celebrate'
import Letter from './Pages/Letter'
import Create from './Pages/Create'

function App() {
  return (
    <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/memories' element={<Memories/>} />
        <Route path='/celebrate' element={<Celebrate/>} />
        <Route path='/letter' element={<Letter/>} />
    </Routes>
  )
}

export default App