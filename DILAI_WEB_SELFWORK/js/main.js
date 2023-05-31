let products = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        uploadProducts(products);
    })


const containerProducts = document.querySelector("#contenedor-productos");
const buttonsCategories = document.querySelectorAll(".boton-categoria");
const mainTitle = document.querySelector("#titulo-principal");
let addButton = document.querySelectorAll(".product-add");
const shtick = document.querySelector("#numerito");


buttonsCategories.forEach(button => button.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function uploadProducts(selectedProducts) {

    containerProducts.innerHTML = "";

    selectedProducts.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-image" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="product-details">
                <h3 class="product-title">${producto.titulo}</h3>
                <p class="product-price">$${producto.precio}</p>
                <button class="product-add" id="${producto.id}">Додати</button>
            </div>
        `;

        containerProducts.append(div);
    })

   refreshButtonsAdd();
}


buttonsCategories.forEach(button => {
    button.addEventListener("click", (e) => {

        buttonsCategories.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "Всі") {
            const productCategory = products.find(producto => producto.categoria.id === e.currentTarget.id);
            mainTitle.innerText = productCategory.categoria.nombre;
            const productButton = products.filter(producto => producto.categoria.id === e.currentTarget.id);
            uploadProducts(productButton);
        } else {
            mainTitle.innerText = "Всі продукти";
            uploadProducts(products);
        }

    })
});

function refreshButtonsAdd() {
    addButton = document.querySelectorAll(".product-add");

    addButton.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

let productsInCart;

let productsInCartLS = localStorage.getItem("productos-en-carrito");

if (productsInCartLS) {
    productsInCart = JSON.parse(productsInCartLS);
    updateShtick();
} else {
    productsInCart = [];
}

function addToCart(e) {

    Toastify({
        text: "Товар додано до корзини",
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
    const productAdded= products.find(producto => producto.id === idButton);

    if(productsInCart.some(producto => producto.id === idButton)) {
        const index = productsInCart.findIndex(producto => producto.id === idButton);
        productsInCart[index].cantidad++;
    } else {
        productAdded.cantidad = 1;
        productsInCart.push(productAdded);
    }

    updateShtick();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productsInCart));
}

function updateShtick() {
    let newAntics = productsInCart.reduce((acc, producto) => acc + producto.cantidad, 0);
    shtick.innerText = newAntics;
}