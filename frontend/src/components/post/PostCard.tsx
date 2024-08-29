import { PostDTO } from '../../models/PostDTO';

export default function PostCard (postDto: Readonly<PostDTO>) {
    return (
        <div key={postDto.id}>
            <h2>{postDto.title}</h2>
            <p>{postDto.content}</p>
            <p><strong>Author:</strong> {postDto.author}</p>
            <p><strong>Date:</strong> {postDto.date} <strong>Time:</strong> {postDto.time}</p>
            <p><strong>Likes:</strong> {postDto.likes} <strong>Dislikes:</strong> {postDto.dislikes}</p>
        </div>
    );
};
