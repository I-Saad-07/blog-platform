
import React, { useState, useEffect } from 'react'
import { Container, PostForm } from "../components"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config1'

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    // 🔒 SECURITY CHECK: Only allow editing your own posts
                    if (post.userId === userData?.$id) {
                        setPost(post);
                    } else {
                        // Not your post! Redirect to home
                        alert("You can only edit your own posts!");
                        navigate('/');
                    }
                } else {
                    navigate('/');
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate, userData])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost