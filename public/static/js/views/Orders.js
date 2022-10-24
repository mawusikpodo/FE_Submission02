import AbstractView from "./AbstractView.js";

export default class Orders extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Orders");
    }

    async getHtml() {
        return `
            <h1>Orders</h1>
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
        `;
    }
}