import { OffcanvasBody, OffcanvasHeader, Table } from "reactstrap";

// breadcrumbs at top Order Histroy > Order # x
export default function OrderDetails ({ order, toggleOffCanvas }) {
    console.log(order);
    return (
    <>
        <OffcanvasHeader toggle={() => toggleOffCanvas()}>
            Order #{order.id}
        </OffcanvasHeader>
        <OffcanvasBody>
            <Table striped>
                <tbody>
                    <tr>
                        <th scope="row">
                            Order Date
                        </th>
                        <td>
                            {order.orderDate}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </OffcanvasBody>
    </>
    )
}