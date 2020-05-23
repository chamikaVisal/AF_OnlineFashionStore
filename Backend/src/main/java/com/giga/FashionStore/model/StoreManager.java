package com.giga.FashionStore.model;

/**
 * Store manager user class that extends the abstract user class.
 */
public class StoreManager extends User {
    public StoreManager(String userID, String firstName, String lastName, String username, String email, String password) {
        super(userID, firstName, lastName, username, email, password);
    }
}
