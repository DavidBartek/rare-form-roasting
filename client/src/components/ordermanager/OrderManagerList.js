import { Button, Col, Container, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Offcanvas, Row, Table } from "reactstrap";
import { getAllOrders, markOrderCancelled, markOrderFulfilled } from "../../managers/orderManager";
import { useEffect, useState } from "react";
import { dateTimeConverter, priceFormatter } from "../assets/exportFunctions";
import OrderManagerDetailView from "./OrderManagerDetailView";
import OrderManagerButtons from "./OrderManagerButtons";

export default function OrderManagerList () {
    const [orders, setOrders] = useState([]);
    const [sortByString, setSortByString] = useState("");
    const [orderWithDetails, setOrderWithDetails] = useState({});
    const [orderIdToFulfill, setOrderIdToFulfill] = useState(null);
    const [orderIdToCancel, setOrderIdToCancel] = useState(null);
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

    const handleConfirmFulfill = (e, orderId) => {
        e.preventDefault();
        setOrderIdToFulfill(orderId);
        toggleFulfillModal();
    }

    const handleFulfill = (e) => {
        e.preventDefault();
        console.log(orderIdToFulfill);
        markOrderFulfilled(orderIdToFulfill)
            .then(() => toggleFulfillModal())
            .then(() => renderOrderList());
    }

    const toggleCancelModal = () => setCancelModal(!cancelModal);

    const handleConfirmCancel = (e, orderId) => {
        e.preventDefault();
        setOrderIdToCancel(orderId);
        toggleCancelModal();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        markOrderCancelled(orderIdToCancel)
            .then(() => toggleCancelModal())
            .then(() => renderOrderList());
    }

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
                            <OrderManagerButtons 
                                o={o} 
                                viewOrderDetails={viewOrderDetails}
                                handleConfirmFulfill={handleConfirmFulfill}
                                handleConfirmCancel={handleConfirmCancel}
                            />
                        </tr>    
                    )}    
                    </tbody>
                </Table>
            </Container>
            <Offcanvas direction="end" isOpen={offCanvas} toggle={() => toggleOffCanvas()}>
                <OrderManagerDetailView order={orderWithDetails} toggleOffCanvas={toggleOffCanvas} />
            </Offcanvas>
            <Modal isOpen={fulfillModal} toggle={toggleFulfillModal}>
                <ModalHeader>
                    Fulfill order #{orderIdToFulfill}?
                </ModalHeader>
                <ModalFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setOrderIdToFulfill(null);
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
            </Modal>
            <Modal isOpen={cancelModal} toggle={toggleCancelModal}>
                <ModalHeader>
                    Cancel order #{orderIdToCancel}?
                </ModalHeader>
                <ModalFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setOrderIdToCancel(null);
                        toggleCancelModal();
                    }}>
                        Go Back
                    </Button>
                    <Button onClick={(e) => {
                        handleCancel(e);
                    }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}