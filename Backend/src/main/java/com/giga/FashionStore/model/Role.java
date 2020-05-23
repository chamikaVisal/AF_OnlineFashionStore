package com.giga.FashionStore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents the user role.
 */
@Document(collection = "roles")
public class Role {
    @Id
    private String roleID;
    private Roles name;

    public Role(String roleID, Roles name) {
        this.roleID = roleID;
        this.name = name;
    }

    // getters
    public String getRoleID() {
        return roleID;
    }

    public Roles getRoleName() {
        return name;
    }

    // setters
    public void setRoleID(String roleID) {
        this.roleID = roleID;
    }

    public void setRoleName(Roles name) {
        this.name = name;
    }
}
