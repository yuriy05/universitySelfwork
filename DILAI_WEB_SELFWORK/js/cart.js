let productsInCart = localStorage.getItem("productos-en-carrito");
productsInCart = JSON.parse(productsInCart);

const containerCartEmpty = document.querySelector("#carrito-vacio");
const containerCartProducts = document.querySelector("#carrito-productos");
const containerCartActions = document.querySelector("#carrito-acciones");
const containerCartPurchased = document.querySelector("#carrito-comprado");
let buttonsDelete = document.querySelectorAll(".cart-product-delete");
const emptyButton = document.querySelector("#carrito-acciones-vaciar");
const containerTotal = document.querySelector("#total");
const buttonBuy= document.querySelector("#carrito-acciones-comprar");


function loadProductsCart() {
    if (productsInCart && productsInCart.length > 0) {

        containerCartEmpty.classList.add("disabled");
        containerCartProducts.classList.remove("disabled");
        containerCartActions.classList.remove("disabled");
        containerCartPurchased.classList.add("disabled");
    
        containerCartProducts.innerHTML = "";
    
        productsInCart.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="cart-product-image" src="${product.imagen}" alt="${product.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Назва</small>
                    <h3>${product.titulo}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Кількість</small>
                    <p>${product.cantidad}</p>
                </div>
                <div class="cart-product-price">
                    <small>Ціна</small>
                    <p>$${product.precio}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Загалом</small>
                    <p>$${product.precio * product.cantidad}</p>
                </div>
                <button class="cart-product-delete" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            containerCartProducts.append(div);
        })
    
    refreshButtonsDelete();
    updateTotal();
	
    } else {
        containerCartEmpty.classList.remove("disabled");
        containerCartProducts.classList.add("disabled");
        containerCartActions.classList.add("disabled");
        containerCartPurchased.classList.add("disabled");
    }

}

loadProductsCart();

function refreshButtonsDelete() {
    buttonsDelete = document.querySelectorAll(".cart-product-delete");

    buttonsDelete.forEach(boton => {
        boton.addEventListener("click", removeFromCart);
    });
}

function removeFromCart(e) {
    Toastify({
        text: "Товар видалено",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){} 
      }).showToast();

    const idButton = e.currentTarget.id;
    const index = productsInCart.findIndex(product => product.id === idButton);
    
    productsInCart.splice(index, 1);
    loadProductsCart();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productsInCart));

}

emptyButton.addEventListener("click", emptyСart);
function emptyСart() {

    Swal.fire({
        title: 'Ви впевнені ?',
        icon: 'question',
        html: `Будуть видалені ${productsInCart.reduce((acc, product) => acc + product.cantidad, 0)} товари.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Так',
        cancelButtonText: 'Ні'
    }).then((result) => {
        if (result.isConfirmed) {
            productsInCart.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productsInCart));
            loadProductsCart();
        }
      })
}


function updateTotal() {
    const totalCalculated = productsInCart.reduce((acc, product) => acc + (product.precio * product.cantidad), 0);
    total.innerText = `$${totalCalculated}`;
}

buttonBuy.addEventListener("click", buyCart);
function buyCart() {

    productsInCart.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productsInCart));
    
    containerCartEmpty.classList.add("disabled");
    containerCartProducts.classList.add("disabled");
    containerCartActions.classList.add("disabled");
    containerCartPurchased.classList.remove("disabled");

}