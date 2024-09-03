package org.blog.post.app.backend.controller;

import lombok.RequiredArgsConstructor;
import org.blog.post.app.backend.dto.PostDTO;
import org.blog.post.app.backend.model.Post;
import org.blog.post.app.backend.service.impl.PostServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Post> createPost(@RequestBody PostDTO postDTO) {
        return new ResponseEntity<>(postServiceImpl.createPost(postDTO),
                HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePostById(@PathVariable(name = "id") String id) {
        postServiceImpl.deletePostById(id);

        return new ResponseEntity<>("Post deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PostDTO> updatePostById(@PathVariable(name = "id") String id, @RequestBody PostDTO postDTO) {
        return new ResponseEntity<>(postServiceImpl.updatePostById(id, postDTO), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable(name = "id") String id) {
        return new ResponseEntity<>(postServiceImpl.getPostById(id), HttpStatus.OK);
    }
}
