import styled from 'styled-components';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { Post } from "../../models/Post";

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

    return (
        <StyledCard>
            <Link to={`/detail-post/${post.id}`} state={post.id}>
                <CardMedia
                    component="img"
                    height="140"
                    image={post.imageUrl}
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
                        By {post.author} on {post.date} at {post.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Likes: {post.likes} Dislikes: {post.dislikes}
                    </Typography>
                </CardContent>
            </Link>
            <DeleteButton onClick={() => handleDeletePostCard(post.id)}>Delete</DeleteButton>
        </StyledCard>
    );
}

const StyledCard = styled(Card)`
    margin: 16px;
    width: 100%;
    max-width: 600px;
`;

const DeleteButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    margin: 16px;
    border-radius: 4px;
    &:hover {
        background-color: #d32f2f;
    }
`;