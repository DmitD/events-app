import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { CreatePostType, PostType } from '../redux/posts/type'
import { FormDataType, UserData, UserDataGoogle } from '../../types'

export const API_URL = 'http://localhost:5000'

const $api = axios.create({ withCredentials: true, baseURL: API_URL }) // withCredentials - прикреплять куки

//interceptors
$api.interceptors.request.use((config: AxiosRequestConfig) => {
	config.headers = config.headers ?? {}
	const user = localStorage.getItem('profile')
	const token = user ? JSON.parse(user) : null
	config.headers.Authorization = `Bearer ${token}`
	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true //что бы не было зацикливания
			try {
				const user = localStorage.getItem('profile')
				if (user && user.length < 500) {
					const { data } = await axios.get<UserData>(
						`${API_URL}/user/refresh`,
						{
							withCredentials: true,
						}
					)
					localStorage.setItem('profile', JSON.stringify(data.accessToken))
					return $api.request(originalRequest)
				}
				if (user && user.length > 500) {
					const { data } = await axios.get<UserDataGoogle>(
						`${API_URL}/user//auth/google/refresh`,
						{
							withCredentials: true,
						}
					)
					return $api.request(originalRequest)
				}
			} catch (e) {
				console.log('User is not authorized')
			}
		}
		throw error
	}
)

//Posts
export const fetchPosts = (): Promise<AxiosResponse<PostType[]>> =>
	$api.get<PostType[]>('/posts')

export const createPost = (
	newPost: CreatePostType
): Promise<AxiosResponse<PostType>> => $api.post<PostType>('/posts', newPost)

export const updatePost = (id: number, updatedPost: CreatePostType) =>
	$api.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id: number) => $api.delete(`/posts/${id}`)

export const likePost = (id: number) => $api.patch(`/posts/${id}/likePost`)

//Auth
export const signUp = (
	formData: FormDataType
): Promise<AxiosResponse<UserData>> =>
	$api.post<UserData>('/user/signup', formData)

export const signIn = (
	formData: FormDataType
): Promise<AxiosResponse<UserData>> =>
	$api.post<UserData>('/user/signin', formData)

export const signInGoogle = (
	code: string
): Promise<AxiosResponse<UserDataGoogle>> =>
	$api.post<UserDataGoogle>('/user/auth/google', {
		code,
	})

export const setLogout = (): Promise<void> => $api.post('/user/logout')
