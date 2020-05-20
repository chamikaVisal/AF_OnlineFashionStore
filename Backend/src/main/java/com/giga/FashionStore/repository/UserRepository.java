package com.giga.FashionStore.repository;

import com.giga.FashionStore.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

// user repository to communicate with the DB.
public interface UserRepository extends MongoRepository<User, String> {
    @Query(value = "{email : ?0}", exists = true)
    Boolean existsByEmail(String email);

    Optional<User> findByUsername(String username);
}
