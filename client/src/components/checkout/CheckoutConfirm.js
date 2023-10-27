import { useEffect, useState } from "react";
import { getJustPlacedOrder } from "../../managers/orderManager";
import { Button, Container, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { priceFormatter } from "../assets/exportFunctions";

export default function CheckoutConfirm ({ loggedInUser, justPlacedOrder }) {
    // const [justPlacedOrder, setJustPlacedOrder] = useState({});
    const navigate = useNavigate();

    // useEffect(() => {
    //     getJustPlacedOrder(loggedInUser.id).then(setJustPlacedOrder);
    // });

    const handleNavigateHome = (e) => {
        e.preventDefault();
        navigate("/");
    }
    
    if (!justPlacedOrder) {
        return null;
    }
    return (
    <>
        <h2>Thank you for your order!</h2>
        <h4>You will receive an email to {loggedInUser.email} with your order confirmation.</h4><br />
        <Container>
            <h5>Order #{justPlacedOrder.id}</h5>
            <h6>{justPlacedOrder.orderStatus}</h6>
        </Container>
        <Container>
            <h6>Shipped to:</h6>
            <div>
                {justPlacedOrder.shippingAddress?.address1}<br />
                {justPlacedOrder.shippingAddress?.address2 ? (
                    <div>
                        {justPlacedOrder.shippingAddress?.address2}
                        <br />
                    </div>
                    ) : (
                    ""
                    )}
                {justPlacedOrder.shippingAddress?.city}, {justPlacedOrder.shippingAddress?.stateCode} {justPlacedOrder.shippingAddress?.zip}
            </div>
        </Container>
        <Container>
            <Table>
                <tbody>
                {justPlacedOrder?.orderProducts.map(op =>
                    <tr key={op.id}>
                        <th>
                            image
                        </th>
                        <td>
                            {op.product.displayName}<br />
                            <i>Qty: {op.productQuantity}</i><br />
                            <i>Size: {op.weight.weightOz} oz</i><br />
                            <i>Grind: {op.grind.grindSetting}</i><br />
                            Subtotal: ${priceFormatter(op.subtotal)}<br />
                        </td>
                    </tr>
                    )}
                    <tr>
                        <th>
                            Total
                        </th>
                        <td>
                            <strong>${priceFormatter(justPlacedOrder.totalPrice)}</strong>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
        <Button onClick={(e) => handleNavigateHome(e)}>
            Return home
        </Button>
        
    </>
    )
}