import { OffcanvasBody, OffcanvasHeader, Table } from "reactstrap";
import { dateTimeConverter, priceFormatter } from "../assets/exportFunctions";

export default function OrderManagerDetailView ({ order, toggleOffCanvas }) {
    return (
        <>
            <OffcanvasHeader toggle={() => toggleOffCanvas()} className="textReset">
                Order #{order.id}
            </OffcanvasHeader>
            <OffcanvasBody>
                <Table borderless>
                    <tbody>
                        <tr>
                            <th scope="row" className="textReset">
                                Order Date
                            </th>
                            <td className="textReset">
                                {dateTimeConverter(order.datePlaced)}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="textReset">
                                Status
                            </th>
                            <td className="textReset">
                                {order.orderStatus}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="textReset">
                                Customer
                            </th>
                            <td className="textReset">
                                {order.userProfile?.fullName}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="textReset">
                                Items
                            </th>
                            <td>
                            </td>
                        </tr>
                        {order.orderProducts.map(op =>
                        <tr key={op.id}>
                            <th style={{maxWidth: "180px"}}>
                                <img src={op.product.imageLocation} alt="coffee" style={{maxWidth: "95%"}}/>
                            </th>
                            <td className="textReset">
                                {op.product.displayName}<br />
                                Qty: {op.productQuantity}<br />
                                Size: {op.weight.weightOz} oz<br />
                                Grind: {op.grind.grindSetting}<br />
                                Subtotal: ${priceFormatter(op.subtotal)}<br />
                            </td>
                        </tr>
                        )}
                        <tr>
                            <th className="textReset">
                                Total
                            </th>
                            <td>
                                <strong className="textReset">${priceFormatter(order.totalPrice)}</strong>
                            </td>
                        </tr>
                        <tr>
                            <th className="textReset">
                                Ship to
                            </th>
                            <td className="textReset">
                                {order.userProfile.fullName}<br />
                                {order.shippingAddress.address1}<br />
                                {order.shippingAddress.address2 ? (
                                    <>{order.shippingAddress.address2} <br /></>
                                ) : "" }
                                {order.shippingAddress.city}, {order.shippingAddress.stateCode} {order.shippingAddress.zip}
                            </td>
                        </tr>
                        
                    </tbody>
                </Table>
            </OffcanvasBody>
        </>
    )
}