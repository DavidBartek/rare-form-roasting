import { Button, Col, Container, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Offcanvas, Row, Table } from "reactstrap";
import { BsCaretRight } from "react-icons/bs";
import { getAllOrders } from "../../managers/orderManager";
import { useEffect, useState } from "react";
import { dateTimeConverter, priceFormatter } from "../assets/exportFunctions";
import OrderManagerDetailView from "./OrderManagerDetailView";

export default function OrderManagerList () {
    const [orders, setOrders] = useState([]);
    const [sortByString, setSortByString] = useState("");
    const [orderWithDetails, setOrderWithDetails] = useState({});
    const [orderToFulfill, setOrderToFulfill] = useState({});
    const [orderToCancel, setOrderToCancel] = useState({});
    const [offCanvas, setOffCanvas] = useState(false);
    const [fulfillModal, setFulfillModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    

    const renderOrderList = () => {
        getAllOrders(sortByString).then(setOrders);
    }

    useEffect(() => {
        renderOrderList();
    }, [sortByString]);

    const handleSort = (selection) => {
        setSortByString(selection);
    }

    const toggleOffCanvas = () => setOffCanvas(!offCanvas);

    const viewOrderDetails = (e, order) => {
        e.preventDefault();
        setOrderWithDetails(order);
        toggleOffCanvas();
    }

    const toggleFulfillModal = () => setFulfillModal(!fulfillModal);

    const handleConfirmFulfill = (e, order) => {
        e.preventDefault();
        setOrderToFulfill(order);
        console.log(order); // this reads
        console.log(orderToFulfill); // this doesn't...some issue here
        toggleFulfillModal();
    }

    const handleFulfill = (e) => {
        e.preventDefault();
    }

    const toggleCancelModal = () => setCancelModal(!cancelModal);

    const handleConfirmCancel = (e, order) => {
        e.preventDefault();
        setOrderToCancel(order);
        toggleCancelModal();
    }

    // cancel function

    if (orders.length === 0) {
        return "Loading..."
    }
    
    return (
        <>
            <Container>
                <h1>Manage Orders</h1>
                <Form>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                            <Label for="sortSelect">
                                Sort by:
                            </Label>
                        </Col>
                        <Col>
                            <Input
                                id="sortSelect"
                                name="sortSelect"
                                type="select"
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value={""}>
                                    Select below
                                </option>
                                <option value={"allnewtoold"}>
                                    All (new to old)
                                </option >
                                <option value={"alloldtonew"}>
                                    All (old to new)
                                </option>
                                <option value={"unfulfilled"}>
                                    Unfulfilled
                                </option>
                                <option value={"fulfilled"}>
                                    Fulfilled
                                </option>
                                <option value={"cancelled"}>
                                    Cancelled
                                </option>
                            </Input>
                        </Col>
                    </Row>
                </Form>
                <Table hover>
                    <tbody>
                        {orders.map(o => 
                        <tr key={o.id}>
                            <td>
                                Order # {o.id}<br />
                                Placed {dateTimeConverter(o.datePlaced)}<br />
                                Status: {o.orderStatus}<br />
                                Total: ${priceFormatter(o.totalPrice)}<br />
                            </td>
                            <td>
                                <br />
                                <Button onClick={(e) => viewOrderDetails(e, o)}>
                                    View Details
                                    <BsCaretRight />
                                </Button>
                            </td>
                            <td>
                                <br />
                                <Button onClick={(e) => handleConfirmFulfill(e, o)}>
                                    Mark Fulfilled
                                </Button>
                            </td>
                            <td>
                                <br />
                                <Button onClick={(e) => handleConfirmCancel(e, o)}>
                                    Cancel Order
                                </Button>
                            </td>
                        </tr>    
                    )}    
                    </tbody>
                </Table>
            </Container>
            <Offcanvas direction="end" isOpen={offCanvas} toggle={() => toggleOffCanvas()}>
                <OrderManagerDetailView order={orderWithDetails} toggleOffCanvas={toggleOffCanvas} />
            </Offcanvas>
            {/* <Modal isOpen={fulfillModal} toggle={toggleFulfillModal}>
                <ModalHeader>
                    Fulfill this order?
                </ModalHeader>
                <ModalBody>
                    Order # {orderToFulfill.id}<br />
                    {orderToFulfill.orderProducts.map(op => 
                        op.product.displayName)}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setOrderToFulfill({});
                        toggleFulfillModal();
                    }}>
                        Go Back
                    </Button>
                    <Button onClick={(e) => {
                        handleFulfill(e);
                    }}>
                        Fulfill
                    </Button>
                </ModalFooter>
            </Modal> */}
        </>
    )
}