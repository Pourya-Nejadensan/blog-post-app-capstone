import React, { useState } from 'react';
import { createPostService } from '../../../services/PostService.tsx';
import { PostDTO } from '../../../dto/PostDTO.tsx';
import { format, parseISO } from 'date-fns';
import { Post } from "../../../models/Post.tsx";

import { TextField, Button, Box, Typography } from '@mui/material';
import styled from 'styled-components';

type PostCreateProps = {
    addNewPost: (newPost: Post) => void;
};

export default function PostCreate({ addNewPost }: Readonly<PostCreateProps>) {

    const [formData, setFormData] = useState({
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
        const { date, time, ...rest } = formData;
        const timestamp = format(parseISO(`${date}T${time}`), "yyyy-MM-dd'T'HH:mm:ssXXX"); // Combine date and time into ISO string
        const postDTO: PostDTO = { ...rest, timestamp };

        try {
            const newPost = await createPostService(postDTO);
            addNewPost(newPost);
            setMessage('Post created successfully');
        } catch (error) {
            console.error('There was an error creating the post!', error);
            setMessage('Error creating post');
        }
    };

    return (
        <StyledContainer>
            <Typography variant="h4" component="h2" align="center">New Post</Typography>
            <Box component="form" mt={4} onSubmit={handleSubmit}>
                <TextField fullWidth label="Title" variant="outlined" margin="normal" name="title" value={formData.title} onChange={handleChange} required />
                <TextField fullWidth label="Author" variant="outlined" margin="normal" name="author" value={formData.author} onChange={handleChange} required />
                <TextField fullWidth label="Content" variant="outlined" margin="normal" name="content" value={formData.content} onChange={handleChange} required multiline rows={6} />
                <TextField fullWidth variant="outlined" margin="normal" name="date" value={formData.date} onChange={handleChange} required type="date"  />
                <TextField fullWidth variant="outlined" margin="normal" name="time" value={formData.time} onChange={handleChange} required type="time" />
                <TextField fullWidth label="Likes" variant="outlined" margin="normal" name="likes" value={formData.likes} onChange={handleChange} required type="number" />
                <TextField fullWidth label="Dislikes" variant="outlined" margin="normal" name="dislikes" value={formData.dislikes} onChange={handleChange} required type="number" />
                <Box mt={2} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" type="submit">Create</Button>
                </Box>
            </Box>
            {message && <Typography variant="body1" color="error" align="center">{message}</Typography>}
        </StyledContainer>
    );
}

const StyledContainer = styled(Box)`
    width: 100%;
    max-width: 800px;
    margin: 32px auto;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;