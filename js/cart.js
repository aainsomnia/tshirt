var ShoppingCart = (function($) {
    "use strict";
    
    // Cahce necesarry DOM Elements
    var productsEl = document.querySelector(".productsjs"),
        cartEl =     document.querySelector(".shopping-cart-list"),
        productQuantityEl = document.querySelector(".product-quantity"),
        emptyCartEl = document.querySelector(".empty-cart-btn"),
        cartCheckoutEl = document.querySelector(".cart-checkout"),
        totalPriceEl = document.querySelector(".total-price");
    
    // JSON ARRAY API DATABASE
    var products = [
      {
        id: 0,
        name: "Eagle Round T-Shirt",
        description: "Eagle Round T-Shirt",
        imageUrl: "https://eagle.co.id/wp-content/uploads/2020/12/Round-T-shirt-Maroon.jpg",
        price: 99900
      },
      {
        id: 1,
        name: "T-shirt Badminton Nest",
        description: "T-shirt Badminton Nest ",
        imageUrl: "https://eagle.co.id/wp-content/uploads/2021/11/Nest-1.jpg",
        price: 131900
      },
      {
        id: 2,
        name: "T Shirt Badminton Round Neck",
        description: "T Shirt Badminton Round Neck",
        imageUrl: "https://eagle.co.id/wp-content/uploads/2023/03/Round-Neck-4.jpg",
        price: 69900
      },
      {
        id: 3,
        name: "T-Shirt Badminton Jersey Lightburst",
        description: "T-Shirt Badminton Jersey Lightburst",
        imageUrl: "https://eagle.co.id/wp-content/uploads/2022/10/Light-Burst-1.jpg",
        price: 131900
      },
      {
        id: 4,
        name: "PANTS BADMINTON COMBY 2",
        description: "PANTS BADMINTON COMBY 2",
        imageUrl: "https://eagle.co.id/wp-content/uploads/2022/09/Combi-2-B.jpg",
        price: 119900
      },
      {
        id: 5,
        name: "T-SHIRT BADMINTON WINGS",
        description: "T-SHIRT BADMINTON WINGS        ",
        imageUrl: "https://eagle.co.id/wp-content/uploads/2022/08/New-Jersey-3.jpg",
        price: 189000
      },
      
    ],
        productsInCart = [];
    
    // Pretty much self explanatory function. NOTE: Here I have used template strings (ES6 Feature)
    var generateProductList = function() {
      products.forEach(function(item) {
        var productEl = document.createElement("div");
        productEl.className = "productx";
        productEl.innerHTML = `<div class="productx-image">
                                  <img src="${item.imageUrl}" alt="${item.name}">
                               </div>
                               <div class="product-name"><span>Product:</span> ${item.name}</div>
                               <div class="product-description"><span>Description:</span> ${item.description}</div>
                               <div class="product-price"><span>Price:</span>Rp ${item.price}</div>
                               <div class="product-add-to-cart">
                                 <a href="../product/product_${item.id}" class="button see-more">Details</a>
                                 <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                               </div>
                            </div>
  `;
                               
  productsEl.appendChild(productEl);
      });
    }
    
    // Like one before and I have also used ES6 template strings
    var generateCartList = function() {
      
      cartEl.innerHTML = "";
      
      productsInCart.forEach(function(item) {
        var li = document.createElement("li");
        li.innerHTML = `${item.quantity} ${item.product.name} - Rp ${item.product.price * item.quantity}`;
        cartEl.appendChild(li);
      });
      
      productQuantityEl.innerHTML = productsInCart.length;
      
      generateCartButtons()
    }
    // var whatsapp
    
    // var whatsapp
    
    
    // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
    var generateCartButtons = function() {
      if(productsInCart.length > 0) {
        emptyCartEl.style.display = "block";
        cartCheckoutEl.style.display = "block"
        totalPriceEl.innerHTML = "Rp. " + calculateTotalPrice();
      } else {
        emptyCartEl.style.display = "none";
        cartCheckoutEl.style.display = "none";
      }
    }
    
    // Setting up listeners for click event on all products and Empty Cart button as well
    var setupListeners = function() {
      productsEl.addEventListener("click", function(event) {
        var el = event.target;
        if(el.classList.contains("add-to-cart")) {
         var elId = el.dataset.id;
         addToCart(elId);
        }
      });
      
      emptyCartEl.addEventListener("click", function(event) {
        if(confirm("Are you sure?")) {
          productsInCart = [];
        }
        generateCartList();
      });
    }
    
    // Adds new items or updates existing one in productsInCart array
    var addToCart = function(id) {
      var obj = products[id];
      if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
        productsInCart.push({product: obj, quantity: 1});
      } else {
        productsInCart.forEach(function(item) {
          if(item.product.id === obj.id) {
            item.quantity++;
          }
        });
      }
      generateCartList();
    }
    
    
    // This function checks if project is already in productsInCart array
    var productFound = function(productId) {
      return productsInCart.find(function(item) {
        return item.product.id === productId;
      });
    }
  
    var calculateTotalPrice = function() {
      return productsInCart.reduce(function(total, item) {
        return total + (item.product.price *  item.quantity);
      }, 0);
    }
    
    // This functon starts the whole application
    var init = function() {
      generateProductList();
      setupListeners();
    }
    
    // Exposes just init function to public, everything else is private
    return {
      init: init
    };
    
    // I have included jQuery although I haven't used it
  })(jQuery);
  
  ShoppingCart.init();