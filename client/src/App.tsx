import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App: React.FC = () => {
	return (
		<GoogleOAuthProvider
			clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}
		>
			<BrowserRouter>
				<Container maxWidth='lg'>
					<Navbar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/auth' element={<Auth />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</GoogleOAuthProvider>
	)
}

export default App
