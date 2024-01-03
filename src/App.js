import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import NewTicketPage from './pages/NewTicketPage'
import TicketPage from './pages/TicketPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


import NavBar from './components/NavBar'


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path = '/tickets' element = {<HomePage/>} />
        <Route path = '/tickets/new' element = {<NewTicketPage/>} />
        <Route path = '/tickets/:id' element = {<TicketPage/>} />
        <Route path = '/profile' element = {<ProfilePage/>} />
        <Route path = '/login' element = {<LoginPage/>} />
        <Route path = '/signup' element = {<SignupPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
