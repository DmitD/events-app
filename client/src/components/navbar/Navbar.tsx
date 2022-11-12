import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import { useAppDispatch } from '../../redux/store'
import events from '../../images/events.png'
import { useStyles } from './styles'
import { selectAuthData } from '../../redux/auth/selectors'
import { UserGoogle } from '../../../types'
import {
	checkAuth,
	checkAuthGoogle,
	logout,
} from '../../redux/auth/asyncActions'

const Navbar: React.FC = () => {
	const { classes } = useStyles()
	const { authData, isLoadingAuthData } = useSelector(selectAuthData)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logout())
		navigate('/')
	}

	React.useEffect(() => {
		const accessToken = localStorage.getItem('profile')
		if (accessToken && accessToken.length < 500) {
			dispatch(checkAuth())
		}
		if (accessToken && accessToken.length > 500) {
			const decodedToken = jwtDecode<UserGoogle>(accessToken)
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				dispatch(logout())
			}
			dispatch(checkAuthGoogle())
		}
	}, [])

	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<div className={classes.brandContainer}>
				<Typography
					component={Link}
					to='/'
					className={classes.heading}
					variant='h2'
					align='center'
				>
					Events
				</Typography>
				<img className={classes.image} src={events} alt='events' height='60' />
			</div>
			<Toolbar className={classes.toolbar}>
				{authData ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={authData.name}
							src={authData.img}
						>
							{authData.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{authData.name}
						</Typography>
						<Button
							variant='contained'
							color='secondary'
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				) : isLoadingAuthData ? (
					<></>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='primary'
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
