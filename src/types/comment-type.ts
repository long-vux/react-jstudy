import { Profile } from "./user-type";

interface UserCommentResponse {
    _id: string;
    profile: Profile;
}

export interface Comment {
    _id: string;
    content: string;
    createdAt: string;
    user: UserCommentResponse;
    likes: any[];
    parentComment: string | null;
    replies?: Comment[];
    updatedAt: string;
    exercise: string;
}

export interface CommentState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    creatingComment: boolean;
    updatingComment: boolean;
    deletingComment: boolean;
}
