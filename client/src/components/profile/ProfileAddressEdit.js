import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { updateAddressDetails } from "../../managers/addressManager";
import { stateCodes } from "../assets/StateCodes"

export default function ProfileAddressEdit ({ addressToEdit, setEditAddressView, renderUserDetails }) {
    const [address1, setAddress1] = useState(addressToEdit.address1);
    const [address2, setAddress2] = useState(addressToEdit.address2);
    const [city, setCity] = useState(addressToEdit.city);
    const [stateCode, setStateCode] = useState(addressToEdit.stateCode);
    const [zip, setZip] = useState(addressToEdit.zip);

    const handleSaveAddressChange = (e) => {
        // changes empty strings back to default values
        if (address1 === "") {
            setAddress1(addressToEdit.address1);
        }
        if (address2 === "") {
            setAddress2(addressToEdit.address2);
        }
        if (city === "") {
            setCity(addressToEdit.city);
        // no condition necessary for statecode, since user is picking from a defined list.
        }
        if (zip === "") {
            setZip(addressToEdit.zip);
        }
    
        const addressClone = structuredClone(addressToEdit);

        addressClone.address1 = address1;
        addressClone.address2 = address2 || null;
        addressClone.city = city;
        addressClone.stateCode = stateCode;
        addressClone.zip = zip;

        updateAddressDetails(addressClone)
            .then(() => renderUserDetails())
            .then(() => setEditAddressView(false))

    }
    
    return (
        <tbody style={{border: "5px #75BCFA solid"}}>
            <tr style={{marginBottom: "15px"}}>
                <td style={{backgroundColor: "#FEF5ED"}}>
                    <Button onClick={() => setEditAddressView(false)} className="button" style={{
                        backgroundColor: "#75BCFA",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        transition: "box-shadow 0.1s",
                        fontSize: "larger",
                        marginBottom: "15px"
                        }} >Return</Button>
                    <Form>
                        <FormGroup>
                            <Label for="address1" className="textReset">
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
                                style={{
                                    fontSize: "larger",
                                    borderRadius: 0,
                                    border: "1px solid #021E36"
                                  }}
                            />
                        </FormGroup>
                        {addressToEdit.address2 ? (
                            <FormGroup>
                                <Label for="address2" className="textReset">
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
                                    style={{
                                        fontSize: "larger",
                                        borderRadius: 0,
                                        border: "1px solid #021E36"
                                      }}
                                />
                            </FormGroup>
                        ) : (
                            <FormGroup>
                                <Label for="address2" className="textReset">
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
                                    style={{
                                        fontSize: "larger",
                                        borderRadius: 0,
                                        border: "1px solid #021E36"
                                      }}
                                />
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label for="city" className="textReset">
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
                                value={stateCode}
                                onChange={(e) => {
                                    setStateCode(e.target.value)
                                }}
                                style={{
                                    fontSize: "larger",
                                    borderRadius: 0,
                                    border: "1px solid #021E36"
                                  }}>
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
                                value={zip}
                                onChange={(e) => {
                                    setZip(e.target.value)
                                }}
                                style={{
                                    fontSize: "larger",
                                    borderRadius: 0,
                                    border: "1px solid #021E36"
                                  }}
                            />
                        </FormGroup>
                    </Form>
                    <Button onClick={(e) => handleSaveAddressChange(e)} className="button" style={{
                        backgroundColor: "#FAB375",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        transition: "box-shadow 0.1s",
                        fontSize: "larger"
                    }}
                        >Save
                    </Button>
                </td>
            </tr>
        </tbody>
    )
}