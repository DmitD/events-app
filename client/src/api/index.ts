import axios from "axios";
import {CreatePostType, PostType} from "../redux/posts/type";

const url = 'http://localhost:5000/posts'

export const fetchPosts = () => axios.get<PostType[]>(url)
export const createPost = (newPost: CreatePostType) => axios.post<PostType>(url, newPost)
export const updatePost = (id: number, updatedPost: CreatePostType) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id: number) => axios.delete(`${url}/${id}`)
export const likePost = (id: number) => axios.patch(`${url}/${id}/likePost`)