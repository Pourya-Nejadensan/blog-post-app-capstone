package org.blog.post.app.backend.post.controller;

import lombok.RequiredArgsConstructor;
import org.blog.post.app.backend.post.dto.PostDTO;
import org.blog.post.app.backend.post.model.Post;
import org.blog.post.app.backend.post.service.impl.PostServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postServiceImpl;

    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postServiceImpl.getAllPosts();
    }

    @PostMapping("/create")
    public Post createPost(@RequestBody PostDTO postDTO) {
        return postServiceImpl.createPost(postDTO);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePostById(@PathVariable(name = "id") String id) {
        postServiceImpl.deletePostById(id);

        return "Post deleted successfully";
    }

    @PutMapping("/update/{id}")
    public PostDTO updatePostById(@PathVariable(name = "id") String id, @RequestBody PostDTO postDTO) {
        return postServiceImpl.updatePostById(id, postDTO);
    }

    @GetMapping("/{id}")
    public PostDTO getPostById(@PathVariable(name = "id") String id) {
        return postServiceImpl.getPostById(id);
    }
}
