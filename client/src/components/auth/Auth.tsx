import React from 'react'
import { useNavigate, redirect } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useAppDispatch } from '../../redux/store'
import { signin, signup, signinGoogle } from '../../redux/auth/asyncActions'
import { useStyles } from './styles'
import Input from './Input'
import Icon from './icon'

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const Auth: React.FC = () => {
	const { classes } = useStyles()
	const [isSignup, setIsSignup] = React.useState(false)
	const [showPassword, setShowPassword] = React.useState(false)
	const [formData, setFormData] = React.useState(initialState)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	// google Sign in бeз библиотек
	// const handleCallbackResponse = (response: any) => {
	//     console.log("Encoded JWT ID token: " + response.credential)
	// }
	//
	// React.useEffect(() => {
	//     /* global google */
	//     // @ts-ignore
	//     google.accounts.id.initialize({
	//         client_id: "637778107640-b0tnmr18bo1taeq5q7u8gv83i6a3pl09.apps.googleusercontent.com",
	//         callback: handleCallbackResponse
	//     })
	//     // @ts-ignore
	//     google.accounts.id.renderButton(
	//         document.getElementById("signInDiv"),
	//         {theme: "filled_blue", size: "large"}
	//     )
	// }, [])

	const login = useGoogleLogin({
		flow: 'auth-code',
		onSuccess: codeResponse => {
			dispatch(signinGoogle(codeResponse.code))
			navigate('/')
		},
		onError: errorResponse => console.log(errorResponse),
	})

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault() //что бы не перезагружать страницу после отправки формы
		if (isSignup) {
			dispatch(signup({ formData, navigate }))
		}
		if (!isSignup) {
			dispatch(signin({ formData, navigate }))
		}
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const handleShowPassword = () => setShowPassword(!showPassword)
	const switchMode = () => {
		setIsSignup(!isSignup)
		setShowPassword(false)
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<Button
						onClick={() => login()}
						className={classes.googleButton}
						color='primary'
						fullWidth
						variant='contained'
						startIcon={<Icon />}
					>
						Sign in with Google
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? 'Already have an account? Sign in'
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
}

export default Auth
