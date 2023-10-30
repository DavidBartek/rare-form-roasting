import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createNewProductAdmin } from "../../managers/productManager";
import { priceFormatter } from "../assets/exportFunctions";

export default function CreateCoffee () {
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
    const [emptyFieldModal, setEmptyFieldModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const navigate = useNavigate();

    const handleUploadImage = (e) => {
        e.preventDefault();
        console.log("cloudinary upload to be implemented");
        setImageLocation("https://media.istockphoto.com/id/1334162584/photo/african-employers-are-working-with-coffee-beans-production-at-washing-center.jpg?s=1024x1024&w=is&k=20&c=WEhilsjZwfOg19u4ei6G4jAWRdxbGJTgAAf--LyV9ks=")
    }

    const triggerEmptyFieldModal = () => setEmptyFieldModal(!emptyFieldModal);
    const triggerConfirmModal = () => setConfirmModal(!confirmModal);

    const handlePostConfirm = (e) => {
        e.preventDefault(e);
        if (displayName === "" || price === "" || country === "" || locationString === "" || farmString === "" || process === "" || varietal === "" || elevationRangeMASL === "" || tastingNotes === "" || descriptionString === "" || imageLocation === "") {
            triggerEmptyFieldModal();
        } else {
            triggerConfirmModal();
        }
    }
    
    const handleAddCoffee = (e) => {
        e.preventDefault();

        const newCoffeeObj = {
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

        createNewProductAdmin(newCoffeeObj)
            .then(() => setConfirmModal(false))
            .then(() => navigate("/inventorymanager"));
    }
    
    return (
        <>
            <Container>
                <h1>Add coffee to inventory</h1>
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
                            placeholder="Set public-facing display name"
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
                            placeholder="Set price for 12 oz bag - numbers only"
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
                            placeholder="Set country of origin"
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
                            placeholder="Set geographical location/region of origin"
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
                            placeholder="Set name of farm/co-op"
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
                            placeholder="Set type(s) of varietal"
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
                            placeholder="Set elevation in MASL - single number or range"
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
                            placeholder="Tasting notes sepearated by commas"
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
                            placeholder="Paragraph-long description"
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
                        <Label check for="isFeatured">
                            Make featured?
                        </Label>
                    </FormGroup>
                    <Button onClick={(e) => handleUploadImage(e)}>
                        Upload image
                    </Button>
                </Form>
                <Button onClick={(e) => handlePostConfirm(e)}>
                    Add Coffee
                </Button>
            </Container>
            <Modal isOpen={emptyFieldModal} toggle={triggerEmptyFieldModal}>
                <ModalHeader>
                    Please fill out all required fields
                </ModalHeader>
                <ModalFooter>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setEmptyFieldModal(false)}}
                    >
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={confirmModal} toggle={triggerConfirmModal}>
                <ModalHeader>
                    Add this coffee to inventory?
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
                        Make Changes
                    </Button>
                    <Button onClick={(e) => {
                        handleAddCoffee(e)}}
                    >
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}


// backend:
// dateAdded
// imageLocation may have to be populated here via cloudinary
// isLive
