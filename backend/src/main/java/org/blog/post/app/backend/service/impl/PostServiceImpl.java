package org.blog.post.app.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.blog.post.app.backend.dto.PostDTO;
import org.blog.post.app.backend.exception.ResourceNotFoundException;
import org.blog.post.app.backend.model.Post;
import org.blog.post.app.backend.repository.PostRepository;
import org.blog.post.app.backend.service.PostService;
import org.blog.post.app.backend.util.IdService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final IdService idService;

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll().stream()
                .map(post -> new Post(
                        post.id(),
                        post.title(),
                        post.content(),
                        post.author(),
                        post.date(),
                        post.time(),
                        post.likes(),
                        post.dislikes()))
                .toList();
    }

    @Override
    public Post createPost(PostDTO postDTO) {
        Post newPost = new Post(
                idService.generateId(),
                postDTO.title(),
                postDTO.content(),
                postDTO.author(),
                postDTO.date(),
                postDTO.time(),
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
        .withDate(postDTO.date())
        .withTime(postDTO.time())
        .withLikes(postDTO.likes())
        .withDislikes(postDTO.dislikes());

        postRepository.save(post);

        return new PostDTO(
                post.title(),
                post.content(),
                post.author(),
                post.date(),
                post.time(),
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
                        post.date(),
                        post.time(),
                        post.likes(),
                        post.dislikes()))
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
    }
}
