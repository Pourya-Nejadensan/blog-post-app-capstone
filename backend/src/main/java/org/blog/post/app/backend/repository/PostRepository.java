package org.blog.post.app.backend.repository;

import org.blog.post.app.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
}
