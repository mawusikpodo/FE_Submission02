
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
                objects.orders.forEach(order => {
                    $("#body").append(`
                    <tr>
                    <td>${order.product.name}</td>
                    <td></td>
                    <td></td>
                    <td>${order.status}</td>
                    </tr>
                    `)
                })

                $('.tablemanager').tablemanager({
                    firstSort: [[3, 0], [2, 0], [1, 'asc']],
                    disable: ["last"],
                    appendFilterby: true,
                    debug: true,
                    vocabulary: {
                        voc_filter_by: 'Filter By',
                        voc_type_here_filter: 'Search...',
                        voc_show_rows: 'Rows Per Page'
                    },
                    pagination: true,
                    showrows: [15, 25, 50, 100],
                    disableFilterBy: [1]
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