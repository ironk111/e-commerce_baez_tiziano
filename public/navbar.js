let menu = [
    {text: "About", href: "/about"},
    {text: "FAQs", href: "/faqs"},
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
    ? `<li>Hola, ${localStorage.getItem("email")}</li><li onclick="logout()"><button class"btn btn-primary rounded-pill">Cerrar sesión</button></li>`
    : `<li><a href="login.html"><button class="btn btn-primary rounded-pill">Iniciar sesión</a></li>`}`

function logout() {
    localStorage.clear()
    location.href = "index.html"
}
