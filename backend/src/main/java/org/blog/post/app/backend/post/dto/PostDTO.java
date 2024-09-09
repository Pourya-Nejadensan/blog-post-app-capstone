package org.blog.post.app.backend.post.dto;

public record PostDTO(
        String title,
        String content,
        String author,
        String date,
        String time,
        int likes,
        int dislikes
) {
}
