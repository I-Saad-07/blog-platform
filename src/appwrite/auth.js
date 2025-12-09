import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)      
            .setProject(config.appwriteProjectId);       // your project id
        this.account = new Account(this.client);
    }

    // SIGN UP
    async createAccount({ email, password, name }) {
        try {
            // 1. Create user with email + password
            const user = await this.account.create(
                ID.unique(),  // ← userId (auto-generated)
                email,
                password,
                name          // ← name is 4th parameter now
            );

            // 2. Auto login the user
            if (user) {
                return await this.login({ email, password });
            } else {
                return user;
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    // LOGIN
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    // GET CURRENT USER
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }

    // LOGOUT
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
