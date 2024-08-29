package org.blog.post.app.backend.model;

public record Post(
        String id,
        String title,
        String content,
        String author,
        String date,
        String time,
        int likes,
        int dislikes
) {
}
