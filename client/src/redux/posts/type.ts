export type CreatePostType = {
	name: string
	title: string
	message: string
	tags: string[]
	selectedFile: string
}

export type PostType = {
	_id: number
	createdAt: number
	name: string
	creator: string
	title: string
	message: string
	tags: string[]
	selectedFile: string
	likes: string[]
}

export type UpdatePostParams = {
	id: number
	post: CreatePostType
}

export interface PostsSliceState {
	posts: PostType[]
	loading: boolean
	error: string | null
}
