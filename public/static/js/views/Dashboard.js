import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }


    async getHtml() {
        return `
        <main class="main-container">
            <div class="main-title">
                <p class="font-weight-bold">Dashboard</p>
            </div>

            <div class="main-cards">

                <div class="card">
                    <div class="card-inner">
                        <p class="text-primary">Today</p>
                       
                    </div>
                    <span class="text-primary font-weight-bold" id="currentsales">...loading</span>
                </div>

                <div class="card">
                    <div class="card-inner">
                        <p class="text-primary">Last Week</p>
                        
                    </div>
                    <span class="text-primary font-weight-bold id="lastweeksales">...loading</span>
                </div>

                <div class="card">
                    <div class="card-inner">
                        <p class="text-primary">Last Month</p>
                        
                    </div>
                    <span class="text-primary font-weight-bold id="lastmonthsales">...loading</span>
                </div>

            </div>

                <div class="main-title">
                    <p class="font-weight-bold">Revenue(last Seven Days)</p>
                </div>
            <div class="charts">

                <div class="charts-card">
                    <p class="chart-title"></p>
                    <div id="chart"></div>
                </div>
            </div>

            <div class="main-title">
                    <p class="font-weight-bold">Bestsellers</p>
                </div>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </table>
        </main>
        

        `;
    }
}

