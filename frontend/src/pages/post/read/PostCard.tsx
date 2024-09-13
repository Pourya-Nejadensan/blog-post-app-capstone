import styled from 'styled-components';
import {Card, CardContent, Typography, CardMedia, Button} from '@mui/material';

import { Link } from 'react-router-dom';
import { Post } from "../../../models/Post.tsx";
import { format } from 'date-fns';
import defaultImage from '../../../assets/default-image.png';

type PostCardProps = {
    post: Post;
    onDelete: (postId: string) => void;
}

export default function PostCard({ post, onDelete }: Readonly<PostCardProps>) {

    const handleDeletePostCard = (postId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            onDelete(postId);
        }
    };

    const formattedDate = format(new Date(post.timestamp), 'yyyy-MM-dd');
    const formattedTime = format(new Date(post.timestamp), 'HH:mm');
    const imageUrl = defaultImage;


    return (
        <StyledCard>
            <Link to={`/detail-post/${post.id}`} state={post.id}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={post.title}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.content}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        By {post.author} on {formattedDate} at {formattedTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Likes: {post.likes} Dislikes: {post.dislikes}
                    </Typography>
                </CardContent>
            </Link>
            <Button variant="contained" color="error" size="small" sx={{ mb: 2, ml: 2, mt: 2}} onClick={() => handleDeletePostCard(post.id)}>Delete</Button>
        </StyledCard>
    );
}

const StyledCard = styled(Card)`
    margin: 16px;
    width: 100%;
    max-width: 600px;
`;
