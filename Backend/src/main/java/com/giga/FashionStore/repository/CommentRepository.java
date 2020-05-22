package com.giga.FashionStore.repository;

import com.giga.FashionStore.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
}
