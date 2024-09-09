package org.blog.post.app.backend.post.repository;

import org.blog.post.app.backend.post.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
}
