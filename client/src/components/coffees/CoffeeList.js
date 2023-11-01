import { useEffect, useState } from "react";
import { getAllLiveProducts } from "../../managers/productManager";
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { priceFormatter } from "../assets/exportFunctions";
import { useNavigate } from "react-router-dom"

export default function CoffeeList () {
    const [products, setProducts] = useState([]);
    const [sortByString, setSortByString] = useState("");
    const navigate = useNavigate();

    const renderProductList = () => {
        getAllLiveProducts(sortByString).then(setProducts);
    }

    useEffect(() => {
        renderProductList();
    }, [sortByString]);
    
    const handleSort = (selection) => {
        setSortByString(selection);
    }

    const navToCoffeeDetail = (e, productId) => {
        e.preventDefault();
        navigate(`${productId}`);
    }

    if (products.length === 0) {
        return null;
    }
    return (
        <Container>
            <div className="coffeeListHeaderGroup">
                <h1 className="coffeeListHeader">Single Origin Coffees</h1>
                <Form className="coffeeListSort">
                    <FormGroup>
                        <Row className="row-cols-lg-auto g-3 align-items-center">
                            <Col className="sortLabel">
                                <Label for="sortSelect">
                                    Sort by:
                                </Label>
                            </Col>
                            <Col className="sortDropdown">
                                <Input
                                    id="sortSelect"
                                    name="sortSelect"
                                    type="select"
                                    onChange={(e) => handleSort(e.target.value)}
                                >
                                    <option value={""}>
                                        Select below
                                    </option>
                                    <option value={"featured"}>
                                        Featured
                                    </option >
                                    <option value={"alphabeticalaz"}>
                                        Alphabetically, A-Z
                                    </option>
                                    <option value={"alphabeticalza"}>
                                        Alphabetically, Z-A
                                    </option>
                                    <option value={"pricelowhigh"}>
                                        Price, $-$$$
                                    </option>
                                    <option value={"pricehighlow"}>
                                        Price, $$$-$
                                    </option>
                                </Input>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </div>
            <div className="coffeeCards">
                {products.map(p =>
                    <Card 
                        key={p.id}
                        style={{
                            border: "none",
                            backgroundColor: "#FEF5ED"}}
                        onClick={(e) => navToCoffeeDetail(e, p.id)}
                    >
                        <img
                            alt="sample"
                            src={p.imageLocation}
                            className="cardImage"
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">
                                {p.displayName}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6">
                                From ${priceFormatter(p.price)}
                            </CardSubtitle>
                            <CardText>
                                {p.tastingNotes}
                            </CardText>
                        </CardBody>
                    </Card>
                )}
            </div>
        </Container>
    )
}

// styling guide:
// https://reactstrap.github.io/?path=/docs/components-card--card

// refactor:

// Only display image
// on hover: image fades hard, text displays display name + "From" price 