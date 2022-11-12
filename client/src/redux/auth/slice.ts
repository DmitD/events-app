import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import {
	checkAuth,
	signin,
	signinGoogle,
	signup,
	logout,
	checkAuthGoogle,
} from './asyncActions'
import { AuthSliceState } from './type'
import { UserGoogle } from '../../../types'

// const getTokensFromLS = () => {
// 	const data = localStorage.getItem('profile')
// 	//const dataGoogle = localStorage.getItem('profileGoogle')
// 	const tokens = data ? JSON.parse(data) : null
// 	//const tokensGoogle = dataGoogle ? JSON.parse(dataGoogle) : null
//
// 	return {
// 		authData: tokens as UserData | UserDataGoogle,
// 		//authDataGoogle: tokensGoogle as UserDataGoogle,
// 		error: null,
// 	}
// }

const initialState: AuthSliceState = {
	authData: null,
	isLoadingAuthData: false,
	error: null,
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(signup.fulfilled, (state, action) => {
			localStorage.setItem(
				'profile',
				JSON.stringify(action.payload.accessToken)
			)
			state.authData = action.payload.user
		})
		builder.addCase(signin.fulfilled, (state, action) => {
			localStorage.setItem(
				'profile',
				JSON.stringify(action.payload.accessToken)
			)
			state.authData = action.payload.user
		})
		builder.addCase(checkAuth.pending, state => {
			state.isLoadingAuthData = true
		})
		builder.addCase(checkAuth.fulfilled, (state, action) => {
			localStorage.setItem(
				'profile',
				JSON.stringify(action.payload.accessToken)
			)
			state.isLoadingAuthData = false
			state.authData = action.payload.user
		})
		builder.addCase(logout.fulfilled, state => {
			localStorage.removeItem('profile')
			state.authData = null
		})
		builder.addCase(signinGoogle.fulfilled, (state, action) => {
			localStorage.setItem('profile', JSON.stringify(action.payload.id_token))
			const user = jwtDecode<UserGoogle>(action.payload.id_token)
			state.authData = {
				name: user.name,
				email: user.email,
				id: user.sub,
				isActivated: user.email_verified,
				img: user.picture,
			}
		})
		builder.addCase(checkAuthGoogle.pending, state => {
			state.isLoadingAuthData = true
		})
		builder.addCase(checkAuthGoogle.fulfilled, state => {
			const dataGoogle = localStorage.getItem('profile')
			const tokensGoogle = dataGoogle ? JSON.parse(dataGoogle) : null
			const user = jwtDecode<UserGoogle>(tokensGoogle)
			state.isLoadingAuthData = false
			state.authData = {
				name: user.name,
				email: user.email,
				id: user.sub,
				isActivated: user.email_verified,
				img: user.picture,
			}
		})
		builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
			state.isLoadingAuthData = false
			state.error = action.payload
		})
	},
})

export default slice.reducer

function isError(action: AnyAction) {
	return action.type.endsWith('rejected')
}
