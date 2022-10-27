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
                <th scope="col">Price</th>
                <th scope="col">#Units Sold</th>
                <th scope="col">Revenue</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td ></td>
                <td></td>
                </tr>
            </tbody>
            </table>
        </main>    
        `;
    }
}

