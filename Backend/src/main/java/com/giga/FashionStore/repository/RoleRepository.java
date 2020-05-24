package com.giga.FashionStore.repository;

import com.giga.FashionStore.model.Role;
import com.giga.FashionStore.model.Roles;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

// role repository to communicate with the DB.
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(Roles name);
}
