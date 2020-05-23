package com.giga.FashionStore.request;

import javax.validation.constraints.*;

/**
 * Add discount request object class.
 */
public class AddDiscountRequest {
    @NotNull
    @Min(0)
    private String productId;

    @NotBlank
    @Size(min = 0, max = 30)
    private String discountName;

    @NotNull
    @Min(0)
    @Max(99)
    private int discountValue;

    public String getProductId() {
        return productId;
    }

    // getters
    public String getDiscountName() {
        return discountName;
    }

    public int getDiscountValue() {
        return discountValue;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    // setters
    public void setDiscountName(String discountName) {
        this.discountName = discountName;
    }

    public void setDiscountValue(int discountValue) {
        this.discountValue = discountValue;
    }
}
