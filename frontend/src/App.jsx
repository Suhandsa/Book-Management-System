import React from 'react'
import { Routes,Route } from 'react-router-dom'

import CreateBook from './pages/CreateBook.jsx'
import EditBook from './pages/editBook.jsx'
import ShowBook from './pages/showBook.jsx'
import DeleteBook from './pages/deleteBook.jsx'
import Home from './pages/home.jsx'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/book/create' element={<CreateBook/>} />
      <Route path='/book/editBook/:id' element={<EditBook />} />
      <Route path='/book/details/:id' element={<ShowBook />} />
      <Route path='/book/deleteBook/:id' element={<DeleteBook />} />

    </Routes>
  )
}

export default App