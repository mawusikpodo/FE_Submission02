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

                //console.log(objects)
                document.getElementById("currentsales").innerText = `$${objects.dashboard.sales_over_time_week[1].total}${' '}/${' '}${objects.dashboard.sales_over_time_week[1].orders}  orders`
                document.getElementById("lastweeksales").innerText = `$${objects.dashboard.sales_over_time_week[2].total}${' '} /${' '}${objects.dashboard.sales_over_time_week[2].orders}  orders`;
                document.getElementById("lastmonthsales").innerText = `$${objects.dashboard.sales_over_time_week[3].total}${' '}/${' '}${objects.dashboard.sales_over_time_week[3].orders} orders`;

                const bestsellers = objects.dashboard.bestsellers

                Object.keys(bestsellers).forEach(bestseller => {
                    const bestseller_markup = `<div class="bestseller">${bestsellers[bestseller].product.name}</div><br></br>`
                    document.querySelector("#bestseller").insertAdjacentHTML('beforeend', bestseller_markup)
                })
                const sales_over_time_week = objects.dashboard.sales_over_time_week
                const sales_over_time_year = objects.dashboard.sales_over_time_year

                const week_view = Object.keys(sales_over_time_week).map(week => sales_over_time_week[week].orders)
                const month_view = Object.keys(sales_over_time_year).map(year => sales_over_time_year[year].orders)
                const month_view_category = ["this month", "last month", "month 3", "month 4", "month 5", "month 6", "month 7", "month 8", "month 9", "month 10", "month 11", "month 12"]
                const week_view_category = ["today", "yesterday", "day 3", "day 4", "day 5", "day 6", "day 7"]



                var barChartOptions = {
                    series: [{
                        data: week_view
                    }],
                    chart: {
                        type: 'bar',
                        height: 350,
                        toolbar: {
                            show: false
                        },
                    },
                    colors: [
                        "#246dec",
                        "#cc3c43",
                        "#367952",
                        "#f5b74f",
                        "#4f35a1"
                    ],
                    plotOptions: {
                        bar: {
                            distributed: true,
                            borderRadius: 4,
                            horizontal: false,
                            columnWidth: '40%',
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: false
                    },
                    xaxis: {
                        categories: week_view_category
                    },
                    yaxis: {
                        title: {
                            text: "Orders"
                        }
                    }
                };

                initFirstChart()

                function initFirstChart() {
                    var barChartFirst = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
                    barChartFirst.render();
                }



                var secondBarChartOptions = {
                    series: [{
                        data: month_view
                    }],
                    chart: {
                        type: 'bar',
                        height: 350,
                        toolbar: {
                            show: false
                        },
                    },
                    colors: [
                        "#246dec",
                        "#cc3c43",
                        "#367952",
                        "#f5b74f",
                        "#4f35a1"
                    ],
                    plotOptions: {
                        bar: {
                            distributed: true,
                            borderRadius: 4,
                            horizontal: false,
                            columnWidth: '40%',
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: false
                    },
                    xaxis: {
                        categories: month_view_category
                    },
                    yaxis: {
                        title: {
                            text: "Orders"
                        }
                    }
                };


                function initSecondChart() {
                    var barChartSecond = new ApexCharts(document.querySelector("#bar-chart"), secondBarChartOptions);
                    barChartSecond.render();
                    barChartSecond
                }

                const checkbox = document.querySelector("input[name=checkbox]");

                checkbox.addEventListener("change", (e) => {
                    if (e.target.checked) {
                        console.log("Checkbox is checked..");
                        initSecondChart()
                        document.getElementById("revenue-title").innerText = 'Revenue(Last 7 days)'
                    } else {
                        console.log("Checkbox is not checked..");
                        initFirstChart()
                        document.getElementById("revenue-title").innerText = 'Revenue(Last 12 months)'
                    }
                });
            }
        }
    };
}

loadDashboard();


function logout() {
    localStorage.removeItem("jwt");
    window.location.href = './login.html'
}
