let jwt = localStorage.getItem("jwt");
jwt = JSON.parse(jwt)
let access_token = jwt['access_token']
let refresh_token = jwt['refresh_token']
if (jwt == null) {
    window.location.href = './login.html'
}

function updateToken() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://freddy.codesubmit.io/refresh");
    xhttp.setRequestHeader("Authorization", "Bearer " + refresh_token);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = this.responseText;
            console.log(objects);
            if (objects) {
                localStorage.setItem("access_token", JSON.stringify(objects))
            } else {
                window.location.href = './login.html'
            }
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
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            const status = xhttp.status;
            if (status === 0 || (status >= 200 && status < 400)) {

                console.log(objects)
                document.getElementById("currentsales").innerHTML = `$${objects.dashboard.sales_over_time_week[1].total}${' '}/${' '}${objects.dashboard.sales_over_time_week[1].orders}  orders`
                document.getElementById("lastweeksales").innerHTML = `$${objects.dashboard.sales_over_time_week[2].total}${' '}/${' '}${objects.dashboard.sales_over_time_week[2].orders}  orders`
                document.getElementById("lastmonthsales").innerHTML = `$${objects.dashboard.sales_over_time_week[3].total}${' '}/${' '}${objects.dashboard.sales_over_time_week[3].orders} orders`;;

            }
        }
    };
}

loadDashboard();


function logout() {
    localStorage.removeItem("jwt");
    window.location.href = './login.html'
}


