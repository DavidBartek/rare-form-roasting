import {useEffect, useState} from "react";
import { getAllProductsAdmin } from "../../managers/productManager";
import { Container, Col, Form, Input, Label, Row, Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { priceFormatter } from "../assets/exportFunctions";

export default function InventoryManagerList () {
    const [inventoryList, setInventoryList] = useState([]);
    const [sortByString, setSortByString] = useState("");
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

    const handleNavToProductView = (e, productId) => {
        e.preventDefault();
        navigate(`${productId}`);
    }

    return (
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
                                Select below
                            </option>
                            <option value={""}>
                                All
                            </option>
                            <option value={"live"}>
                                Viewable to customers
                            </option >
                        </Input>
                    </Col>
                </Row>
            </Form>
            <Table>
                <tbody>
                    {inventoryList.map(p =>
                        <tr key={p.id} onClick={(e) => handleNavToProductView(e, p.id)} >
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
                        </tr>
                    )}
                </tbody>
            </Table>
            
        </Container>
    )
}