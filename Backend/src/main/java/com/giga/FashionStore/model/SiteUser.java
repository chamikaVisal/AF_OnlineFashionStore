package com.giga.FashionStore.model;

import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.HashSet;
import java.util.Set;

/**
 * Site user class that extends the abstract user class.
 */
public class SiteUser extends User {
    @DBRef
    private Set<Product> wishList = new HashSet<>();

    public SiteUser(String userID, String firstName, String lastName, String username, String email, String password) {
        super(userID, firstName, lastName, username, email, password);
    }

    // getters & setters
    public Set<Product> getWishList() {
        return wishList;
    }

    public void setWishList(Set<Product> wishList) {
        this.wishList = wishList;
    }
}


//public class SiteUser extends User {
//    @DBRef
//    private Set<Product> wishList = new HashSet<>();
//
//    public SiteUser(String userID, String firstName, String lastName, String username, String email, String password) {
//        super(userID, firstName, lastName, username, email, password);
//    }
//
//    // getters & setters
//    public Set<Product> getWishList() {
//        return wishList;
//    }
//
//    public void setWishList(Set<Product> wishList) {
//        this.wishList = wishList;
//    }
//}