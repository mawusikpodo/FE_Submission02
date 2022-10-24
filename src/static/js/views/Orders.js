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
                <td colspan="2"></td>
                <td></td>
                </tr>
            </tbody>
        </table>
        `;
    }
}