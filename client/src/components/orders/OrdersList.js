import { Button, Container, Offcanvas, Table } from "reactstrap";
import { BsCaretRight } from "react-icons/bs"
import { useEffect, useState } from "react";
import { getUserOrders } from "../../managers/userProfileManager";
import OrderDetails from "./OrderDetails";
import { dateTimeConverter } from "../assets/exportFunctions"

export default function OrdersList ({ loggedInUser }) {
    const [myOrders, setMyOrders] = useState([]);
    const [offCanvas, setOffCanvas] = useState(false);
    const [orderWithDetails, setOrderWithDetails] = useState({})

    useEffect(() => {
        getUserOrders(loggedInUser.id).then(setMyOrders);
    }, [])

    const toggleOffCanvas = () => setOffCanvas(!offCanvas);

    const viewOrderDetails = (e, order) => {
        e.preventDefault();
        setOrderWithDetails(order);
        toggleOffCanvas();
    }

    if (myOrders.length === 0) {
        return "No order history to show."
    }
    return (
    <>
        <Container>
            <h1>Order History</h1>
            <Table hover>
                <tbody>
                    {myOrders.map(o => 
                    <tr key={o.id}>
                        <td>
                            Order # {o.id}<br />
                            Placed {dateTimeConverter(o.datePlaced)}<br />
                            Total: ${o.totalPrice}<br />
                            Status: {o.orderStatus}<br />
                        </td>
                        <td>
                            <br />
                            <Button onClick={(e) => viewOrderDetails(e, o)}>
                                View Details
                                <BsCaretRight />
                            </Button>
                        </td>
                    </tr>    
                )}    
                </tbody>
            </Table>
        </Container>
        <Offcanvas direction="end" isOpen={offCanvas} toggle={() => toggleOffCanvas()}>
            <OrderDetails order={orderWithDetails} toggleOffCanvas={toggleOffCanvas} />
        </Offcanvas>
    </>
    )
}