package com.giga.FashionStore.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class AddToWishListRequest {
    @NotNull @Min(0)
    private String prod_Id;
    private String user_Id;

    // getters
    public @NotNull @Min(0) String getProd_Id() {
        return prod_Id;
    }

    public String getUser_Id() {
        return user_Id;
    }

    // setters
    public void setProd_Id(@NotNull @Min(0) String prod_Id) {
        this.prod_Id = prod_Id;
    }

    public void setUser_Id(String user_Id) {
        this.user_Id = user_Id;
    }
}
