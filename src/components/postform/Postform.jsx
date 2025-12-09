import React, { useCallback, useState } from "react";  // ADD useState
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config1.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            author: post?.author || "",
            readTime: post?.readTime || "5",
            tags: post?.tags || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isSubmitting, setIsSubmitting] = useState(false);  // ADD loading state

    // Find the submit function and update this section:

    // In the submit function, update the userId extraction:

    const submit = async (data) => {
        setIsSubmitting(true);
        
        try {
            if (post) {
                // Update existing post
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // CREATE NEW POST - FIX USER ID
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    
                    // Get userId from NESTED structure
                    const userId = userData?.$id;

                    if (!userId) {
                        console.error("No user ID found. Full userData:", userData);
                        throw new Error("User not authenticated. Please login again.");
                    }
                    
                    const dbPost = await appwriteService.createPost({ 
                        ...data, 
                        userId: userId
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
            } catch (error) {
                console.error("Error submitting post:", error);
                alert(`Failed to save post: ${error.message}`);
            } finally {
                setIsSubmitting(false);
            }
        };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary">
                    {post ? 'Edit Post' : 'Create New Post'}
                </h1>
                <p className="text-text-secondary mt-2">
                    {post ? 'Update your blog post' : 'Share your thoughts with the world'}
                </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="bg-surface rounded-2xl border border-border p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Title"
                                placeholder="Enter post title"
                                {...register("title", { required: true })}
                            />
                            <Input
                                label="Author Name"
                                placeholder="Your name or pen name"
                                {...register("author", { required: true })}
                            />
                        </div>
                        
                        <Input
                            label="Slug"
                            placeholder="post-url-slug"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Read Time (minutes)"
                                type="number"
                                placeholder="5"
                                min="1"
                                {...register("readTime", { required: true, min: 1 })}
                            />
                            <Input
                                label="Tags (comma-separated)"
                                placeholder="react, javascript, webdev"
                                {...register("tags")}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                                Content
                            </label>
                            <RTE 
                                name="content" 
                                control={control} 
                                defaultValue={getValues("content")} 
                            />
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-background rounded-xl border border-border p-5">
                            <h3 className="font-semibold text-text-primary mb-4">Post Settings</h3>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Featured Image
                                    </label>
                                    <Input
                                        type="file"
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        {...register("image", { required: !post })}
                                    />
                                    {post && (
                                        <div className="mt-4">
                                            <img
                                                src={appwriteService.getFileView(post.featuredImage)}
                                                alt={post.title}
                                                className="rounded-lg w-full h-48 object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                <Select
                                    options={[
                                        { value: "active", label: "Published" },
                                        { value: "inactive", label: "Draft" }
                                    ]}
                                    label="Status"
                                    {...register("status", { required: true })}
                                />

                                <Button 
                                    type="submit" 
                                    className="w-full py-3 bg-gradient-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 relative"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>
                                                {post ? 'Updating...' : 'Publishing...'}
                                            </span>
                                        </div>
                                    ) : (
                                        post ? 'Update Post' : 'Publish Post'
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="text-sm text-text-secondary/60 p-4 bg-background/50 rounded-xl border border-border">
                            <p className="font-medium mb-2">Tips</p>
                            <ul className="space-y-2">
                                <li>• Use descriptive titles</li>
                                <li>• Add relevant images</li>
                                <li>• Write in markdown for better formatting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}