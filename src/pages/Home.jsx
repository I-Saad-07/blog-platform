import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config1'
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading stories...</p>
            </div>
        </div>
    )
}

    if (posts.length === 0) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <Container>
                    <div className="max-w-2xl mx-auto text-center px-4">
                        {/* Icon */}
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface mb-4">
                                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold text-text-primary mb-4">
                            Welcome to DevUI Blog
                        </h1>
                        
                        {/* Subheading */}
                        <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
                            A place where developers share their knowledge, experiences, and insights.
                        </p>

                        {/* CTA Card */}
                        <div className="bg-surface rounded-2xl p-8 border border-border">
                            <p className="text-text-primary text-lg mb-6">
                                Sign in to start reading amazing posts and join our community
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a 
                                    href="/login" 
                                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                                >
                                    Sign In
                                </a>
                                <a 
                                    href="/signup" 
                                    className="inline-flex items-center justify-center px-6 py-3 bg-surface-light text-text-primary font-medium rounded-xl border border-border hover:bg-surface hover:border-primary/30 transition-all duration-200"
                                >
                                    Create Account
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="py-12">
            <Container>
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-5xl font-bold text-text-primary mb-4 tracking-tight">
                        Latest Stories
                    </h1>
                    <p className="text-lg text-text-secondary">
                        Discover insightful articles and tutorials from our community
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                </div>

                {/* Featured Section */}
                <div className="bg-linear-to-br from-surface to-background rounded-2xl border border-border p-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-text-primary mb-4">
                            Start Sharing Your Knowledge
                        </h2>
                        <p className="text-text-secondary mb-6">
                            Join our community of writers and share your expertise with developers worldwide.
                        </p>
                        <a 
                            href="/add-post" 
                            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                        >
                            Write Your First Post
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home