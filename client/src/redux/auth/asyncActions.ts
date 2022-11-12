import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api'
import { signParamsType } from './type'
import { UserData, UserDataGoogle } from '../../../types'
import axios from 'axios'
import { API_URL } from '../../api'

export const signup = createAsyncThunk<
	UserData,
	signParamsType,
	{ rejectValue: string }
>('auth/signup', async (signParams, { rejectWithValue }) => {
	const { formData, navigate } = signParams
	try {
		const { data } = await api.signUp(formData)
		navigate('/')
		return data
	} catch (e: any) {
		return rejectWithValue(e.message)
	}
})

export const signin = createAsyncThunk<
	UserData,
	signParamsType,
	{ rejectValue: string }
>('auth/signin', async (signParams, { rejectWithValue }) => {
	const { formData, navigate } = signParams
	try {
		const { data } = await api.signIn(formData)
		navigate('/')
		return data
	} catch (e: any) {
		return rejectWithValue(e.message)
	}
})

export const checkAuth = createAsyncThunk<
	UserData,
	undefined,
	{ rejectValue: string }
>('auth/checkAuth', async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get<UserData>(`${API_URL}/user/refresh`, {
			withCredentials: true,
		})
		return data
	} catch (e: any) {
		return rejectWithValue(e.message)
	}
})

export const logout = createAsyncThunk<
	undefined,
	undefined,
	{ rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
	try {
		await api.setLogout()
	} catch (e: any) {
		return rejectWithValue(e.message)
	}
})

export const signinGoogle = createAsyncThunk<
	UserDataGoogle,
	string,
	{ rejectValue: string }
>('auth/signinGoogle', async (code, { rejectWithValue }) => {
	try {
		const { data } = await api.signInGoogle(code)
		return data
	} catch (e: any) {
		return rejectWithValue(e.message)
	}
})

export const checkAuthGoogle = createAsyncThunk<
	UserDataGoogle,
	undefined,
	{ rejectValue: string }
>('auth/checkAuthGoogle', async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get<UserDataGoogle>(
			`${API_URL}/user/auth/google/refresh`,
			{
				withCredentials: true,
			}
		)
		return data
	} catch (e: any) {
		return rejectWithValue(e.message)
	}
})
