import React, { useState } from 'react';
import { Post } from '../../models/Post';
import { updatePost } from '../../services/PostService';
import { useNavigate } from 'react-router-dom';
import {format, parseISO} from "date-fns";
import {PostDTO} from "../../dto/PostDTO.tsx";

type EditPostFormProps = {
    postId: string;
    post: Post | undefined;
};

export default function EditPostForm({ postId, post }: Readonly<EditPostFormProps>) {

    const parsedDate = parseISO(post?.timestamp ?? '');

    const date = format(parsedDate, 'yyyy-MM-dd');
    const time = format(parsedDate, 'HH:mm');

    const initialPost: Post = post || {
        id: '',
        title: '',
        content: '',
        author: '',
        timestamp:'',
        likes: 0,
        dislikes: 0,
    };

    const [formData, setFormData] = useState({
        id: initialPost.id,
        title: initialPost.title,
        content: initialPost.content,
        author: initialPost.author,
        date: date,
        time: time,
        likes: initialPost.likes,
        dislikes: initialPost.dislikes,
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            formData.id = postId;
            const timestamp = format(parseISO(`${formData.date}T${formData.time}`), "yyyy-MM-dd'T'HH:mm:ssXXX"); // Combine date and time into ISO string
            const postDTO: PostDTO = { ...formData, timestamp };

            await updatePost(formData.id, postDTO);
            alert('Post updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post');
        }
    };

    return (
        <div>
            <h2>Edit Post: {formData.title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input id="title" type="text" name="title" defaultValue={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="content">Content: </label>
                    <textarea id="content" name="content" defaultValue={formData.content} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input id="author" type="text" name="author" defaultValue={formData.author} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="date">Date: </label>
                    <input id="date" type="date" name="date" defaultValue={formData.date} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="time">Time: </label>
                    <input id="time" type="time" name="time" defaultValue={formData.time} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="likes">Likes: </label>
                    <input id="likes" type="number" name="likes" defaultValue={formData.likes} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="dislikes">Dislikes: </label>
                    <input id="dislikes" type="number" name="dislikes" defaultValue={formData.dislikes} onChange={handleChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
