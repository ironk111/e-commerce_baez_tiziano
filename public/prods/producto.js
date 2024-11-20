/*class producto {
    constructor(titulo, detalle, precio, stock, imagen) {
        this.titulo = titulo,
        this.detalle = detalle,
        this.precio = precio,
        this.stock = stock,
        this.imagen = imagen
    }
}*/

//let bmw = new producto("BMW 3 Series GT M Sport", "Powered by the four-cylinder turbo diesel N47, 184 hp. Acceleration to 100 km/h comes in just under 8 seconds. 4.9 to 5.1 liters per 100 kilometers.", "$1.000", 2, "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/1.jpg");

let data = [
    {
      id: 1,
      nombre: "BMW",
      modelo: 2022,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/1.jpg",
      stock: 10,
      price: 2,
    },
    {
      id: 2,
      nombre: "Alfa Romeo",
      modelo: 2020,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/2.jpg",
      stock: 10,
      price: 2,
    },
    {
      id: 3,
      nombre: "Mercedes-Benz",
      modelo: 2021,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/3.jpg",
      stock: 10,
      price: 2,
    },
    {
      id: 4,
      nombre: "Audi",
      modelo: 2018,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/4.jpg",
      stock: 10,
      price: 2,
    },
    {
      id: 5,
      nombre: "Kia",
      modelo: 2002,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/5.jpg",
      stock: 10,
      price: 2,
    },
    {
      id: 6,
      nombre: "Chevrolet",
      modelo: 1997,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/6.jpg",
      stock: 8,
      price: 2,
    },
    {
      id: 7,
      nombre: "Hyundai",
      modelo: 1993,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/7.jpg",
      stock: 10,
      price: 2,
    },
    {
      id: 8,
      nombre: "Lamborghini",
      modelo: 1991,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/8.jpg",
      stock: 4,
      price: 2,
    },
    {
      id: 9,
      nombre: "Volkswagen",
      modelo: 2003,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/9.jpg",
      stock: 10,
      price: 2,
    },
    {
      id: 10,
      nombre: "Suzuki",
      modelo: 1999,
      img: "https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/10.jpg",
      stock: 2,
      price: 2,
    },
  ];

// Obtener ID del producto de la URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('prod'), 10);

// Buscar el producto en el array
const producto = data.find(item => item.id === productId);

// Generar el contenido del producto
if (producto) {
  let card = `<div class="row justify-content-center" >
              <div class="col-lg-8 col-md-10">
                  <div class="card" id="producto">
                      <div class="row g-0">
                          <div class="col-md-6">
                              <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.nombre}">
                          </div>
                          <div class="col-md-6">
                              <div class="card-body">
                                  <h5 class="card-title">${producto.nombre}</h5>
                                  <p class="card-text poppins-light">Modelo: ${producto.modelo}</p>
                                  <h5 class="card-title">Stock: ${producto.stock}</h5>
                                  ${localStorage.getItem("email")
                                  ? `<div class="input-group">
                                      <input type="number" class="form-control" value="1">
                                      <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" onclick="increaseItem()">+</button>
                                        <button class="btn btn-outline-secondary" type="button" onclick="decreaseItem()">-</button>
                                      </div>
                                    </div>
                                    <a class="btn btn-primary rounded-pill" onclick="buy()">Add to cart</a>`
                                  : '<a href="/public/login.html" class="btn btn-primary rounded-pill">Iniciar sesión para comprar</a>'}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              </div>`;
  document.querySelector("main").innerHTML = card;
} else {
  document.querySelector("main").innerHTML = "<p>Producto no encontrado.</p>";
}

// --------- Shopping Cart -----------
const counter = document.querySelector("#producto .input-group input");

//INCREASE
function increaseItem() {
  const idProduct = Number(window.location.search.split("=")[1])

  const product = data.find(item => item.id === idProduct)

  if(product.stock > counter.value){
    counter.value = Number(counter.value) + 1
  }
}

//DECREASE
function decreaseItem() {
  if(Number(counter.value) > 1){
    counter.value = Number(counter.value) - 1
  }
}

function buy(){
  Swal.fire({
    text: "¿Do you want to add this to cart?",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonColor: "blue",
    cancelButtonColor: "red"
  }).then(result => {
    if (result.isConfirmed) {
      addItem()
    }
  })
}


//ADD TO CART
function addItem() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const idProduct = Number(window.location.search.split("=")[1])
  const product = data.find(item => item.id === idProduct)
  const existsIdCart = cart.some(item => item.product?.id === idProduct)

  if(existsIdCart){
    cart = cart.map(item => {
      if (item.product.id === idProduct) {
        return { ...item, quantity: item.quantity + Number(counter.value)}
      } else{
        return item
      }
    })
  }else {
    cart.push({ product: product, quantity: Number(counter.value) })
  }

  counter.value = "1"
  localStorage.setItem("cart", JSON.stringify(cart))

  let quantity = cart.reduce((acumulado, actual) => acumulado + actual.quantity, 0)
  localStorage.setItem("quantity", JSON.stringify(quantity))

  const quantityTag = document.querySelector("#quantity")
  if (quantityTag) {
    quantityTag.innerText = quantity;
  }
  
  Toastify({
    text: "You added product/s to cart",
    style: {
      background: "#000",
    },
    offset: {
      y: 95 
    },
  }).showToast();

  // Recargar página
  
}