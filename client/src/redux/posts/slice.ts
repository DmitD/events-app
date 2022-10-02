import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getPosts, createPost, updatePost, deletePost, likePost} from "./asyncActions";
import {PostsSliceState, PostType} from "./type";

const initialState = {
    posts: [],
    loading: false,
    error: null
} as PostsSliceState

const slice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        });
        builder.addCase(createPost.pending, (state) => {
            state.error = null;
        });
        builder.addCase(createPost.fulfilled, (state, action: PayloadAction<PostType>) => {
            state.posts = [...state.posts, action.payload]; //state.posts.push(action.payload)
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        });
        builder.addCase(likePost.fulfilled, (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
        });
        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export default slice.reducer

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}