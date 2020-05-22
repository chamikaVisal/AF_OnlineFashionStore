package com.giga.FashionStore.repository;

import com.giga.FashionStore.model.Rating;
import com.giga.FashionStore.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Rating repository to communicate with the DB
 */
public interface RatingRepository extends MongoRepository<Rating, String> {
    Optional<Rating> findByUser(User user);
}
