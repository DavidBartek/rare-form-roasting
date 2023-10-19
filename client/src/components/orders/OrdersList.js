import { Button, Container, Table } from "reactstrap";
import { BsCaretRight } from "react-icons/bs"
import { useEffect, useState } from "react";
import { getUserOrders } from "../../managers/userProfileManager";
import OrderDetails from "./OrderDetails";

export default function OrdersList ({ loggedInUser }) {
    const [myOrders, setMyOrders] = useState([]);
    const [orderDetailView, setOrderDetailView] = useState(false);
    const [orderWithDetails, setOrderWithDetails] = useState({})

    useEffect(() => {
        getUserOrders(loggedInUser.id).then(setMyOrders);
    }, [])

    const dateTimeConverter = (dateTimeString) => {
        const array = dateTimeString.split("T");
        const unformattedDateOnly = new Date(array[0]);
        
        const month = String(unformattedDateOnly.getMonth() + 1).padStart(2, "0");
        const day = String(unformattedDateOnly.getDate()).padStart(2, "0");
        const year = unformattedDateOnly.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;

        return formattedDate;
    }

    const navToOrderDetails = (e, order) => {
        e.preventDefault();
        setOrderWithDetails(order);
        setOrderDetailView(true);
    }

    if (myOrders.length === 0) {
        return "No order history to show."
    }
    return (
    <>
    {orderDetailView ? (
        <OrderDetails orderWithDetails={orderWithDetails} setOrderDetailView={setOrderDetailView}  />
    ) : (
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
                            <Button onClick={(e) => navToOrderDetails(e, o)}>
                                View Details
                                <BsCaretRight />
                            </Button>
                        </td>
                    </tr>    
                )}    
                </tbody>
            </Table>
        </Container>
    )
    }
    </>
    
    
    )
}