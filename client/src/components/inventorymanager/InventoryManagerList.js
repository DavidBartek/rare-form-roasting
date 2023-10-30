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
                <h1>Manage Coffees</h1>
                <Button onClick={(e) => handleNavCreateCoffee(e)}>
                    Add new coffee
                </Button>
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
                <Table>
                    <tbody>
                        {inventoryList.map(p =>
                            <tr key={p.id}>
                                <th>
                                    image
                                </th>
                                <td>
                                    {p.displayName}<br />
                                    Country: {p.country}<br />
                                    Process: {p.process}<br />
                                    Location: {p.locationString}, {p.farmString}<br />
                                    Unit price: ${priceFormatter(p.price)}
                                </td>
                                <td>
                                    <Button onClick={(e) => handleUpdateCoffee(e, p.id)}>
                                        Update Details
                                    </Button>
                                </td>
                                {p.isLive ? (
                                    <td>
                                        <Button onClick={(e) => handleConfirmDelete(e, p)}>
                                            Remove from Shop
                                        </Button>
                                    </td>
                                ) : (
                                    <td>
                                        <Button onClick={(e) => handleConfirmAdd(e, p)}>
                                            Add to Shop
                                        </Button>
                                    </td>
                                )}
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