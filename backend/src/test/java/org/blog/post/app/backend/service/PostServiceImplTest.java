package org.blog.post.app.backend.service;

import org.blog.post.app.backend.dto.PostDTO;
import org.blog.post.app.backend.exception.ResourceNotFoundException;
import org.blog.post.app.backend.model.Post;
import org.blog.post.app.backend.repository.PostRepository;
import org.blog.post.app.backend.service.impl.PostServiceImpl;
import org.blog.post.app.backend.util.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceImplTest {

    private final PostRepository postRepository = mock(PostRepository.class);
    private final IdService idService = mock(IdService.class);
    private final PostServiceImpl postServiceImpl = new PostServiceImpl(postRepository, idService);

    @Test
    void getAllPostsTest_whenPostsAreEmpty_thenReturnTrue() {
        // given
        when(postRepository.findAll()).thenReturn(List.of());

        // when
        List<Post> posts = postServiceImpl.getAllPosts();

        // then
        assertTrue(posts.isEmpty());
    }

    @Test
    void getAllPostsTest_whenPostsAreNotEmpty_thenReturnTrue() {
        // given
        when(postRepository.findAll()).thenReturn(List.of(
                new Post(
                        "1",
                        "Title1",
                        "Content1",
                        "Author1",
                        "2023-10-01",
                        "10:00",
                        10,
                        1
                ),

                new Post(
                        "2",
                        "Title2",
                        "Content2",
                        "Author2",
                        "2023-10-02",
                        "11:00",
                        20,
                        2
                )
        ));

        // when
        List<Post> posts = postServiceImpl.getAllPosts();

        // then
        assertFalse(posts.isEmpty());
        assertEquals(2, posts.size());
        assertEquals("Title1", posts.get(0).title());
        assertEquals("Title2", posts.get(1).title());
    }

    @Test
    void getAllPostsTest_whenPostsAreReturned_thenReturnSamePosts() {
        // given
        List<Post> mockPosts = List.of(
                new Post(
                        "1",
                        "Title1",
                        "Content1",
                        "Author1",
                        "2023-10-01",
                        "10:00",
                        10,
                        1
                ),

                new Post(
                        "2",
                        "Title2",
                        "Content2",
                        "Author2",
                        "2023-10-02",
                        "11:00",
                        20,
                        2
                )
        );

        when(postRepository.findAll()).thenReturn(mockPosts);

        // when
        List<Post> posts = postServiceImpl.getAllPosts();

        // then
        verify(postRepository).findAll();
        assertEquals(mockPosts, posts);
        assertEquals(2, posts.size());
        assertEquals("Title1", posts.get(0).title());
        assertEquals("Title2", posts.get(1).title());
    }

    @Test
    void createPostTest_whenPostIsCreated_thenReturnCreatedPost() {
        // given
        Post expectedPost = new Post(
                "1",
                "Title1",
                "Content1",
                "Author1",
                "2023-10-01",
                "10:00",
                10,
                1);
        when(postRepository.save(expectedPost)).thenReturn(expectedPost);
        when(idService.generateId()).thenReturn(expectedPost.id());

        PostDTO postDTO = new PostDTO(
                expectedPost.title(),
                expectedPost.content(),
                expectedPost.author(),
                expectedPost.date(),
                expectedPost.time(),
                expectedPost.likes(),
                expectedPost.dislikes());

        // when
        Post createdPost = postServiceImpl.createPost(postDTO);

        // then
        verify(postRepository).save(expectedPost);
        verify(idService).generateId();
        assertEquals(expectedPost, createdPost);
    }

    @Test
    @DirtiesContext
    void deletePostById_whenPostExists_thenPostIsDeleted(){
        // given
        Post post = new Post(
                "1",
                "Title1",
                "Content1",
                "Author1",
                "2023-10-01",
                "10:00",
                10,
                1
        );
        when(postRepository.findById("1")).thenReturn(Optional.of(post));
        doNothing().when(postRepository).delete(post);

        // when
        postServiceImpl.deletePostById("1");

        // then
        verify(postRepository).findById("1");
        verify(postRepository).delete(post);
    }

    @Test
    @DirtiesContext
    void deletePostById_whenPostDoesNotExist_thenThrowResourceNotFoundException() {
        // given
        when(postRepository.findById("1")).thenReturn(Optional.empty());

        // when & then
        assertThrows(ResourceNotFoundException.class, () -> postServiceImpl.deletePostById("1"));
    }

    @Test
    void updatePostById_whenPostExists_thenPostIsUpdated() {
        // given
        Post post = new Post(
                "1",
                "Title1",
                "Content1",
                "Author1",
                "2023-10-01",
                "10:00",
                10,
                1
        );
        when(postRepository.findById("1")).thenReturn(Optional.of(post));
        when(postRepository.save(post)).thenReturn(post);

        PostDTO postDTO = new PostDTO(
                "Title1",
                "Content1",
                "Author1",
                "2023-10-01",
                "10:00",
                10,
                1
        );

        // when
        PostDTO updatedPost = postServiceImpl.updatePostById("1", postDTO);

        // then
        verify(postRepository).findById("1");
        verify(postRepository).save(post);
        assertEquals(postDTO, updatedPost);
    }

    @Test
    void updatePostById_whenPostDoesNotExist_thenThrowResourceNotFoundException() {
        // given
        when(postRepository.findById("1")).thenReturn(Optional.empty());

        PostDTO postDTO = new PostDTO(
                "Title1",
                "Content1",
                "Author1",
                "2023-10-01",
                "10:00",
                10,
                1
        );

        // when & then
        assertThrows(ResourceNotFoundException.class, () -> postServiceImpl.updatePostById("1", postDTO));
    }
}