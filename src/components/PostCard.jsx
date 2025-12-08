import React from "react";
import appwriteService from "../appwrite/config1.js";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton.jsx";

function PostCard({ $id, title, featuredImage }) {

  const handleLikeClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Link to={`/post/${$id}`} className="block group">
      <article className="h-full bg-surface rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-16/10">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-tight mb-3">
            {title}
          </h2>
          
          <div className="flex items-center justify-between">
            {/* Like Button - ADD THIS */}
            <div className="flex items-center space-x-3" onClick={handleLikeClick}>
              <LikeButton itemId={$id} itemType="post" showCount={true} />
              
              {/* Optional: Comment Count */}
              <div className="flex items-center space-x-1 text-text-secondary text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>0</span> {/* We'll update this later with real comment count */}
              </div>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
              <svg className="w-4 h-4 text-text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard