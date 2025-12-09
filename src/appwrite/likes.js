import config from "../config/config.js";
import { Client, Databases, ID, Query } from "appwrite";

class LikeService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    // Like a post or comment
    async likeItem({ userId, itemId, itemType = 'post' }) {
        try {
            // Check if already liked
            const existing = await this.getUserLike(userId, itemId, itemType);

            if (existing?.documents?.length > 0) {
                // Unlike - delete the existing like
                await this.unlikeItem(existing.documents[0].$id);
                return { action: 'unliked' };
            }

            // Create new like
            const newLike = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                ID.unique(),
                {
                    userId,
                    itemId,
                    itemType,
                    createdAt: new Date().toISOString(),
                }
            );
            
            return { action: 'liked' };
        } catch (error) {
            console.error("LikeService :: likeItem :: error", error);
            throw error;
        }
    }

    // Unlike (remove like)
    async unlikeItem(likeId) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                likeId
            );
            return true;
        } catch (error) {
            console.error("LikeService :: unlikeItem :: error", error);
            throw error;
        }
    }

    // Get user's like for specific item
    async getUserLike(userId, itemId, itemType) {
        try {
            if (!userId || !itemId || !itemType) {
                console.warn('Missing parameters for getUserLike:', { userId, itemId, itemType });
                return { documents: [] };
            }

            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                [
                    Query.equal("userId", userId),
                    Query.equal("itemId", itemId),
                    Query.equal("itemType", itemType),
                ]
            );
            return response;
        } catch (error) {
            console.error("LikeService :: getUserLike :: error", error);
            // Return empty documents array on error
            return { documents: [] };
        }
    }

    // Get like count for item (post or comment)
    async getLikeCount(itemId, itemType = 'post') {
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                [
                    Query.equal("itemId", itemId),
                    Query.equal("itemType", itemType),
                ]
            );
            return response.total || 0;
        } catch (error) {
            console.error("LikeService :: getLikeCount :: error", error);
            return 0;
        }
    }

    // Get likes for multiple posts/comments (for batch loading)
    async getLikesForItems(itemIds, itemType = 'post') {
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteLikesCollectionId,
                [
                    Query.equal("itemId", itemIds),
                    Query.equal("itemType", itemType),
                ]
            );
            return response.documents || [];
        } catch (error) {
            console.error("LikeService :: getLikesForItems :: error", error);
            return [];
        }
    }
}

const likeService = new LikeService();
export default likeService;