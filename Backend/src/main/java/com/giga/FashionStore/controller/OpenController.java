package com.giga.FashionStore.controller;

import com.giga.FashionStore.model.*;
import com.giga.FashionStore.repository.CategoryRepository;
import com.giga.FashionStore.repository.ProductRepository;
import com.giga.FashionStore.repository.UserRepository;
import com.giga.FashionStore.response.MessageResponse;
import com.giga.FashionStore.response.ProductResponse;
import com.giga.FashionStore.response.ProductsResponse;
import com.giga.FashionStore.service.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * route controller for non authenticated requests.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/open")
public class OpenController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryRepository categoryRepository;

    static final String IMAGE = "data:image/jpeg;base64,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";

    /**
     * get products
     *
     * @param page number
     * @return products response as json
     */
    @GetMapping("/getproducts")
    public ResponseEntity<?> getProducts(@Valid @RequestParam(value = "page", defaultValue = "1") int page) {
        List<ProductsResponse> products = productRepository.getProducts(PageRequest.of(page - 1, 10));
        return ResponseEntity.ok(products);
    }

    /**
     * get product by Id
     *
     * @param prod_Id Product Id
     * @return products response as json
     */
    @GetMapping("/getproduct")
    public ResponseEntity<?> getProduct(@Valid @RequestParam(value = "prod_Id") String prod_Id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId;
        if (principal instanceof UserDetails) {
            userId = ((UserDetails) principal).getId();
        } else {
            userId = principal.toString();
        }
        User user = userRepository.findById(userId).orElse(null);
        SiteUser siteUser = null;
        if (user instanceof SiteUser) {
            siteUser = (SiteUser) userRepository.findById(userId).orElse(null);
        }

        Product product = productRepository.findById(prod_Id).orElse(null);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).
                    body(new MessageResponse("Product not found!"));
        }

        // average rating
        List<Rating> ratings = product.getProdRatings();
        double avg = 0;
        double userRating = 0;
        if (ratings.size() > 0) {
            for (Rating prodRating : ratings) {
                avg += prodRating.getRating_rate();

                if (siteUser != null && siteUser.getUserID().equals(prodRating.getUser().getUserID())) {
                    userRating = prodRating.getRating_rate();
                }
            }
            avg /= ratings.size();
        }

        for (Comment prodComment : product.getProdComments()) {
            if (prodComment.getComment_user() != null) {
                prodComment.getComment_user().setUserID(null);
                prodComment.getComment_user().setPassword(null);
                prodComment.getComment_user().setRoles(null);
                prodComment.getComment_user().setUsername(null);
                prodComment.getComment_user().setWishList(null);
            }
        }

        double productPrice = Double.valueOf(product.getProdPrice());
        String discountedPrice = product.getProdDiscount() != null ?
                String.valueOf(productPrice - (productPrice * product.getProdDiscount().getDiscountValue() / 100)) :
                product.getProdPrice();
        ProductResponse productResponse = new ProductResponse(product.getProd_id(),
                product.getProdName(),
                product.getProdDescription(),
                product.getProdPrice(),
                discountedPrice,
                product.getProdComments(),
                avg,
                product.getProdDiscount());

        productResponse.setAverageRating(avg);
        if (userRating != 0) {
            productResponse.setProdRating(userRating);
        }

        // set image
        if (product.getProdImage() == null) {
            productResponse.setProdImage(IMAGE);
        } else {
            productResponse.setProdImage(product.getProdImage());
        }
        return ResponseEntity.ok(productResponse);
    }

    /**
     * get categories
     *
     * @return categories response as json
     */
    @GetMapping("/getcategories")
    public ResponseEntity<?> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }
}
