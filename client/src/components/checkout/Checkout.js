import { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalFooter, ModalHeader, Table } from "reactstrap";
import { getUserDetailsWithRolesAndEmail } from "../../managers/userProfileManager";
import { getCurrentOrder, getJustPlacedOrder, placeOrder } from "../../managers/orderManager";
import { stateCodes } from "../assets/StateCodes";
import { priceFormatter } from "../assets/exportFunctions";
import { createNewAddress } from "../../managers/addressManager";
import CheckoutConfirm from "./CheckoutConfirm";

export default function Checkout ({ loggedInUser }) {
    const [cart, setCart] = useState({})
    const [userDetails, setUserDetails] = useState({});
    const [linkedAddressId, setLinkedAddressId] = useState("");
    const [newAddressView, setNewAddressView] = useState(false); // opens the new address fields. Cannot close in case user changes mind multiple times
    const [newAddressIsSelected, setNewAddressIsSelected] = useState(false); // for final post: will tell the function to look at new address fields or not
    const [newAddress1, setNewAddress1] = useState("");
    const [newAddress2, setNewAddress2] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newStateCode, setNewStateCode] = useState("AL");
    const [newZip, setNewZip] = useState("");
    const [modal, setModal] = useState(false);
    const [checkoutConfirmView, setCheckoutConfirmView] = useState(false);
    const [justPlacedOrder, setJustPlacedOrder] = useState({}); // for prop drilling to CheckoutConfirm.js

    const renderUserDetailsAndCart = () => {
        getUserDetailsWithRolesAndEmail(loggedInUser.id).then(setUserDetails);
        getCurrentOrder(loggedInUser.id).then(setCart);
    }

    useEffect(() => {
        renderUserDetailsAndCart();
    }, []);
    
    const handleAddressSelect = (a) => {
        setNewAddressIsSelected(false);
        setLinkedAddressId(a.id);
    }

    const handleNewAddressSelect = () => {
        setNewAddressView(true);
        setNewAddressIsSelected(true);
    }
    
    const triggerEmptyAddressModal = () => setModal(!modal);

    const handlePurchase = (e) => {
        e.preventDefault();

        // condition 1: already-existant address is selected
        if (!newAddressIsSelected) {
            // error handling - if no address selection is made
            if (linkedAddressId === "") {
                triggerEmptyAddressModal()
            } else {
                placeOrder(cart.id, linkedAddressId)
                    .then(() => getJustPlacedOrder(loggedInUser.id).then(setJustPlacedOrder)) // added
                    .then(() => setCheckoutConfirmView(true))
            }
            
        // condition 2: new address is selected
        } else {
            // error handling - if fields were left empty
            if (newAddress1 === "" || newCity === "" || newStateCode === "" || newZip === "") {

                triggerEmptyAddressModal();

            } else {
                const addressObj = {
                    userProfileId: userDetails.id,
                    address1: newAddress1,
                    address2: newAddress2,
                    city: newCity,
                    stateCode: newStateCode,
                    zip: newZip
                }
    
                createNewAddress(addressObj)
                    .then((res) => placeOrder(cart.id, res.id))
                    .then(() => getJustPlacedOrder(loggedInUser.id).then(setJustPlacedOrder))
                    .then(() => setCheckoutConfirmView(true));
            }
            
        }
        
    }

    if (!userDetails || !cart) {
        return null
    } else if (checkoutConfirmView) {
        return (
            <CheckoutConfirm loggedInUser={loggedInUser} justPlacedOrder={justPlacedOrder}/>
        )
    } else if (!checkoutConfirmView) {
        return (
            <>
                <Container className="checkoutContainer">
                    <div className="addressContainer">
                        <h1>Checkout</h1>
                        <div className="bodytext">
                            <strong className="bodytext">Email: </strong>{userDetails.email}<br />
                            <strong className="bodytext">Shipping Address: </strong><br />
                            <Form>
                                <FormGroup tag="fieldset">
                                    {userDetails.shippingAddresses?.length > 0 ? (
                                        userDetails.shippingAddresses.map(a => (
                                            <FormGroup check key={a.id}>
                                                <Input
                                                    name="addressRadio"
                                                    type="radio"
                                                    onChange={() => handleAddressSelect(a)}
                                                    style={{fontSize: "larger", border: "1px solid black"}}
                                                />
                                                <Label check style={{fontSize: "larger"}}>
                                                    {a.address1}<br />
                                                    {a.address2 ? (
                                                        <div>
                                                            {a.address2}
                                                            <br />
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {a.city}, {a.stateCode} {a.zip}
                                                </Label>
                                            </FormGroup>
                                        ))
                                    ) : (
                                        ""
                                    )}
                                    <FormGroup>
                                        <Input
                                            name="addressRadio"
                                            type="radio"
                                            onChange={() => handleNewAddressSelect()}
                                            style={{fontSize: "larger", border: "1px solid black", marginLeft: "-5px"}}
                                        />
                                        <Label check style={{fontSize: "larger"}}>
                                            <>
                                                &nbsp;&nbsp;
                                                <strong style={{fontSize: "20px"}}>Add new address</strong>
                                                <br />
                                            </>
                                        </Label>
                                    </FormGroup>
                                    {newAddressView ? (
                                        <FormGroup>
                                            <FormGroup>
                                                <Label for="address1" className="textReset">
                                                    Address 1
                                                </Label>
                                                <Input
                                                    id="address1"
                                                    name="address1"
                                                    type="text"
                                                    value={newAddress1 ?? ""}
                                                    placeholder="required"
                                                    onChange={(e) => {
                                                        setNewAddress1(e.target.value)
                                                    }}
                                                    style={{
                                                        fontSize: "larger",
                                                        borderRadius: 0,
                                                        border: "1px solid #021E36"
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="address2" className="textReset">
                                                    Address 2
                                                </Label>
                                                <Input
                                                    id="address2"
                                                    name="address2"
                                                    type="text"
                                                    value={newAddress2 ?? ""}
                                                    onChange={(e) => {
                                                        setNewAddress2(e.target.value)
                                                    }}
                                                    style={{
                                                        fontSize: "larger",
                                                        borderRadius: 0,
                                                        border: "1px solid #021E36"
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="city" className="textReset">
                                                    City
                                                </Label>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    value={newCity ?? ""}
                                                    placeholder="required"
                                                    onChange={(e) => {
                                                        setNewCity(e.target.value)
                                                    }}
                                                    style={{
                                                        fontSize: "larger",
                                                        borderRadius: 0,
                                                        border: "1px solid #021E36"
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="stateCode" className="textReset">
                                                    State
                                                </Label>
                                                <Input
                                                    id="stateCode"
                                                    name="stateCode"
                                                    type="select"
                                                    value={newStateCode ?? ""}
                                                    onChange={(e) => {
                                                        setNewStateCode(e.target.value)
                                                    }}
                                                    style={{
                                                        fontSize: "larger",
                                                        borderRadius: 0,
                                                        border: "1px solid #021E36"
                                                    }}
                                                >
                                                    {stateCodes.map(s =>
                                                        <option key={s}>
                                                            {s}
                                                        </option>
                                                    )}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="zip" className="textReset">
                                                    Zip
                                                </Label>
                                                <Input
                                                    id="zip"
                                                    name="zip"
                                                    type="text"
                                                    value={newZip ?? ""}
                                                    placeholder="required"
                                                    onChange={(e) => {
                                                        setNewZip(e.target.value)
                                                    }}
                                                    style={{
                                                        fontSize: "larger",
                                                        borderRadius: 0,
                                                        border: "1px solid #021E36"
                                                    }}
                                                />
                                            </FormGroup>
                                        </FormGroup>    
                                    ) : (
                                        ""
                                    )}
                                </FormGroup>
                            </Form>
                        
                        </div>
                    </div>

                    <div className="cartContainer">
                        <h3>Cart</h3>
                        <Table borderless>
                            <tbody style={{border: "5px #FDE6FE solid"}}>
                                {cart.orderProducts?.map(op => (
                                    <tr key={op.id}>
                                        <th style={{maxWidth: "180px"}}>
                                            <img src={op.product.imageLocation} alt="coffee" 
                                            style={{width: "85%"}} />
                                        </th>
                                        <td className="textReset">
                                            <h5 className="textReset">{op.product.displayName}</h5>
                                            Size: {op.weight.weightOz} oz<br />
                                            Grind: {op.grind.grindSetting}<br />
                                            Quantity: {op.productQuantity}<br />
                                            <h6 className="textReset">${priceFormatter(op.subtotal)}</h6>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <th className="textReset">
                                        Total
                                    </th>
                                    <td>
                                        <strong className="textReset">${priceFormatter(cart.totalPrice)}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <Button onClick={(e) => handlePurchase(e)} className="button" style={{
                            backgroundColor: "#FAB375",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger",
                            width: "100%"
                            }}>
                            Purchase
                        </Button>

                    </div>
                </Container>
                <Modal isOpen={modal} toggle={triggerEmptyAddressModal}>
                    <ModalHeader className="textReset">
                        Please fill out all required address fields
                    </ModalHeader>
                    <ModalFooter className="textReset">
                        <Button onClick={(e) => {
                            e.preventDefault();
                            setModal(false)}}
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
            </>
        
            )
    }
    
}

// fields needed:
// user's email
// shipping addresses (existing: radio buttons; new as form)
// similar product display as cart, order history detail view...
// image // displayname / size / grind // itemized price / quantity
// total
// purchase button