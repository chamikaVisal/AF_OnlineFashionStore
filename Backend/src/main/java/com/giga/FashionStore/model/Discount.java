package com.giga.FashionStore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Product discount model.
 */
@Document(collection = "discounts")
public class Discount {
    public static final String SEQUENCE_NAME = "discount_sequence";

    @Id
    private String discountId;
    private String discountName;
    private int discountValue;

    public Discount(String discountId, String discountName, int discountValue) {
        this.discountId = discountId;
        this.discountName = discountName;
        this.discountValue = discountValue;
    }

    // getters
    public String getDiscountId() {
        return discountId;
    }

    public String getDiscountName() {
        return discountName;
    }

    public int getDiscountValue() {
        return discountValue;
    }

    // setters
    public void setDiscountId(String discountId) {
        this.discountId = discountId;
    }

    public void setDiscountName(String discountName) {
        this.discountName = discountName;
    }

    public void setDiscountValue(int discountValue) {
        this.discountValue = discountValue;
    }
}
