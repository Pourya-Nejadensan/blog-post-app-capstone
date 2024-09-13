import { Post } from "../../models/Post.tsx";
import { PostDTO } from "../../dto/PostDTO.tsx";

export function convertPostDTOToPost(postId: string, postDTO: PostDTO): Post {
    return {
        id: postId,
        title: postDTO.title,
        content: postDTO.content,
        author: postDTO.author,
        timestamp: postDTO.timestamp,
        likes: postDTO.likes,
        dislikes: postDTO.dislikes
    };
}
