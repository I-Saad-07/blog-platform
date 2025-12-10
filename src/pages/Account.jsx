import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config1.js'
import { Query } from 'appwrite'
import { Link } from 'react-router-dom'

function Account() {
    const userData = useSelector((state) => state.auth.userData)
    const [allUserPosts, setAllUserPosts] = useState([]) 
    const [filteredPosts, setFilteredPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('published') // 'published' or 'drafts'

    useEffect(() => {
        if (userData?.$id) {
            setLoading(true)
            
            // Fetch ALL posts by user (no status filter)
            appwriteService.getPosts([
                Query.equal("userId", userData.$id),
                Query.orderDesc("$createdAt")
            ])
                .then((posts) => {
                    const allPosts = posts.documents || []
                    setAllUserPosts(allPosts)
                    
                    // Initially show published posts
                    const published = allPosts.filter(p => p.status === 'active')
                    setFilteredPosts(published)
                })
                .catch((error) => {
                    console.error("Failed to load user posts:", error)
                })
                .finally(() => setLoading(false))
        }
    }, [userData])

    useEffect(() => {
        if (allUserPosts.length > 0) {
            let filtered = []
            
            switch(activeTab) {
                case 'published':
                    filtered = allUserPosts.filter(p => p.status === 'active')
                    break
                case 'drafts':
                    filtered = allUserPosts.filter(p => p.status === 'inactive')
                    break
                case 'all':
                    filtered = allUserPosts
                    break
                default:
                    filtered = allUserPosts.filter(p => p.status === 'active')
            }
            
            setFilteredPosts(filtered)
        }
    }, [activeTab, allUserPosts])

    const totalPosts = allUserPosts.length
    const publishedCount = allUserPosts.filter(p => p.status === 'active').length
    const draftsCount = allUserPosts.filter(p => p.status === 'inactive').length

    // Format join date
    const joinDate = userData?.$createdAt 
        ? new Date(userData.$createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : ''

    if (!userData) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Container>
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-20 h-20 rounded-2xl bg-surface-light flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-text-primary mb-3">
                            Sign In Required
                        </h2>
                        <p className="text-text-secondary mb-6">
                            Please sign in to view your account and manage your posts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/login"
                                className="px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 text-center"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-3 bg-surface-light text-text-primary font-medium rounded-xl border border-border hover:bg-surface hover:border-primary/30 transition-all duration-200 text-center"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="py-8 md:py-12">
            <Container>
                {/* Profile Header */}
                <div className="bg-surface rounded-2xl border border-border overflow-hidden mb-8">
                    {/* Gradient Banner */}
                    <div className="h-24 bg-gradient-primary"></div>
                    
                    {/* Profile Content */}
                    <div className="relative px-6 md:px-8 pb-8">
                        {/* Avatar positioned over banner */}
                        <div className="relative -top-10 mb-4">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-primary border-4 border-background flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                {userData.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                                    {userData.name}
                                </h1>
                                <p className="text-text-secondary">{userData.email}</p>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 pt-4 border-t border-border/50">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {totalPosts} {/* ← Changed from userPosts.length */}
                                    </div>
                                    <div className="text-sm text-text-secondary">Total Posts</div>
                                </div>
                                
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {publishedCount} {/* ← Changed */}
                                    </div>
                                    <div className="text-sm text-text-secondary">Published</div>
                                </div>
                                
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {draftsCount} {/* ← Changed */}
                                    </div>
                                    <div className="text-sm text-text-secondary">Drafts</div>
                                </div>
                </div>
                            {/* Quick Actions */}
                            <div className="flex flex-wrap gap-3 pt-6">
                                <Link
                                    to="/add-post"
                                    className="px-5 py-2.5 bg-gradient-primary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 inline-flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>New Post</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="bg-surface rounded-2xl border border-border overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-border">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('published')}
                                className={`px-6 py-4 font-medium text-sm md:text-base transition-colors duration-200 ${
                                    activeTab === 'published'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-text-secondary hover:text-primary'
                                }`}
                            >
                                Published ({publishedCount})
                            </button>
                            <button
                                onClick={() => setActiveTab('drafts')}
                                className={`px-6 py-4 font-medium text-sm md:text-base transition-colors duration-200 ${
                                    activeTab === 'drafts'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-text-secondary hover:text-primary'
                                }`}
                            >
                                Drafts ({draftsCount})
                            </button>
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-6 py-4 font-medium text-sm md:text-base transition-colors duration-200 ${
                                    activeTab === 'all'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-text-secondary hover:text-primary'
                                }`}
                            >
                                All Posts ({totalPosts})
                            </button>
                        </div>
                    </div>

                    {/* Posts Content */}
                    <div className="p-6 md:p-8">
                        {loading ? (
                            <div className="py-16 text-center">
                                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-text-secondary">Loading your posts...</p>
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="py-16 text-center">
                                <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-text-primary mb-2">
                                    No posts yet
                                </h3>
                                <p className="text-text-secondary mb-6 max-w-md mx-auto">
                                    {activeTab === 'published' 
                                        ? "You haven't published any posts yet. Create your first post to share with the community!"
                                        : activeTab === 'drafts'
                                        ? "You don't have any draft posts. Start writing and save as draft to continue later."
                                        : "You haven't created any posts yet. Start writing to build your portfolio!"
                                    }
                                </p>
                                <Link
                                    to="/add-post"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Your First Post
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts.map((post) => (
                                    <PostCard key={post.$id} {...post} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Account