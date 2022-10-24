let jwt = localStorage.getItem("jwt");
jwt = JSON.parse(jwt);
let access_token = jwt["access_token"];
let refresh_token = jwt["refresh_token"];
if (jwt == null) window.location.href = "./login.html";
const token = access_token;
function updateToken() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://freddy.codesubmit.io/refresh");
    xhttp.setRequestHeader("Authorization", "Bearer " + refresh_token);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            const token = Object.assign(jwt, objects);
            console.log(token);
            if (objects) localStorage.setItem("jwt", JSON.stringify(token));
            else window.location.href = "./login.html";
        }
    };
    return false;
}
updateToken();
function loadDashboard() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://freddy.codesubmit.io/dashboard");
    xhttp.setRequestHeader("Authorization", "Bearer " + access_token);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            const status = xhttp.status;
            if (status === 0 || status >= 200 && status < 400) {
                console.log(objects);
                // const currentsales = document.getElementById("currentsales")
                const current_sales = objects.dashboard.sales_over_time_week[1].total;
                console.log(current_sales);
                const last_week_sales = objects.dashboard.sales_over_time_week[2].total;
                console.log(last_week_sales);
                const last_week_orders = objects.dashboard.sales_over_time_week[2].orders;
                console.log(last_week_orders);
                document.getElementById("currentsales").innerHTML = `$${objects.dashboard.sales_over_time_week[1].total}${" "}/${" "}${objects.dashboard.sales_over_time_week[1].orders}  orders`;
                document.querySelector("lastweeksales").innerHTML = `$${objects.dashboard.sales_over_time_week[2].total}${" "} /${" "}${objects.dashboard.sales_over_time_week[2].orders}  orders`;
                document.querySelector("lastmonthsales").innerHTML = `$${objects.dashboard.sales_over_time_week[3].total}${" "}/${" "}${objects.dashboard.sales_over_time_week[3].orders} orders`;
            }
        }
    };
}
loadDashboard();
function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "./login.html";
}

//# sourceMappingURL=index.de158e3a.js.map
