import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { Chat } from '../components/Chat'
import { Login } from '../components/Login'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
  </Routes>
  )
}
