import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createNewProductAdmin } from "../../managers/productManager";

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
    const [imageLocation, setImageLocation] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);
    const [imageInitialView, setImageInitialView] = useState(true);
    const [imageUrlView, setImageUrlView] = useState(false);
    const [imageView, setImageView] = useState(false);
    const [emptyFieldModal, setEmptyFieldModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const navigate = useNavigate();

    const handleUploadImage = (e) => {
        e.preventDefault();
        setImageUrlView(true);
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
                <Link to="/inventorymanager" style={{fontSize: "larger"}}>Back to Inventory Manager</Link>
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
                            placeholder="Set public-facing display name"
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
                            placeholder="Set price for 12 oz bag - numbers only"
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
                            placeholder="Set country of origin"
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
                            placeholder="Set geographical location/region of origin"
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
                            placeholder="Set name of farm/co-op"
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
                            placeholder="Set type(s) of varietal"
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
                            placeholder="Set elevation in MASL - single number or range"
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
                            placeholder="Tasting notes sepearated by commas"
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
                            placeholder="Paragraph-long description"
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
                        <Label check for="isFeatured" style={{fontSize: "larger"}}>
                            Make featured?
                        </Label>
                    </FormGroup>
                    {imageInitialView ? (
                        <Button onClick={(e) => {
                            e.preventDefault();
                            setImageInitialView(false);
                            setImageUrlView(true);
                        }} 
                        className="button" style={{
                            backgroundColor: "#75BCFA",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}>
                            Upload image
                        </Button>
                    ) : (
                        ""
                    )}
                    {imageUrlView ? (
                        // second view
                        <>
                        <FormGroup>
                            <Label for="imageUrl" style={{fontSize: "larger"}}>
                                Image URL
                            </Label>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                type="text"
                                value={imageLocation ?? ""}
                                placeholder="Link to permanent URL here"
                                onChange={(e) => {
                                    setImageLocation(e.target.value)
                                }}
                                style={{
                                    fontSize: "larger",
                                    borderRadius: 0,
                                    border: "1px solid #021E36"
                                }}
                            />
                        </FormGroup>
                        <Button className="button" 
                            onClick={(e) => {
                                e.preventDefault();
                                setImageUrlView(false);
                                setImageView(true);
                            }}
                            style={{
                                backgroundColor: "#75BCFA",
                                color: "#021E36",
                                fontWeight: 800,
                                border: "none",
                                borderRadius: "0px",
                                transition: "box-shadow 0.1s",
                                fontSize: "larger"
                                }}>
                            Confirm Upload
                        </Button>
                        </>
                    ) : (
                        ""
                    )}
                    {imageView ? (
                        // final view
                        <>
                            <br />
                            <img src={imageLocation} alt="error uploading image" style={{maxWidth: "300px"}}/>
                            <br />
                            <br />
                            <Button className="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setImageView(false);
                                    setImageUrlView(true);
                                }}
                                style={{
                                    backgroundColor: "#75BCFA",
                                    color: "#021E36",
                                    fontWeight: 800,
                                    border: "none",
                                    borderRadius: "0px",
                                    transition: "box-shadow 0.1s",
                                    fontSize: "larger"
                                }}>
                                Upload different image
                            </Button>
                        </>
                    ) : (
                        ""
                    )}
                    
                </Form>
                <br />
                <br />
                <Button onClick={(e) => handlePostConfirm(e)} className="button" style={{
                    backgroundColor: "#FAB375",
                    color: "#021E36",
                    fontWeight: 800,
                    border: "none",
                    borderRadius: "0px",
                    transition: "box-shadow 0.1s",
                    fontSize: "larger",
                    }}>
                    Add Coffee to Inventory
                </Button>
                <br />
                <br />

            </Container>

            <Modal isOpen={emptyFieldModal} toggle={triggerEmptyFieldModal}>
                <ModalHeader className="textReset">
                    Please fill out all fields
                </ModalHeader>
                <ModalFooter className="textReset">
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setEmptyFieldModal(false)}}
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
                </ModalFooter>
            </Modal>

            <Modal isOpen={confirmModal} toggle={triggerConfirmModal}>
                <ModalHeader className="textReset">
                    Add this coffee to inventory?
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
                    <strong className="textReset">Image:</strong><br /> 
                        <img src={imageLocation} alt="coffee" style={{maxWidth: "50%"}} /><br />
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
                        handleAddCoffee(e)}}
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


// backend:
// dateAdded
// imageLocation may have to be populated here via cloudinary
// isLive
