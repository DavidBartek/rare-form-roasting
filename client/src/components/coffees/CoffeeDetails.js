import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getGrinds, getProductDetails, getWeightById, getWeights } from "../../managers/productManager";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";
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
            <h1 style={{display: "inline"}}>
                    <Link style={{textDecoration: "none"}} to="/coffees">
                        <h1 style={{
                            color: "#021E36",
                            display: "inline"}}>Coffees</h1>
                    </Link>
                {' > '} 
                {coffeeDetails.displayName}
            </h1>
            
            <div className="coffeeDetailsContainer">

                <div className="image-container">
                    <img
                        alt="sample"
                        src={coffeeDetails.imageLocation}
                        className="coffeeDetailImage"
                    />
                </div>
                
                <div className="coffeeDetailsSelectionsContainer">

                    <Form className="coffeeDetailsForm" >
                        <FormGroup>
                            <Label for="weightSelect">
                                <h4>Size:</h4>
                            </Label>
                            <Input
                                id="weightSelect"
                                name="weightSelect"
                                type="select"
                                onChange={(e) => handleWeightSelect(e)}
                                style={{
                                    borderRadius: 0,
                                    border: "1px solid #021E36" 
                                }}
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
                                style={{
                                    borderRadius: 0,
                                    border: "1px solid #021E36" 
                                }}
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
                                style={{
                                    borderRadius: 0,
                                    border: "1px solid #021E36" 
                                }}
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

                </div>

            </div>

            <div className="coffeeDetailsInfo">
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