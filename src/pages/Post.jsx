import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config1.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
import LikeButton from "../components/LikeButton";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const user = useSelector((state) => state.auth.userData);


    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            }).finally(() => setLoading(false));
        } else {
            navigate("/");
        }
    }, [slug, navigate]);


    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Loading post...</p>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                {/* Simple Hero Image - FULLY VISIBLE */}
                <div className="mb-8">
                    <div className="relative">
                        {/* Clean image */}
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full max-w-full rounded-2xl"
                        />
                        
                        {/* Edit/Delete buttons */}
                        {isAuthor && (
                            <div className="absolute top-6 right-6 flex space-x-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button className="bg-surface hover:bg-surface-light border border-border">
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    onClick={deletePost}
                                    className="bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-800/30"
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <article className="max-w-4xl mx-auto">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-text-primary mb-6">
                        {post.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex items-center space-x-6 text-text-secondary mb-8 pb-6 border-b border-border">
                        {post.author && (
                            <span className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>Posted by {post.author}</span>
                            </span>
                        )}
                        {post.readTime && (
                            <>
                                <span className="text-border">•</span>
                                <span className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{post.readTime} min read</span>
                                </span>
                            </>
                        )}

                        <div className="flex items-center">
                            <LikeButton 
                                itemId={post.$id} 
                                itemType="post" 
                                showCount={true}
                                className="px-4 py-2 bg-surface-light hover:bg-surface rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg prose-invert max-w-none">
                        <div className="text-text-primary leading-relaxed text-lg">
                            {parse(post.content)}
                        </div>
                    </div>

                    {/* Tags */}
                    {post.tags && (
                        <div className="mt-12 pt-8 border-t border-border">
                            <h3 className="text-lg font-semibold text-text-primary mb-4">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.split(',').map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full bg-surface-light text-text-secondary hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-sm font-medium"
                                    >
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comments Section */}
                    <Comments postId={post.$id} />
                </article>
            </Container>
        </div>
    ) : null;
}
