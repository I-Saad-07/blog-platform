import config from "../config/config.js";
import { Client, Databases, ID, Query, Permission, Role } from "appwrite";

class CommentService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    // Create a new comment
    async createComment({ postId, userId, userName, content }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                ID.unique(),
                {
                    postId,
                    userId,
                    userName,
                    content,
                    createdAt: new Date().toISOString(),
                },
                [
                // Document-level permissions
                Permission.read(Role.any()),  // Anyone can read
                Permission.update(Role.user(userId)),  // Only owner can update
                Permission.delete(Role.user(userId)),  // Only owner can delete
            ]
            );
        } catch (error) {
            console.error("CommentService :: createComment :: error", error);
            throw error;
        }
    }

    // Get comments for a specific post
    async getCommentsByPostId(postId) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                [
                    Query.equal("postId", postId),
                    Query.orderDesc("createdAt")
                ]
            );
        } catch (error) {
            console.error("CommentService :: getCommentsByPostId :: error", error);
            throw error;
        }
    }

    // Delete a comment (only by comment owner or post owner)
    async deleteComment(commentId) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                commentId
            );
            return true;
        } catch (error) {
            console.error("CommentService :: deleteComment :: error", error);
            throw error;
        }
    }

    // Update a comment
    async updateComment(commentId, { content }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                commentId,
                {
                    content,
                    updatedAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.error("CommentService :: updateComment :: error", error);
            throw error;
        }
    }
}

const commentService = new CommentService();
export default commentService;