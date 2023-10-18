import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { stateCodes } from "./StateCodes";
import { updateAddressDetails } from "../../managers/addressManager";

export default function ProfileAddressEdit ({ addressToEdit, setEditAddressView, renderUserDetails }) {
    const [address1, setAddress1] = useState(addressToEdit.address1);
    const [address2, setAddress2] = useState(addressToEdit.address2);
    const [city, setCity] = useState(addressToEdit.city);
    const [stateCode, setStateCode] = useState(addressToEdit.stateCode);
    const [zip, setZip] = useState(addressToEdit.zip);


    const handleSaveAddressChange = (e) => {
        // console.log(addressToEdit);

        // changes empty strings back to default values
        if (address1 === "") {
            setAddress1(addressToEdit.address1);
        }
        if (address2 === "") {
            setAddress2(addressToEdit.address2);
        }
        if (city === "") {
            setCity(addressToEdit.addressc);
        }
        if (zip === "") {
            setZip(addressToEdit.zip);
        }

        const changedAddress = {
            id: addressToEdit.id,
            userProfileId: addressToEdit.userProfileId,
            address1: address1,
            address2: address2,
            city: city,
            stateCode: stateCode,
            zip: zip,
            isActive: addressToEdit.isActive
        }

        // console.log(addressToEdit.id)
        // console.log(changedAddress.id)

        updateAddressDetails(addressToEdit.id, changedAddress)
            .then(() => renderUserDetails())
            .then(() => setEditAddressView(false))

    }
    
    return (
        <tbody>
            <tr>
                <td>
                    <Button onClick={() => setEditAddressView(false)}>Return</Button>
                    <Form>
                        <FormGroup>
                            <Label for="address1">
                                Address 1
                            </Label>
                            <Input
                                id="address1"
                                name="address1"
                                type="text"
                                placeholder={addressToEdit.address1}
                                value={address1}
                                onChange={(e) => {
                                    setAddress1(e.target.value)
                                }}
                            />
                        </FormGroup>
                        {addressToEdit.address2 ? (
                            <FormGroup>
                                <Label for="address2">
                                    Address 2
                                </Label>
                                <Input
                                    id="address2"
                                    name="address2"
                                    type="text"
                                    placeholder={addressToEdit.address2}
                                    value={address2}
                                    onChange={(e) => {
                                        setAddress2(e.target.value)
                                    }}
                                />
                            </FormGroup>
                        ) : (
                            <FormGroup>
                                <Label for="address2">
                                    Address 2
                                </Label>
                                <Input
                                    id="address2"
                                    name="address2"
                                    type="text"
                                    value={address2 ? address2 : ""}
                                    onChange={(e) => {
                                        setAddress2(e.target.value)
                                    }}
                                />
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label for="city">
                                City
                            </Label>
                            <Input
                                id="city"
                                name="city"
                                type="text"
                                placeholder={addressToEdit.city}
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="stateCode">
                                State
                            </Label>
                            <Input
                                id="stateCode"
                                name="stateCode"
                                type="select"
                                value={stateCode}
                                onChange={(e) => {
                                    setStateCode(e.target.value)
                                }}>
                            {stateCodes.map(s =>
                                <option key={s}>
                                    {s}
                                </option>
                            )}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="zip">
                                Zip
                            </Label>
                            <Input
                                id="zip"
                                name="zip"
                                type="text"
                                value={zip}
                                onChange={(e) => {
                                    setZip(e.target.value)
                                }}
                            />
                        </FormGroup>
                    </Form>
                    <Button onClick={(e) => handleSaveAddressChange(e)}>Save</Button>
                </td>
            </tr>
        </tbody>
    )
}