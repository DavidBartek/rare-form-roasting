import { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { getUserDetailsWithRolesAndEmail } from "../../managers/userProfileManager";
import { getCurrentOrder } from "../../managers/orderManager";
import { stateCodes } from "../assets/StateCodes";
import { priceFormatter } from "../assets/exportFunctions";

export default function Checkout ({ loggedInUser }) {
    const [cart, setCart] = useState({})
    const [userDetails, setUserDetails] = useState({});
    const [newAddressView, setNewAddressView] = useState(false); // opens the new address fields. Cannot close in case user changes mind multiple times
    const [newAddressIsSelected, setNewAddressIsSelected] = useState(false); // for final post: will tell the function to look at new address fields or not
    const [newAddress1, setNewAddress1] = useState("");
    const [newAddress2, setNewAddress2] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newStateCode, setNewStateCode] = useState("");
    const [newZip, setNewZip] = useState("");

    const renderUserDetailsAndCart = () => {
        getUserDetailsWithRolesAndEmail(loggedInUser.id).then(setUserDetails);
        getCurrentOrder(loggedInUser.id).then(setCart);
    }

    useEffect(() => {
        renderUserDetailsAndCart();
    }, []);
    
    const handleAddressSelect = (a) => {
        setNewAddressIsSelected(false);
        console.log(`${a.id} set as address, id to be assigned to order obj`)
    }

    const handleNewAddressSelect = () => {
        setNewAddressView(true);
        setNewAddressIsSelected(true);
        console.log("new address fields set as address, to be posted & then id assigned to order obj")
    }

    const handlePurchase = (e) => {
        console.log("purchased");
        console.log("if new address is selected: FIRST posts this address, .then receives its ID in response")
        console.log("takes order id (cart id) and address Id and modifies fields in backend:")
        console.log("ShippingAddressId; DatePlaced (now); IsCurrent = false")
        console.log("finally: navigates user to confirmation page summarizing order")
    }

    if (!userDetails || !cart) {
        return null
    }
    return (
    <Container>
        <h2>Checkout</h2>
        <strong>Email: </strong>{userDetails.email}<br />
        <strong>Shipping Address: </strong><br />
        <Form>
            <FormGroup tag="fieldset">
            {userDetails.shippingAddresses?.length > 0 ? (
                userDetails.shippingAddresses.map(a => 
                <FormGroup check key={a.id}>
                    <Input
                        name="addressRadio"
                        type="radio"
                        onChange={() => handleAddressSelect(a)}
                    />
                    <Label check>
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
                )
                ) : (
                    ""
                )}
                <FormGroup>
                    <Input
                        name="addressRadio"
                        type="radio"
                        onChange={() => 
                            handleNewAddressSelect()
                        }
                    />
                    <Label check>
                        <>
                            &nbsp;&nbsp;
                            <strong>Add new address:</strong>
                            <br />
                        </>
                    </Label>
                </FormGroup>
                {newAddressView ? (
                <FormGroup>
                    <Label for="address1">
                        Address 1
                    </Label>
                    <Input
                        id="address1"
                        name="address1"
                        type="text"
                        value={newAddress1 ?? ""}
                        onChange={(e) => {
                            setNewAddress1(e.target.value)
                        }}
                    />
                    <Label for="address2">
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
                    />
                    <Label for="city">
                        City
                    </Label>
                    <Input
                        id="city"
                        name="city"
                        type="text"
                        value={newCity ?? ""}
                        onChange={(e) => {
                            setNewCity(e.target.value)
                        }}
                    />
                    <Label for="stateCode">
                        State
                    </Label>
                    <Input
                        id="stateCode"
                        name="stateCode"
                        type="select"
                        placeholder="Select state below"
                        value={newStateCode ?? ""}
                        onChange={(e) => {
                            setNewStateCode(e.target.value)
                        }}>
                    {stateCodes.map(s =>
                        <option key={s}>
                            {s}
                        </option>
                    )}
                    </Input>
                    <Label for="zip">
                        Zip
                    </Label>
                    <Input
                        id="zip"
                        name="zip"
                        type="text"
                        value={newZip ?? ""}
                        onChange={(e) => {
                            setNewZip(e.target.value)
                        }}
                    />
                </FormGroup>    
                ) : (
                    ""
                )}
            </FormGroup>
        </Form>
        <h5>Cart</h5>
        <Table borderless>
            <tbody>
                {cart.orderProducts?.map(op =>
                <tr key={op.id}>
                    <th>
                        image
                    </th>
                    <td>
                        <h5>{op.product.displayName}</h5>
                        Size: {op.weight.weightOz} oz<br />
                        Grind: {op.grind.grindSetting}<br />
                        Quantity: {op.productQuantity}<br />
                        <h6>${priceFormatter(op.subtotal)}</h6>
                    </td>
                </tr>
                )}
                <tr>
                    <th>
                        Total
                    </th>
                    <td>
                        <strong>${priceFormatter(cart.totalPrice)}</strong>
                    </td>
                </tr>
            </tbody>
        </Table>
        <Button onClick={(e) => handlePurchase(e)}>Purchase</Button>
    </Container>
    )
}

// fields needed:
// user's email
// shipping addresses (existing: radio buttons; new as form)
// similar product display as cart, order history detail view...
// image // displayname / size / grind // itemized price / quantity
// total
// purchase button