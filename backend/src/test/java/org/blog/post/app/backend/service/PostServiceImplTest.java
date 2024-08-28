package org.blog.post.app.backend.service;

import org.blog.post.app.backend.dto.PostDTO;
import org.blog.post.app.backend.model.Post;
import org.blog.post.app.backend.repository.PostRepository;
import org.blog.post.app.backend.service.impl.PostServiceImpl;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceImplTest {

    private final PostRepository postRepository = mock(PostRepository.class);
    private final PostServiceImpl postServiceImpl = new PostServiceImpl(postRepository);

    @Test
    void getAllPostsTest_whenPostsAreEmpty_thenReturnTrue() {
        // given
        when(postRepository.findAll()).thenReturn(List.of());

        // when
        List<PostDTO> posts = postServiceImpl.getAllPosts();

        // then
        assertTrue(posts.isEmpty());
    }

    @Test
    void getAllPostsTest_whenPostsAreNotEmpty_thenReturnTrue() {
        // given
        when(postRepository.findAll()).thenReturn(List.of(
                new Post("1", "Title1", "Content1", "Author1", "2023-10-01", "10:00", 10, 1),
                new Post("2", "Title2", "Content2", "Author2", "2023-10-02", "11:00", 20, 2)
        ));

        // when
        List<PostDTO> posts = postServiceImpl.getAllPosts();

        // then
        assertFalse(posts.isEmpty());
    }

    @Test
    void getAllPostsTest_whenPostsAreReturned_thenReturnSamePosts() {
        // given
        List<Post> mockPosts = List.of(
                new Post("1", "Title1", "Content1", "Author1", "2023-10-01", "10:00", 10, 1),
                new Post("2", "Title2", "Content2", "Author2", "2023-10-02", "11:00", 20, 2)
        );
        when(postRepository.findAll()).thenReturn(mockPosts);

        // when
        List<PostDTO> posts = postServiceImpl.getAllPosts();

        // then
        verify(postRepository).findAll();
        assertEquals(mockPosts.size(), posts.size());
        for (int i = 0; i < mockPosts.size(); i++) {
            Post mockPost = mockPosts.get(i);
            PostDTO postDTO = posts.get(i);
            assertEquals(mockPost.id(), postDTO.id());
            assertEquals(mockPost.title(), postDTO.title());
            assertEquals(mockPost.content(), postDTO.content());
            assertEquals(mockPost.author(), postDTO.author());
            assertEquals(mockPost.date(), postDTO.date());
            assertEquals(mockPost.time(), postDTO.time());
            assertEquals(mockPost.likes(), postDTO.likes());
            assertEquals(mockPost.dislikes(), postDTO.dislikes());
        }
    }
}