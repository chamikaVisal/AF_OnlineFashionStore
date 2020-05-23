package com.giga.FashionStore.repository;

import com.giga.FashionStore.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}
