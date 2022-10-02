import {RootState} from "../store";

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (id: number | null) => (state: RootState) =>
    state.posts.posts.find((obj) => obj._id === id)