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
        
        <Container>
            <h1>Thank you for your order!</h1>
            <h3>You will receive an email to {loggedInUser.email} with your order confirmation.</h3>
            <h4>Order #{justPlacedOrder.id} - {justPlacedOrder.orderStatus}</h4> <br />
        </Container>
        <Container className="checkoutConfirmContainer">
        
            <div className="addressConfirmContainer">
                <h4>Shipped to:</h4>
                <div className="textReset">
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
            </div>

            <div className="cartConfirmContainer">
                <h2>Coming to you soon:</h2>
                <Table borderless>
                    <tbody style={{border: "5px #FDE6FE solid"}}>
                    {justPlacedOrder?.orderProducts.map(op =>
                        <tr key={op.id}>
                            <th style={{maxWidth: "180px"}}>
                                <img src={op.product.imageLocation} alt="coffee"
                                    style={{width: "85%"}} />
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
                            <th>
                                Total
                            </th>
                            <td>
                                <strong>${priceFormatter(justPlacedOrder.totalPrice)}</strong>
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Button onClick={(e) => handleNavigateHome(e)} className="button" style={{
                    backgroundColor: "#FAB375",
                    color: "#021E36",
                    fontWeight: 800,
                    border: "none",
                    borderRadius: "0px",
                    transition: "box-shadow 0.1s",
                    fontSize: "larger",
                    width: "100%"
                    }}>
                    Return home
                </Button>

            </div>
            
        </Container>
        
    </>
    )
}