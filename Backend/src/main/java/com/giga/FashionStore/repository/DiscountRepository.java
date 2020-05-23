package com.giga.FashionStore.repository;

import com.giga.FashionStore.model.Discount;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DiscountRepository extends MongoRepository<Discount, String> {
}
