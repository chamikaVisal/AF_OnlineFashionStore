package com.giga.FashionStore.service;

import com.giga.FashionStore.model.Role;
import com.giga.FashionStore.model.Roles;
import com.giga.FashionStore.repository.RoleRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class Manager {
    RoleRepository roleRepository;

    public static UserDetails userDetails;

    public Manager(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
        Set<Role> roles = new HashSet<>();

        Role adminRole = roleRepository.findByName(Roles.ROLE_STORE_MANAGER)
                .orElseThrow(() -> new RuntimeException("Error: Role not found."));
        roles.add(adminRole);

        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName().name()))
                .collect(Collectors.toList());

        userDetails = new UserDetails(String.valueOf(-1),
                "manager@gigara.info", "giga", authorities);
    }

    public static UserDetails getManager(RoleRepository roleRepository) {
        if (userDetails == null) {
            new Manager(roleRepository);
        }
        return userDetails;
    }
}
