export interface UserGoogle {
	at_hash: string
	aud: string
	azp: string
	email: string
	email_verified: boolean
	exp: number
	family_name: string
	given_name: string
	iat: number
	iss: string
	locale: string
	name: string
	picture: string
	sub: string
}

export interface UserDataGoogle {
	access_token: string
	refresh_token: string
	scope: string
	token_type: string
	id_token: string
	expiry_date: string
}

export interface UserData {
	accessToken: string
	refreshToken: string
	user: IUser
}

export interface IUser {
	name: string
	email: string
	id: string
	isActivated: boolean
	img?: string
}

export type FormDataType = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}
