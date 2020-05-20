package com.giga.FashionStore.repository;

import com.giga.FashionStore.model.OrderProduct;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderProductRepository extends MongoRepository<OrderProduct, String> {
}
