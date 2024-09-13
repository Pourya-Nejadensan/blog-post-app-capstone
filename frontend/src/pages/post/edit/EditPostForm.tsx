import React, { useState } from 'react';
import { Post } from '../../../models/Post.tsx';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from "date-fns";
import { PostDTO } from "../../../dto/PostDTO.tsx";
import { updatePostService } from "../../../services/PostService.tsx";

type EditPostFormProps = {
    post: Post;
    updatePost: (postId: string, updatedPost: Post) => void;
};

export default function EditPostForm({ post, updatePost }: Readonly<EditPostFormProps>) {

    const parsedDate = parseISO(post.timestamp);
    const date = format(parsedDate, 'yyyy-MM-dd');
    const time = format(parsedDate, 'HH:mm');

    const [formData, setFormData] = useState({
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author,
        date: date,
        time: time,
        likes: post.likes,
        dislikes: post.dislikes,
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
            const timestamp = format(parseISO(`${formData.date}T${formData.time}`), "yyyy-MM-dd'T'HH:mm:ssXXX"); // Combine date and time into ISO string

            const postDTO: PostDTO = {
                title: formData.title,
                content: formData.content,
                author: formData.author,
                timestamp: timestamp,
                likes: formData.likes,
                dislikes: formData.dislikes
            };

            const updatedPostDTO = await updatePostService(formData.id, postDTO);
            updatePost(formData.id, updatedPostDTO);

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
