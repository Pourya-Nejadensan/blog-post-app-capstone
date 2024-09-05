import React, { useState } from 'react';
import { createPost } from '../../services/PostService';
import { PostDTO } from '../../dto/PostDTO';

export default function PostCreate() {
    const [formData, setFormData] = useState<PostDTO>({
        title: '',
        content: '',
        author: '',
        date: '',
        time: '',
        likes: 0,
        dislikes: 0,
    });
    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'likes' || name === 'dislikes' ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPost(formData);
            setMessage('Post created successfully');
        } catch (error) {
            console.error('There was an error creating the post!', error);
            setMessage('Error creating post');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input id="author" type="text" name="author" value={formData.author} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input id="time" type="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="likes">Likes:</label>
                    <input id="likes" type="number" name="likes" value={formData.likes} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="dislikes">Dislikes:</label>
                    <input id="dislikes" type="number" name="dislikes" value={formData.dislikes} onChange={handleChange} required />
                </div>
                <button type="submit">Create Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
