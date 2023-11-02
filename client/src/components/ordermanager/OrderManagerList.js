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
                <div className="inventoryListHeaderGroup">

                    <h1 className="inventoryListHeader">Manage Orders</h1>

                    <Form className="inventoryListSort">
                        <Row className="row-cols-lg-auto g-3 align-items-center">
                            <Col>
                                <Label for="sortSelect" style={{fontSize: "larger", paddingTop: "8px"}}>
                                    Sort by:
                                </Label>
                            </Col>
                            <Col>
                                <Input
                                    id="sortSelect"
                                    name="sortSelect"
                                    type="select"
                                    onChange={(e) => handleSort(e.target.value)}
                                    style={{fontSize: "larger"}}
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
                </div>

                <Table hover>
                    <tbody style={{border: "5px #FDE6FE solid"}}>
                        {orders.map(o => 
                        <tr key={o.id}>
                            <td className="textDetailsInList">
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
                <ModalHeader className="textReset">
                    Fulfill order #{orderIdToFulfill}?
                </ModalHeader>
                <ModalFooter className="textReset">
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setOrderIdToFulfill(null);
                        toggleFulfillModal();
                    }}
                        className="button" style={{
                            backgroundColor: "#FDE6FE",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}>
                        Go Back
                    </Button>
                    <Button onClick={(e) => {
                        handleFulfill(e);
                    }}
                        className="button" style={{
                            backgroundColor: "#FAB375",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}>
                        Fulfill
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={cancelModal} toggle={toggleCancelModal}>
                <ModalHeader className="textReset">
                    Cancel order #{orderIdToCancel}?
                </ModalHeader>
                <ModalFooter className="textReset">
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setOrderIdToCancel(null);
                        toggleCancelModal();
                    }}
                        className="button" style={{
                            backgroundColor: "#FDE6FE",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}>
                        Go Back
                    </Button>
                    <Button onClick={(e) => {
                        handleCancel(e);
                    }}
                        className="button" style={{
                            backgroundColor: "#FAB375",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}