import {useEffect, useState} from "react";
import { addProductToShopAdmin, getAllProductsAdmin, removeProductAdmin } from "../../managers/productManager";
import { Container, Col, Form, Input, Label, Row, Table, Button, ModalHeader, Modal, ModalFooter, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { priceFormatter } from "../assets/exportFunctions";

export default function InventoryManagerList () {
    const [inventoryList, setInventoryList] = useState([]);
    const [sortByString, setSortByString] = useState("");
    const [productToRemove, setProductToRemove] = useState({});
    const [productToRestore, setProductToRestore] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const [restoreModal, setRestoreModal] = useState(false);
    const navigate = useNavigate();

    const renderInventoryList = () => {
        getAllProductsAdmin(sortByString).then(setInventoryList);
    };

    useEffect(() => {
        renderInventoryList();
    }, [sortByString]);

    const handleNavCreateCoffee = (e) => {
        e.preventDefault(e);
        navigate("create");
    }

    const handleSort = (selection) => {
        setSortByString(selection);
    }

    const handleUpdateCoffee = (e, productId) => {
        e.preventDefault();
        navigate(`modify/${productId}`);
    }

    const toggleDeleteModal = () => setDeleteModal(!deleteModal);

    const handleConfirmDelete = (e, productObj) => {
        e.preventDefault();
        setProductToRemove(productObj);
        toggleDeleteModal();
    }

    const handleDelete = (e) => {
        e.preventDefault();
        removeProductAdmin(productToRemove.id)
        .then(() => toggleDeleteModal())
        .then(() => renderInventoryList());
    }

    const toggleRestoreModal = () => setRestoreModal(!restoreModal);

    const handleConfirmAdd = (e, productObj) => {
        e.preventDefault();
        setProductToRestore(productObj);
        toggleRestoreModal();
    }

    const handleAddToShop = (e) => {
        e.preventDefault();
        addProductToShopAdmin(productToRestore.id)
        .then(() => toggleRestoreModal())
        .then(() => renderInventoryList());
    }

    return (
        <>
            <Container>
                <div className="inventoryListHeaderGroup">
                
                    <h1 className="inventoryListHeader">manage coffees</h1>
                    
                    <Form className="inventoryListSort">
                        <Row className="row-cols-lg-auto g-3 align-items-center">
                            <Col className="sortLabel">
                                <Label for="sortSelect" style={{fontSize: "larger"}}>
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
                                        All
                                    </option>
                                    <option value={"live"}>
                                        Live in shop
                                    </option>
                                    <option value={"notlive"}>
                                        Not live
                                    </option>
                                </Input>
                            </Col>
                        </Row>
                    </Form>

                </div>

                <Button onClick={(e) => handleNavCreateCoffee(e)} className="button" style={{
                    backgroundColor: "#FAB375",
                    color: "#021E36",
                    fontWeight: 800,
                    border: "none",
                    borderRadius: "0px",
                    transition: "box-shadow 0.1s",
                    marginBottom: "25px"
                    }} >
                    Add new coffee
                </Button>

                <Table hover>
                    <tbody style={{border: "5px #FDE6FE solid"}}>
                        {inventoryList.map(p =>
                            <tr key={p.id} >
                                <th>
                                    <img src={p.imageLocation} alt="coffee" className="coffeeImageInList"/>
                                </th>
                                <td className="textDetailsInList">
                                    {p.displayName}<br />
                                    Country: {p.country}<br />
                                    Process: {p.process}<br />
                                    Location: {p.locationString}, {p.farmString}<br />
                                    Unit price: ${priceFormatter(p.price)}
                                </td>
                                <td >
                                    <br />
                                    <Button onClick={(e) => handleUpdateCoffee(e, p.id)} className="button" style={{
                                        backgroundColor: "#75BCFA",
                                        color: "#021E36",
                                        fontWeight: 800,
                                        border: "none",
                                        borderRadius: "0px",
                                        transition: "box-shadow 0.1s"
                                        }} >
                                        Update Details
                                    </Button>
                                    <br />
                                    <br />
                                    <br />
                                    {p.isLive ? (
                                        <Button onClick={(e) => handleConfirmDelete(e, p)} className="button" style={{
                                            backgroundColor: "#021E36",
                                            color: "#FEF5ED",
                                            fontWeight: 800,
                                            border: "none",
                                            borderRadius: "0px",
                                            transition: "box-shadow 0.1s"
                                            }}>
                                            Remove from Shop
                                        </Button>
                                ) : (
                                        <Button onClick={(e) => handleConfirmAdd(e, p)} className="button" style={{
                                            backgroundColor: "#FAB375",
                                            color: "#FEF5ED",
                                            fontWeight: 800,
                                            border: "none",
                                            borderRadius: "0px",
                                            transition: "box-shadow 0.1s"
                                            }}>
                                            Add to Shop
                                        </Button>
                                )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
            <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
                <ModalHeader>
                    Remove from shop?
                </ModalHeader>
                <ModalBody>
                    Customers will no longer be able to view {productToRemove.displayName}.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setProductToRemove({});
                        toggleDeleteModal();
                    }}>
                        No
                    </Button>
                    <Button onClick={(e) => {
                        handleDelete(e);
                    }}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={restoreModal} toggle={toggleRestoreModal}>
                <ModalHeader>
                    Add to shop?
                </ModalHeader>
                <ModalBody>
                    Customers will be able to view {productToRestore.displayName}.
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setProductToRestore({});
                        toggleRestoreModal();
                    }}>
                        No
                    </Button>
                    <Button onClick={(e) => {
                        handleAddToShop(e);
                    }}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}