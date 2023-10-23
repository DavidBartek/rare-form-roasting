import { OffcanvasBody, OffcanvasHeader, Table } from "reactstrap";
import { dateTimeConverter, priceFormatter } from "../assets/exportFunctions";
import { Link } from "react-router-dom";

// breadcrumbs at top Order Histroy > Order # x
export default function OrderDetails ({ order, toggleOffCanvas }) {
    
    const linkGenerator = (idString) => {
        return `/coffees/${idString}`
    }

    return (
    <>
        <OffcanvasHeader toggle={() => toggleOffCanvas()}>
            Order #{order.id}
        </OffcanvasHeader>
        <OffcanvasBody>
            <Table borderless>
                <tbody>
                    <tr>
                        <th scope="row">
                            Order Date
                        </th>
                        <td>
                            {dateTimeConverter(order.datePlaced)}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            Status
                        </th>
                        <td>
                            {order.orderStatus}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            Items
                        </th>
                        <td>
                        </td>
                    </tr>
                    {order.orderProducts.map(op =>
                    <tr key={op.id}>
                        <th>
                        </th>
                        <td>
                            {op.product.displayName}<br />
                            <i>Qty: {op.productQuantity}</i><br />
                            <i>Size: {op.weight.weightOz} oz</i><br />
                            <i>Grind: {op.grind.grindSetting}</i><br />
                            Subtotal: ${priceFormatter(op.subtotal)}<br />
                            <Link to={linkGenerator(op.product.id)}>Buy again</Link>
                        </td>
                    </tr>
                    )}
                    <tr>
                        <th>
                            Total
                        </th>
                        <td>
                            <strong>${priceFormatter(order.totalPrice)}</strong>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Shipping
                        </th>
                        <td>
                            {order.userProfile.fullName}<br />
                            {order.shippingAddress.address1}<br />
                            {order.shippingAddress.address2 ? (
                                <>order.shippingAddress.address2 <br /></>
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