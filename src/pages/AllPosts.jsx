import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config1'
import { Container, PostCard } from '../components'

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        appwriteService.getPosts([]).then((res) => {
            if (res) {
                setPosts(res.documents);
            }
        }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-12">

                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                        Community Posts
                    </h1>

                    <p className="text-lg text-text-secondary">
                        Explore all published articles from our community of writers
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-light mb-4">
                            <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                            No posts yet
                        </h3>

                        <p className="text-text-secondary mb-6">
                            Be the first to share your thoughts!
                        </p>

                        <a 
                            href="/add-post" 
                            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                        >
                            Create First Post
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}
