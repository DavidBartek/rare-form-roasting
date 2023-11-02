import { Button, Container, Offcanvas, Table } from "reactstrap";
import { BsCaretRight } from "react-icons/bs"
import { useEffect, useState } from "react";
import { getUserOrders } from "../../managers/orderManager";
import { dateTimeConverter, priceFormatter } from "../assets/exportFunctions"
import UserOrderDetails from "./UserOrderDetails";

export default function UserOrdersList ({ loggedInUser }) {
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
                <tbody style={{border: "5px #FDE6FE solid"}}>
                    {myOrders.map(o => 
                    <tr key={o.id}>
                        <td className="textDetailsInList">
                            Order # {o.id}<br />
                            Placed {dateTimeConverter(o.datePlaced)}<br />
                            Total: ${priceFormatter(o.totalPrice)}<br />
                            Status: {o.orderStatus}<br />
                        </td>
                        <td>
                            <br />
                            <Button onClick={(e) => viewOrderDetails(e, o)} className="button" style={{
                                backgroundColor: "#75BCFA",
                                color: "#021E36",
                                fontWeight: 800,
                                border: "none",
                                borderRadius: "0px",
                                transition: "box-shadow 0.1s",
                                fontSize: "larger"
                                }}>
                                View Details
                                <BsCaretRight className="textReset" style={{marginBottom: "2px"}}/>
                            </Button >
                        </td>
                    </tr>    
                )}    
                </tbody>
            </Table>
        </Container>
        
        <Offcanvas direction="end" isOpen={offCanvas} toggle={() => toggleOffCanvas()}>
            <UserOrderDetails order={orderWithDetails} toggleOffCanvas={toggleOffCanvas} />
        </Offcanvas>
    </>
    )
}