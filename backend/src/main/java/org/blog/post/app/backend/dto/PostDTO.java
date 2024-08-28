package org.blog.post.app.backend.dto;

public record PostDTO(
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
