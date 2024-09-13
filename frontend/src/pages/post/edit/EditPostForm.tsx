import React, { useState } from 'react';
import { Post } from '../../../models/Post.tsx';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from "date-fns";
import { PostDTO } from "../../../dto/PostDTO.tsx";
import { updatePostService } from "../../../services/PostService.tsx";

import { TextField, Button, Box, Typography } from '@mui/material';
import styled from 'styled-components';

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
        <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h5" component="h2">Edit Post: {formData.title}</Typography>
            <FormField>
                <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth />
            </FormField>
            <FormField>
                <TextField label="Content" name="content" value={formData.content} onChange={handleChange} multiline rows={4} fullWidth />
            </FormField>
            <FormField>
                <TextField label="Author" name="author" value={formData.author} onChange={handleChange} fullWidth />
            </FormField>
            <FormField>
                <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} fullWidth />
            </FormField>
            <FormField>
                <TextField label="Time" name="time" type="time" value={formData.time} onChange={handleChange} fullWidth />
            </FormField>
            <FormField>
                <TextField label="Likes" name="likes" type="number" value={formData.likes} onChange={handleChange} fullWidth />
            </FormField>
            <FormField>
                <TextField label="Dislikes" name="dislikes" type="number" value={formData.dislikes} onChange={handleChange} fullWidth />
            </FormField>
            <Button type="submit" variant="contained" color="primary">Update</Button>
        </StyledForm>
    );
}

const StyledForm = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 600px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;