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
                <h1>Modify a Coffee</h1>
                <Link to="/inventorymanager">Back to Inventory Manager</Link>
                <Form>
                    <FormGroup>
                        <Label for="displayName">
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="locationString">
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="farmString">
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="process">
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
                        <Label for="varietal">
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="elevationRangeMASL">
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="tastingNotes">
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
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descriptionString">
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
                        />
                        <Label checked for="isFeatured">
                            Featured
                        </Label>
                    </FormGroup>
                    <Button onClick={(e) => handleUploadImage(e)}>
                        Upload image
                    </Button>
                </Form>
                <Button onClick={(e) => handleEditConfirm(e)}>
                    Submit Edits
                </Button>
            </Container>
            <Modal isOpen={confirmModal} toggle={triggerConfirmModal}>
                <ModalHeader>
                    Review edits - is this correct?
                </ModalHeader>
                <ModalBody>
                    Display Name: {displayName}<br />
                    Price: ${price}<br />
                    country: {country}<br />
                    locationString: {locationString}<br />
                    farmString: {farmString}<br />
                    process: {process}<br />
                    varietal: {varietal}<br />
                    elevationRangeMASL: {elevationRangeMASL}<br />
                    tastingNotes: {tastingNotes}<br />
                    descriptionString: {descriptionString}<br />
                    imageLocation: {imageLocation}<br />
                    Featured: {isFeatured ? "yes" : "no"}<br />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setConfirmModal(false)}}
                    >
                        Go back
                    </Button>
                    <Button onClick={(e) => {
                        handleEditCoffee(e)}}
                    >
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}