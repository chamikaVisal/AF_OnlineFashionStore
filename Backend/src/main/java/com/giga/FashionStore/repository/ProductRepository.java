package com.giga.FashionStore.repository;

import com.giga.FashionStore.model.Product;
import com.giga.FashionStore.response.ProductsResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

/**
 * Product repository to communicate with the DB
 */
public interface ProductRepository extends MongoRepository<Product, String> {
    @Query(value = "{}", fields = "{_id : 1, prodName : 1, prodPrice: 1, prodCategory: 1, prodImage: 1}")
    List<ProductsResponse> getProducts(Pageable pageable);
}
