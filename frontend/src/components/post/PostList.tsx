import { useFetchPosts } from '../../hooks/useFetchPosts';
import PostCard from './PostCard';
import { deletePost, updatePost } from '../../services/PostService';
import React, { useState, useEffect } from 'react';
import { Post } from '../../models/Post';
import { PostDTO } from "../../dto/PostDTO";

export default function PostList() {
    const { posts, loading, error } = useFetchPosts();
    const [postList, setPostList] = useState<Post[]>([]);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [editFormData, setEditFormData] = useState<PostDTO>({
        title: '',
        content: '',
        author: '',
        date: '',
        time: '',
        likes: 0,
        dislikes: 0
    });

    useEffect(() => {
        setPostList(posts);
    }, [posts]);

    const handleDelete = async (postId: string) => {
        try {
            await deletePost(postId);
            setPostList(postList.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setEditFormData({
            title: post.title,
            content: post.content,
            author: post.author,
            date: post.date,
            time: post.time,
            likes: post.likes,
            dislikes: post.dislikes
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPost) {
            try {
                const updatedPost = await updatePost(editingPost.id, editFormData);
                setPostList(postList.map(post => (post.id === editingPost.id ? updatedPost : post)));
                setEditingPost(null);
            } catch (error) {
                console.error('Error updating post:', error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditFormData(prevState => ({ ...prevState, [name]: value }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
            {editingPost ? (
                <div>
                    <h2>Edit Post</h2>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={editFormData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="content">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                value={editFormData.content}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="author">Author</label>
                            <input
                                id="author"
                                type="text"
                                name="author"
                                value={editFormData.author}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input
                                id="date"
                                type="date"
                                name="date"
                                value={editFormData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="time">Time</label>
                            <input
                                id="time"
                                type="time"
                                name="time"
                                value={editFormData.time}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="likes">Likes</label>
                            <input
                                id="likes"
                                type="number"
                                name="likes"
                                value={editFormData.likes}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="dislikes">Dislikes</label>
                            <input
                                id="dislikes"
                                type="number"
                                name="dislikes"
                                value={editFormData.dislikes}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => setEditingPost(null)}>Cancel</button>
                    </form>
                </div>
            ) : (
                <ul>
                    {postList.map(post => (
                        <li key={post.id}>
                            <PostCard post={post} onDelete={handleDelete} onEdit={() => handleEdit(post)} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}