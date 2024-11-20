let menu = [
    /*{text: "About", href: "/about"},
    {text: "FAQs", href: "/faqs"},*/
    {text: "Sport", href: "#", id: "sport", clase: "category-button"},
    {text: "Super", href: "#", id: "super", clase: "category-button"},
    {text: "Hyper", href: "#", id: "hyper", clase: "category-button"},
]

let html = [];

//botones nav
for (let item of menu) {
    

    html.push(
        `<li class="nav-item">
            <a class="nav-link ${item.clase}" href="${item.href}" id="${item.id}">${item.text}</a>
        </li>
        `);
}

document.querySelector("header nav div div ul").innerHTML = html.join("");


//------LOGIN
const navRight = document.querySelector("#navRight")
navRight.innerHTML = `${localStorage.getItem("email")
    ? `<li class="me-3">Hola, ${localStorage.getItem("email")}</li><li class="me-3" onclick="logOut()"><a href="/public/index.html" class="btn btn-primary rounded-pill">Log Out</a></li><li ><a href="/public/cart.html"><img height="35" src="/public/img/cart.png"><b id="quantity">${localStorage.getItem("quantity")}</b></a></li>`
    : `<li><a href="/public/login.html" class="btn btn-primary rounded-pill">Log In</a></li>`}`

function logOut() {
    localStorage.clear()
    location.href = "index.html"
}
