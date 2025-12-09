import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import likeService from '../appwrite/likes.js';

function LikeButton({ itemId, itemType = 'post', showCount = true, className = ''}) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    // Load like status and count
    useEffect(() => {
        loadLikeData();
    }, [itemId, itemType, authStatus, userData]);

    const loadLikeData = async () => {
        try {
            // Load like count
            const count = await likeService.getLikeCount(itemId, itemType);
            setLikeCount(count);

            // Check if current user liked it
            if (authStatus && userData && userData.$id) {
                const userLike = await likeService.getUserLike(userData.$id, itemId, itemType);
                const hasLiked = userLike?.documents?.length > 0;
                setIsLiked(hasLiked);
            } else {
                setIsLiked(false);
            }
        } catch (error) {
            console.error('Failed to load like data:', error);
        }
    };

    const handleLike = async () => {
        if (!authStatus || !userData || !userData.$id) {
            alert('Please sign in to like!');
            return;
        }

        setLoading(true);
        
        // Save current state for potential revert
        const wasLiked = isLiked;
        const previousCount = likeCount;
        
        // Optimistic update
        setIsLiked(!wasLiked);
        setLikeCount(wasLiked ? previousCount - 1 : previousCount + 1);
        
        try {
            const result = await likeService.likeItem({
                userId: userData.$id,
                itemId,
                itemType
            });
                        
            // Reload data to ensure sync with server
            await loadLikeData();
            
        } catch (error) {
            console.error('❌ Failed to toggle like:', error);
            // Revert optimistic update
            setIsLiked(wasLiked);
            setLikeCount(previousCount);
            alert('Failed to like. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={loading || !authStatus}
            className={`
                inline-flex items-center space-x-2
                px-3 py-1.5 rounded-lg
                transition-all duration-200
                ${isLiked 
                    ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' 
                    : 'bg-surface-light text-text-secondary hover:bg-surface'
                }
                ${!authStatus ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
            title={authStatus ? (isLiked ? 'Unlike' : 'Like') : 'Sign in to like'}
        >
            {/* Heart Icon */}
            <svg 
                className={`w-5 h-5 transition-transform ${isLiked ? 'fill-current' : ''}`}
                fill={isLiked ? "currentColor" : "none"} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={isLiked ? 1.5 : 2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
            </svg>
            
            {/* Like Count */}
            {showCount && likeCount > 0 && (
                <span className={`text-sm font-medium ${isLiked ? 'text-red-400' : 'text-text-secondary'}`}>
                    {likeCount}
                </span>
            )}
        </button>
    );
}

export default LikeButton;