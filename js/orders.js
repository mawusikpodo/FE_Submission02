
//http request
let jwt = localStorage.getItem("jwt");
if (jwt == null) {
    window.location.href = './login.html'
}

jwt = JSON.parse(jwt)
let access_token = jwt['access_token']
let refresh_token = jwt['refresh_token']

function updateToken() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://freddy.codesubmit.io/refresh");
    xhttp.setRequestHeader("Authorization", "Bearer " + refresh_token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            const token = Object.assign(jwt, objects);
            if (objects) {
                localStorage.setItem("jwt", JSON.stringify(token))
            } else {
                window.location.href = './login.html'
            }
        }
    };
    return false;
}

updateToken();

const orderDataTemplate = document.querySelector("[data-order-template]")
const orderDataContainer = document.querySelector("[data-order-section-container]")
const searchInput = document.querySelector("[data-search]")

let orders = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    console.log(orders)
    orders.forEach(order => {
        const isVisible =
            order.name.toLowerCase().includes(value) ||
            order.status.toLowerCase().includes(value)
        order.element.classList.toggle("hide", !isVisible)
    })
})


function loadOrders() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://freddy.codesubmit.io/orders?page=1&q=candy");
    xhttp.setRequestHeader("Authorization", "Bearer " + access_token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            const status = xhttp.status;
            if (status === 0 || (status >= 200 && status < 400)) {

                console.log(objects)
                orders = objects.orders.map(order => {

                    const section = orderDataTemplate.content.cloneNode(true).children[0]
                    const orderName = section.querySelector("[data-order-name]")
                    const orderStatus = section.querySelector("[data-status]")
                    orderName.textContent = order.product.name
                    orderStatus.textContent = order.status
                    orderDataContainer.append(section)
                    return { name: order.product.name, status: order.status, element: section }

                });

            }
        }
    };
}

loadOrders();

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = './login.html'
}
