import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getGrinds, getProductDetails, getWeightById, getWeights } from "../../managers/productManager";
import { Button, Card, Container, Form, FormGroup, Input, Label } from "reactstrap";
import CoffeeDetailsCalcPrice from "./CoffeeDetailsCalcPrice";
import CoffeeDetailsCartAdd from "./CoffeeDetailsCartAdd";

export default function CoffeeDetails ({ loggedInUser }) {
    const params = useParams();
    const coffeeId = params.id;
    const [coffeeDetails, setCoffeeDetails] = useState({});
    const [grindSettings, setGrindSettings] = useState([]);
    const [weightSettings, setWeightSettings] = useState([]);
    const [selectedWeightId, setselectedWeightId] = useState("");
    const [selectedWeightObj, setSelectedWeightObj] = useState({})
    const [selectedGrindId, setSelectedGrindId] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState("");

    useEffect(() => {
        getProductDetails(coffeeId).then(setCoffeeDetails);
        getGrinds().then(setGrindSettings);
        getWeights().then(setWeightSettings);
    }, [])

    useEffect(() => {
        getWeightById(selectedWeightId).then(setSelectedWeightObj)
    }, [selectedWeightId]);

    const handleWeightSelect = (e) => {
        setselectedWeightId(e.target.value);
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
                    <Label for="weightSelect">
                        <h4>Size:</h4>
                    </Label>
                    <Input
                        id="weightSelect"
                        name="weightSelect"
                        type="select"
                        onChange={(e) => handleWeightSelect(e)}
                    >
                        <option
                            value="">
                            Select size
                        </option>
                        {weightSettings.map(w =>
                        <option
                            key={w.id}
                            value={w.id}>
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
                        onChange={(e) => setSelectedGrindId(e.target.value)}
                    >
                        <option
                            value="">
                            Select grind
                        </option>
                        {grindSettings.map(g =>
                        <option
                            key={g.id}
                            value={g.id}>
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

            <CoffeeDetailsCalcPrice 
                coffeeDetails={coffeeDetails}
                selectedWeightId={selectedWeightId}
                selectedWeightObj={selectedWeightObj} 
                selectedQuantity={selectedQuantity} />

            <CoffeeDetailsCartAdd 
                loggedInUser={loggedInUser}
                coffeeDetails={coffeeDetails}
                selectedWeightId={selectedWeightId}
                selectedGrindId={selectedGrindId}
                selectedQuantity={selectedQuantity} />

            <div>
                <strong>Origin: </strong>{coffeeDetails.locationString}, {coffeeDetails.country} - {coffeeDetails.farmString}<br />
                <strong>Tasting Notes: </strong>{coffeeDetails.tastingNotes}<br />
                <strong>Process: </strong>{coffeeDetails.process}<br />
                <strong>Elevation: </strong>{coffeeDetails.elevationRangeMASL} masl<br />
                <strong>Varietals: </strong>{coffeeDetails.varietal}<br />
                {coffeeDetails.descriptionString}
            </div>
            
        </Container>

        
    )
}