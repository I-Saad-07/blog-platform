import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import commentService from '../appwrite/comments.js';
import { Button, Input } from './index';
import LikeButton from './LikeButton';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    // Load comments
    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        setLoading(true);
        try {
            const response = await commentService.getCommentsByPostId(postId);
            setComments(response.documents || []);
        } catch (error) {
            console.error('Failed to load comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !authStatus) return;

        setSubmitting(true);
        try {
            await commentService.createComment({
                postId,
                userId: userData.$id,
                userName: userData.name || userData.email.split('@')[0],
                content: newComment.trim()
            });
            
            setNewComment('');
            loadComments(); // Refresh comments
        } catch (error) {
            console.error('Failed to post comment:', error);
            alert('Failed to post comment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        
        try {
            await commentService.deleteComment(commentId);
            loadComments(); // Refresh comments
        } catch (error) {
            console.error('Failed to delete comment:', error);
            alert('Failed to delete comment. You may not have permission.');
        }
    };

    return (
        <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-bold text-text-primary mb-6">
                Comments ({comments.length})
            </h3>

            {/* Comment Form  */}
            {authStatus ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="mb-4">
                        <Input
                            as="textarea"
                            rows="3"
                            placeholder="Share your thoughts..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="resize-none"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={!newComment.trim() || submitting}
                            className="px-6 py-2 bg-gradient-primary hover:shadow-primary/20"
                        >
                            {submitting ? 'Posting...' : 'Post Comment'}
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="mb-8 p-4 bg-surface-light rounded-lg border border-border">
                    <p className="text-text-secondary text-center">
                        <a href="/login" className="text-primary hover:underline">Sign in</a> to join the discussion
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-text-secondary">Loading comments...</p>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-8 text-text-secondary">
                        <p>No comments yet. Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
    <div 
        key={comment.$id} 
        className="p-4 bg-surface-light rounded-lg border border-border"
    >
        <div className="flex justify-between items-start mb-2">

            {/* LEFT SIDE: Avatar + Name + Date */}
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm font-semibold">
                        {comment.userName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>

                <div>
                    <p className="font-semibold text-text-primary">
                        {comment.userName}
                    </p>
                    <p className="text-text-secondary text-xs">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Like + Delete */}
            <div className="flex items-center space-x-4">

                {/* Like Button */}
                <LikeButton 
                    itemId={comment.$id} 
                    itemType="comment" 
                    showCount={true}
                    className="px-2 py-1"
                />

                {/* Delete Button */}
                {userData?.$id === comment.userId && (
                    <button
                        onClick={() => handleDelete(comment.$id)}
                        className="text-text-secondary hover:text-red-400 text-sm transition-colors px-2 py-1 hover:bg-surface rounded"
                    >
                        Delete
                    </button>
                )}
            </div>

        </div>

        {/* COMMENT TEXT */}
        <p className="text-text-primary mt-3">
            {comment.content}
        </p>
    </div>
))
                )}
            </div>
        </div>  
    );
}

export default Comments;
