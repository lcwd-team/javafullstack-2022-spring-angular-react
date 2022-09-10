package com.ecom.models;

import org.hibernate.annotations.OrderBy;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    @OneToOne
    private User user;


    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
   // @OrderBy(clause = "cardItemid")
    private Set<CartItem> items = new LinkedHashSet<>();


    public int getCartId() {
        return cartId;
    }


    public void setCartId(int cartId) {
        this.cartId = cartId;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }


    public Set<CartItem> getItems() {
        return items;
    }


    public void setItems(Set<CartItem> items) {
        this.items = items;
    }


}
