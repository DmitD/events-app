import { FormDataType, IUser, UserData, UserDataGoogle } from '../../../types'

export type signParamsType = {
	formData: FormDataType
	navigate: (to: string) => void
}

// export interface AuthSliceState {
// 	authData: null | UserData | UserDataGoogle
// 	//authDataGoogle: null | UserDataGoogle
// 	error: null | string
// }

export interface AuthSliceState {
	authData: null | IUser
	error: null | string
	isLoadingAuthData: boolean
}
