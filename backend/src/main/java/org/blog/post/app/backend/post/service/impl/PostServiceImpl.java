package org.blog.post.app.backend.post.service.impl;

import lombok.RequiredArgsConstructor;
import org.blog.post.app.backend.post.dto.PostDTO;
import org.blog.post.app.backend.post.exception.ResourceNotFoundException;
import org.blog.post.app.backend.post.model.Post;
import org.blog.post.app.backend.post.repository.PostRepository;
import org.blog.post.app.backend.post.service.PostService;
import org.blog.post.app.backend.post.util.IdService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final IdService idService;

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post createPost(PostDTO postDTO) {
        Post newPost = new Post(
                idService.generateId(),
                postDTO.title(),
                postDTO.content(),
                postDTO.author(),
                postDTO.timestamp(),
                postDTO.likes(),
                postDTO.dislikes()
        );
        return postRepository.save(newPost);
    }

    @Override
    public void deletePostById(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        postRepository.delete(post);
    }

    @Override
    public PostDTO updatePostById(String id, PostDTO postDTO) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id))
                .withTitle(postDTO.title())
                .withContent(postDTO.content())
                .withAuthor(postDTO.author())
                .withTimestamp(postDTO.timestamp())
                .withLikes(postDTO.likes())
                .withDislikes(postDTO.dislikes());

        postRepository.save(post);

        return new PostDTO(
                post.title(),
                post.content(),
                post.author(),
                post.timestamp(),
                post.likes(),
                post.dislikes()
        );
    }

    @Override
    public PostDTO getPostById(String id) {
        return postRepository.findById(id)
                .map(post -> new PostDTO(
                        post.title(),
                        post.content(),
                        post.author(),
                        post.timestamp(),
                        post.likes(),
                        post.dislikes()))
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
    }
}
