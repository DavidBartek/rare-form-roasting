import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getProductDetails, modifyProductAdmin } from "../../managers/productManager";
import { useEffect, useState } from "react";

export default function ModifyCoffee () {
    const params = useParams();
    const coffeeId = params.id;
    const [product, setProduct] = useState({});
    const [displayName, setDisplayName] = useState("");
    const [price, setPrice] = useState("");
    const [country, setCountry] = useState("");
    const [locationString, setLocationString] = useState("");
    const [farmString, setFarmString] = useState("");
    const [process, setProcess] = useState("");
    const [varietal, setVarietal] = useState("");
    const [elevationRangeMASL, setElevationRangeMASL] = useState("");
    const [tastingNotes, setTastingNotes] = useState("");
    const [descriptionString, setDescriptionString] = useState("");
    const [imageLocation, setImageLocation] = useState(""); // may no longer be needed after cloudinary
    const [isFeatured, setIsFeatured] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails(coffeeId).then((product) => {
            setProduct(product);
            setIsFeatured(product.isFeatured)
        });
    }, [coffeeId]);

    const handleUploadImage = (e) => {
        e.preventDefault();
        console.log("cloudinary upload to be implemented");
        setImageLocation("https://media.istockphoto.com/id/1334162584/photo/african-employers-are-working-with-coffee-beans-production-at-washing-center.jpg?s=1024x1024&w=is&k=20&c=WEhilsjZwfOg19u4ei6G4jAWRdxbGJTgAAf--LyV9ks=")
    }

    const triggerConfirmModal = () => setConfirmModal(!confirmModal);

    const handleEditConfirm = (e) => {
        e.preventDefault(e);

        // error handling for any empty strings left by user
        if (displayName === "") {
            setDisplayName(product.displayName);
        }
        if (price === "") {
            setPrice(product.price);
        }
        if (country === "") {
            setCountry(product.country);
        }
        if (locationString === "") {
            setLocationString(product.locationString);
        }
        if (farmString === "") {
            setFarmString(product.farmString);
        }
        if (process === "") {
            setProcess(product.process);
        }
        if (varietal === "") {
            setVarietal(product.varietal);
        }
        if (elevationRangeMASL === "") {
            setElevationRangeMASL(product.elevationRangeMASL);
        }
        if (tastingNotes === "") {
            setTastingNotes(product.tastingNotes);
        }
        if (descriptionString === "") {
            setDescriptionString(product.descriptionString);
        }
        if (imageLocation === "") {
            setImageLocation(product.imageLocation);
        }

        triggerConfirmModal();
    }
    
    const handleEditCoffee = (e) => {
        e.preventDefault();

        const updatedCoffeeObj = {
            id: product.id,
            displayName: displayName,
            price: price,
            country: country,
            locationString: locationString,
            farmString: farmString,
            process: process,
            varietal: varietal,
            elevationRangeMASL: elevationRangeMASL,
            tastingNotes: tastingNotes,
            descriptionString: descriptionString,
            imageLocation: imageLocation,
            isFeatured: isFeatured
        }

        modifyProductAdmin(updatedCoffeeObj)
            .then(() => setConfirmModal(false))
            .then(() => navigate("/inventorymanager"));
    }

    
    if (!product) {
        return "Please refresh page"
    }
    return (
        <>
            <Container>
                <h1>Modify details: {product.displayName}</h1>
                <Link to="/inventorymanager" style={{fontSize: "larger"}}>
                    Back to Inventory Manager
                </Link>
                <Form>
                    <FormGroup>
                        <Label for="displayName" style={{fontSize: "larger"}}>
                            Display Name
                        </Label>
                        <Input
                            id="displayName"
                            name="displayName"
                            type="text"
                            value={displayName ?? ""}
                            placeholder={product.displayName}
                            onChange={(e) => {
                                setDisplayName(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price" style={{fontSize: "larger"}}>
                            Price
                        </Label>
                        <Input
                            id="price"
                            name="price"
                            type="text"
                            value={price ?? ""}
                            placeholder={product.price}
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="country" style={{fontSize: "larger"}}>
                            Country
                        </Label>
                        <Input
                            id="country"
                            name="country"
                            type="text"
                            value={country ?? ""}
                            placeholder={product.country}
                            onChange={(e) => {
                                setCountry(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="locationString" style={{fontSize: "larger"}}>
                            Location/Region
                        </Label>
                        <Input
                            id="locationString"
                            name="locationString"
                            type="text"
                            value={locationString ?? ""}
                            placeholder={product.locationString}
                            onChange={(e) => {
                                setLocationString(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="farmString" style={{fontSize: "larger"}}>
                            Farm
                        </Label>
                        <Input
                            id="farmString"
                            name="farmString"
                            type="text"
                            value={farmString ?? ""}
                            placeholder={product.farmString}
                            onChange={(e) => {
                                setFarmString(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="process" style={{fontSize: "larger"}}>
                            Processing Method
                        </Label>
                        <Input
                            id="process"
                            name="process"
                            type="select"
                            value={product.process}
                            onChange={(e) => {
                                setProcess(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        >
                            <option value={""}>
                                Select below
                            </option>
                            <option value={"Dry Process (Natural)"}>
                                Dry Process (Natural)
                            </option>
                            <option value={"Wet Process (Washed)"}>
                                Wet Process (Washed)
                            </option>
                            <option value={"Honey Process"}>
                                Honey Process
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="varietal" style={{fontSize: "larger"}}>
                            Varietal
                        </Label>
                        <Input
                            id="varietal"
                            name="varietal"
                            type="text"
                            value={varietal ?? ""}
                            placeholder={product.varietal}
                            onChange={(e) => {
                                setVarietal(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="elevationRangeMASL" style={{fontSize: "larger"}}>
                            Elevation in MASL
                        </Label>
                        <Input
                            id="elevationRangeMASL"
                            name="elevationRangeMASL"
                            type="text"
                            value={elevationRangeMASL ?? ""}
                            placeholder={product.elevationRangeMASL}
                            onChange={(e) => {
                                setElevationRangeMASL(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="tastingNotes" style={{fontSize: "larger"}}>
                            Tasting Notes
                        </Label>
                        <Input
                            id="tastingNotes"
                            name="tastingNotes"
                            type="text"
                            value={tastingNotes ?? ""}
                            placeholder={product.tastingNotes}
                            onChange={(e) => {
                                setTastingNotes(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descriptionString" style={{fontSize: "larger"}}>
                            Description
                        </Label>
                        <Input
                            id="descriptionString"
                            name="descriptionString"
                            type="textarea"
                            value={descriptionString ?? ""}
                            placeholder={product.descriptionString}
                            onChange={(e) => {
                                setDescriptionString(e.target.value)
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                    </FormGroup>
                    <FormGroup switch>
                        <Input
                            id="isFeatured"
                            name="isFeatured"
                            type="switch"
                            checked={isFeatured}
                            onChange={() => {
                                setIsFeatured(!isFeatured);
                            }}
                            style={{
                                fontSize: "larger",
                                borderRadius: 0,
                                border: "1px solid #021E36"
                              }}
                        />
                        <Label checked for="isFeatured" style={{fontSize: "larger"}}>
                            Featured
                        </Label>
                    </FormGroup>
                    <Button onClick={(e) => handleUploadImage(e)} className="button" style={{
                        backgroundColor: "#75BCFA",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        transition: "box-shadow 0.1s",
                        fontSize: "larger"
                        }} >
                        Upload image
                    </Button>
                </Form>
                <br />
                <Button onClick={(e) => handleEditConfirm(e)} className="button" style={{
                    backgroundColor: "#FAB375",
                    color: "#021E36",
                    fontWeight: 800,
                    border: "none",
                    borderRadius: "0px",
                    transition: "box-shadow 0.1s",
                    fontSize: "larger",
                    }}>
                    Submit Edits
                </Button>
                <br />
                <br />
            </Container>
            <Modal isOpen={confirmModal} toggle={triggerConfirmModal}>
                <ModalHeader className="textReset">
                    Review edits - is this correct?
                </ModalHeader>
                <ModalBody className="textReset">
                    <strong className="textReset">Display Name:</strong> {displayName}<br />
                    <strong className="textReset">Price:</strong> ${price}<br />
                    <strong className="textReset">Country:</strong> {country}<br />
                    <strong className="textReset">Location:</strong> {locationString}<br />
                    <strong className="textReset">Farm:</strong> {farmString}<br />
                    <strong className="textReset">Process:</strong> {process}<br />
                    <strong className="textReset">Varietal:</strong> {varietal}<br />
                    <strong className="textReset">Elevation (MASL):</strong> {elevationRangeMASL}<br />
                    <strong className="textReset">Tasting Notes:</strong> {tastingNotes}<br />
                    <strong className="textReset">Description:</strong> {descriptionString}<br />
                    <strong className="textReset">Image:</strong><br/>
                        <img src={imageLocation} alt="coffee" style={{maxWidth: "50%"}}/><br />
                    <strong className="textReset">Featured:</strong> {isFeatured ? "yes" : "no"}<br />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setConfirmModal(false)}}
                        className="button" style={{
                            backgroundColor: "#FDE6FE",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}
                    >
                        Go back
                    </Button>
                    <Button onClick={(e) => {
                        handleEditCoffee(e)}}
                        className="button" style={{
                            backgroundColor: "#FAB375",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}
                    >
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}