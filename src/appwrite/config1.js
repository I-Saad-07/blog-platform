import config from "../config/config.js";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId, author, readTime, tags}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                    author,
                    readTime,
                    tags,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, author, readTime, tags}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    author,
                    readTime,
                    tags,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                queries,
            )
        } catch (error) {
            throw error;
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error;
        }
    }

    getFileView(fileId){
        return this.storage.getFileView(
            config.appwriteBucketId,
            fileId
        )
    }
}  

const service = new Service()
export default service
