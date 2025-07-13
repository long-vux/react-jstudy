import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/index';
import { 
    fetchCommentsByExerciseId, 
    createComment, 
    updateComment,
    deleteComment,
} from '@/features/comment/comment-thunks';
import { Avatar, Button, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { Comment } from '@/types/comment-type';

interface CommentSectionProps {
    exerciseId: string;
}

// --- CommentReplyForm Component ---
interface CommentReplyFormProps {
    onSubmit: (content: string) => Promise<void>;
    onCancel: () => void;
    creatingComment: boolean;
    currentUser: any | null;
}

// --- CommentItem Component ---
interface CommentItemProps {
    comment: Comment;
    isReply?: boolean;
    currentUser: any | null; // Pass currentUser down
    dispatch: ReturnType<typeof useAppDispatch>; // Pass dispatch down
    creatingComment: boolean;
    updatingComment: boolean;
    deletingComment: boolean;
    exerciseId: string; // Pass exerciseId for replies
}

const CommentReplyForm: React.FC<CommentReplyFormProps> = ({ onSubmit, onCancel, creatingComment, currentUser }) => {
    const [replyContent, setReplyContent] = useState('');

    const handleSubmit = async () => {
        if (!replyContent.trim()) {
            message.warning('Nội dung trả lời không được để trống.');
            return;
        }
        await onSubmit(replyContent);
        setReplyContent(''); // Clear input on successful submit
    };

    return (
        <div className="mt-4 flex flex-col gap-2">
            <Input
                placeholder="Viết trả lời của bạn..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                disabled={creatingComment}
                className="rounded-md p-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex items-center justify-end gap-2">
                <Button type="default" onClick={onCancel} disabled={creatingComment}>
                    Hủy
                </Button>
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={creatingComment}
                    disabled={!currentUser || !replyContent.trim() || creatingComment}
                    className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    Gửi
                </Button>
            </div>
        </div>
    );
};

const CommentItem: React.FC<CommentItemProps> = React.memo(
    ({ comment, isReply = false, currentUser, dispatch, creatingComment, updatingComment, deletingComment, exerciseId }) => {
        const isOwner = currentUser && currentUser._id === comment.user._id;
        const displayName = isOwner ? 'Bạn' : comment.user?.profile?.fullName;
        const avatarSrc = comment.user?.profile?.avatar || 'https://placehold.co/40x40/cccccc/000000?text=AV';

        const [isReplying, setIsReplying] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [editContent, setEditContent] = useState(comment.content);

        const handleUpdateComment = async () => {
            if (!editContent.trim()) {
                message.warning('Nội dung bình luận không được để trống.');
                return;
            }
            try {
                await dispatch(updateComment({ commentId: comment._id, content: editContent })).unwrap();
                message.success('Bình luận đã được cập nhật!');
                setIsEditing(false); // Hide edit form on success
            } catch (err) {
                // Error is handled by useEffect in parent CommentSection
            }
        };

        const handleDeleteComment = async () => {
            try {
                await dispatch(deleteComment(comment._id)).unwrap();
                message.success('Xóa bình luận thành công!');
            } catch (err) {
                message.error('Xóa bình luận thất bại!');
            }
        };

        const handleReplySubmit = async (content: string) => {
            if (!currentUser) {
                message.warning('Vui lòng đăng nhập để trả lời.');
                return;
            }
            try {
                await dispatch(
                    createComment({
                        content,
                        exerciseId,
                        parentCommentId: comment._id,
                    })
                ).unwrap();
                message.success('Trả lời đã được gửi!');
                setIsReplying(false); // Hide reply form on success
            } catch (err) {
                // Error is handled by useEffect in parent CommentSection
            }
        };

        return (
            <div className={`mb-4 p-4 border rounded-lg shadow-sm bg-white ${isReply ? 'ml-6 border-l pl-3' : ''}`}>
                <div className="flex gap-3 items-start">
                    <Avatar src={avatarSrc} size={isReply ? 32 : 40} />
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">{displayName}</p>
                        {isEditing ? (
                            <div className="mt-2">
                                <Input.TextArea
                                    rows={2}
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="rounded-md p-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        type="primary"
                                        loading={updatingComment}
                                        onClick={handleUpdateComment}
                                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                        disabled={!editContent.trim()}
                                    >
                                        Lưu
                                    </Button>
                                    <Button
                                        onClick={() => setIsEditing(false)}
                                        className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                        disabled={updatingComment}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-700 break-words">{comment.content}</p>
                        )}

                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span>{new Date(comment.createdAt).toLocaleString()}</span>
                            {currentUser && comment.parentComment === null && !isEditing && ( // Only show reply if not editing
                                <Button
                                    type="link"
                                    icon={<MessageOutlined />}
                                    onClick={() => setIsReplying((prev) => !prev)} // Toggle reply form visibility
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Trả lời
                                </Button>
                            )}
                            {isOwner && !isEditing && ( // Only show edit/delete if not already editing
                                <>
                                    <Button
                                        type="link"
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setIsEditing(true);
                                            setIsReplying(false); // Hide reply form if open
                                            setEditContent(comment.content); // Set current content for editing
                                        }}
                                        className="text-yellow-600 hover:text-yellow-700"
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        type="link"
                                        icon={<DeleteOutlined />}
                                        loading={deletingComment}
                                        onClick={() => handleDeleteComment()} // Call delete handler
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Xóa
                                    </Button>
                                </>
                            )}
                        </div>

                        {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4">
                                {comment.replies.map((reply) => (
                                    <CommentItem
                                        key={reply._id + reply.updatedAt}
                                        comment={reply}
                                        isReply
                                        currentUser={currentUser}
                                        dispatch={dispatch}
                                        creatingComment={creatingComment}
                                        updatingComment={updatingComment}
                                        deletingComment={deletingComment}
                                        exerciseId={exerciseId}
                                    />
                                ))}
                            </div>
                        )}

                        {isReplying && ( // Conditionally render reply form based on local state
                            <CommentReplyForm
                                onSubmit={handleReplySubmit}
                                onCancel={() => setIsReplying(false)}
                                creatingComment={creatingComment}
                                currentUser={currentUser}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

// --- CommentSection Component ---
const CommentSection: React.FC<CommentSectionProps> = ({ exerciseId }) => {
    const dispatch = useAppDispatch();
    const { comments, loading, creatingComment, updatingComment, deletingComment, error } = useAppSelector(
        (state) => state.comment
    );
    const { user: currentUser } = useAppSelector((state) => state.user);

    const [newCommentContent, setNewCommentContent] = useState('');

    useEffect(() => {
        if (exerciseId) {
            dispatch(fetchCommentsByExerciseId(exerciseId));
        }
    }, [dispatch, exerciseId]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    const handleCreateMainComment = async () => {
        if (!currentUser) {
            message.warning('Vui lòng đăng nhập để bình luận.');
            return;
        }

        if (!newCommentContent.trim()) {
            message.warning('Nội dung bình luận không được để trống.');
            return;
        }

        try {
            await dispatch(
                createComment({
                    content: newCommentContent,
                    exerciseId,
                    parentCommentId: undefined, // This is a top-level comment
                })
            ).unwrap();

            setNewCommentContent(''); // Clear the input after successful submission
            message.success('Bình luận đã được gửi!');
        } catch (err) {
            // Error is handled by useEffect
        }
    };

    const renderCommentForm = () => (
        <div className="mt-4 flex flex-col gap-2">
            <Input
                placeholder="Viết bình luận của bạn..."
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                disabled={creatingComment}
                className="rounded-md p-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button
                type="primary"
                onClick={handleCreateMainComment}
                loading={creatingComment}
                disabled={!currentUser || !newCommentContent.trim() || creatingComment}
                className="self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                Gửi
            </Button>
        </div>
    );

    return (
        <div className="mt-10 max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Bình luận</h3>

            {currentUser && (
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold mb-3 text-gray-700">Thêm bình luận mới</h4>
                    {renderCommentForm()}
                </div>
            )}

            {!currentUser && (
                <div className="mb-8 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md">
                    Vui lòng đăng nhập để thêm bình luận.
                </div>
            )}

            {loading && <p className="text-center text-gray-600">Đang tải bình luận...</p>}
            {error && <p className="text-center text-red-500">Lỗi: {error}</p>}
            {!loading && comments.length === 0 && !error && (
                <p className="text-center text-gray-600">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
            )}

            <div className="space-y-6">
                {comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        currentUser={currentUser}
                        dispatch={dispatch}
                        creatingComment={creatingComment}
                        updatingComment={updatingComment}
                        deletingComment={deletingComment}
                        exerciseId={exerciseId} // Pass exerciseId down
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;