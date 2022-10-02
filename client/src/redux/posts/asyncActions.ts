import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api'
import {CreatePostType, PostType, UpdatePostParams} from "./type";

export const getPosts = createAsyncThunk<PostType[], undefined, {rejectValue: string}>(
    'posts/getPosts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.fetchPosts()
            return data
        } catch (e: any) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)
export const createPost = createAsyncThunk<PostType, CreatePostType, {rejectValue: string}>(
    'posts/createPost',
    async (post, { rejectWithValue }) => {
        try {
            const { data } = await api.createPost(post)
            console.log(data)
            return data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)
export const updatePost = createAsyncThunk<PostType, UpdatePostParams, {rejectValue: string}>(
    'posts/updatePost',
    async (params, { rejectWithValue }) => {
        const {id, post} = params
        try {
            const { data } = await api.updatePost(id, post)
            return data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)
export const deletePost = createAsyncThunk<number, number, {rejectValue: string}>(
    'posts/deletePost',
    async (id, { rejectWithValue }) => {
        try {
            await api.deletePost(id)
            return id
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)
export const likePost = createAsyncThunk<PostType, number, {rejectValue: string}>(
    'posts/likePost',
    async (id, { rejectWithValue }) => {
        try {
            const {data} = await api.likePost(id)
            return data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)