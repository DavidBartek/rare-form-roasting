import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getGrinds, getProductDetails, getWeights } from "../../managers/productManager";
import { Button, Card, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { priceCalculator, priceFormatter } from "../assets/exportFunctions";

export default function CoffeeDetails ({ loggedInUser }) {
    const params = useParams();
    const coffeeId = params.id;
    const [coffeeDetails, setCoffeeDetails] = useState({});
    const [grindSettings, setGrindSettings] = useState([]);
    const [weightSettings, setWeightSettings] = useState([]);
    const [selectedSize, setSelectedSize] = useState({});
    const [selectedGrind, setSelectedGrind] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState("");

    useEffect(() => {
        getProductDetails(coffeeId).then(setCoffeeDetails);
        getGrinds().then(setGrindSettings);
        getWeights().then(setWeightSettings);
    }, [])
    
    const calculatePrice = () => {
        if (coffeeDetails && selectedSize && selectedQuantity) {
            const price = priceCalculator(coffeeDetails, selectedSize, selectedQuantity)
            return price;
        } else {
            return `From $${priceFormatter(coffeeDetails.price)}`
        }
    }

    const addToCartHandler = (e) => {
        e.preventDefault();
        console.log("added to cart");
    }

    if (!coffeeDetails) {
        return "nothing to display here.";
    }
    return (
        <Container>
            <h1>
                <Link to="/coffees">Coffees</Link>
                {' > '} 
                {coffeeDetails.displayName}
            </h1>
            <Card
                style={{width: '23rem'}}
            >
                <img
                    alt="sample"
                    src="https://picsum.photos/1000"
                    width="100%"
                />
            </Card>
            <Form>
                <FormGroup>
                    <Label for="sizeSelect">
                        <h4>Size:</h4>
                    </Label>
                    <Input
                        id="sizeSelect"
                        name="sizeSelect"
                        type="select"
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        <option
                            value="">
                            Select size
                        </option>
                        {weightSettings.map(w =>
                        <option
                            key={w.id}
                            value={w}>
                            {w.weightOz} oz
                        </option>    
                        )}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="grindSelect">
                        <h4>Grind:</h4>
                    </Label>
                    <Input
                        id="grindSelect"
                        name="grindSelect"
                        type="select"
                        onChange={(e) => setSelectedGrind(e.target.value)}
                    >
                        <option
                            value="">
                            Select grind
                        </option>
                        {grindSettings.map(g =>
                        <option
                            key={g.id}
                            value={g}>
                            {g.grindSetting}
                        </option>    
                        )}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="quantitySelect">
                        <h4>Quantity:</h4>
                    </Label>
                    <Input
                        id="quantitySelect"
                        name="quantitySelect"
                        type="select"
                        placeholder="Select quantity"
                        onChange={(e) => setSelectedQuantity(e.target.value)}
                    >
                        <option value="">Select quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </Input>
                </FormGroup>
            </Form>
            
            {/* <h4>${priceFormatter(coffeeDetails.price)}</h4> */}
            <h4>{calculatePrice()}</h4>
            <Button onClick={(e) => addToCartHandler(e)}>
                Add To Cart
            </Button>
            <div>
                <strong>Origin: </strong>{coffeeDetails.locationString}, {coffeeDetails.country} - {coffeeDetails.farmString}<br />
                <strong>Tasting Notes: </strong>{coffeeDetails.tastingNotes}<br />
                <strong>Process: </strong>{coffeeDetails.process}<br />
                <strong>Elevation: </strong>{coffeeDetails.elevationRangeMASL} masl<br />
                <strong>Varietals: </strong>{coffeeDetails.varietal}<br />
                {coffeeDetails.descriptionString}
            </div>
            
        </Container>
        // back button navigating to coffees list
        // dropdowns to control weight, grind, quantity
        // updated calculated property
        // add to cart button - conditionally rendered based on logged in status
        // details

        
    )
}


// add condition for "out of stock" if isLive === false