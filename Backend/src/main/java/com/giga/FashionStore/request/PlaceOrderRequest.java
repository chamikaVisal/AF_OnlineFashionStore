package com.giga.FashionStore.request;

import javax.validation.constraints.NotNull;
import java.util.List;

public class PlaceOrderRequest {
    @NotNull
    private String user_Id;
    @NotNull
    private List<OrderProductRequest> products;
    @NotNull
    private String paymentMethod;
    @NotNull
    private String paymentRefID;
    @NotNull
    private String deliveryMethod;
    private String address;

    public @NotNull String getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(@NotNull String user_Id) {
        this.user_Id = user_Id;
    }

    public List<OrderProductRequest> getProducts() {
        return products;
    }

    public void setProducts(List<OrderProductRequest> products) {
        this.products = products;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentRefID() {
        return paymentRefID;
    }

    public void setPaymentRefID(String paymentRefID) {
        this.paymentRefID = paymentRefID;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}

