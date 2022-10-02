export type CreatePostType = {
    creator: string;
    title: string;
    message: string;
    tags: string[];
    selectedFile: string;
};

export type PostType = {
    _id: number;
    createdAt: number;
    creator: string;
    title: string;
    message: string;
    tags: string[];
    selectedFile: string;
    likeCount: number
};

export type UpdatePostParams = {
    id: number;
    post: CreatePostType
};

export interface PostsSliceState {
    posts: PostType[];
    loading: boolean;
    error: string | null
}