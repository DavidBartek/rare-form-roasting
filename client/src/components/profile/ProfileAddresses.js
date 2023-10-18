import { useState } from "react";
import { Button, Table } from "reactstrap";
import ProfileAddressEdit from "./ProfileAddressEdit";

export default function ProfileAddresses ({ userDetails, renderUserDetails }) {

    const [editAddressView, setEditAddressView] = useState(false);
    const [addressToEdit, setAddressToEdit] = useState({});

    const handleModifyAddress = (e) => {
        e.preventDefault();
        setEditAddressView(!editAddressView);
    }

    const handleRemoveAddress = (e) => {
        e.preventDefault();
        console.log("delete address modal appears")
    }

    if (!userDetails) {
        return null
    }
    return (
        <Table borderless>
            <thead>
                <tr>
                    <th>
                        Linked Addresses
                    </th>
                </tr>
            </thead>
            {userDetails.shippingAddresses?.length > 0 ? (
                editAddressView ? (
                    <ProfileAddressEdit addressToEdit={addressToEdit} setEditAddressView={setEditAddressView} renderUserDetails={renderUserDetails}/>
                ) : (
                    <tbody>
                    {userDetails.shippingAddresses.map(a =>
                        <tr key={a.id}>
                            <td>
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
                            </td>
                            <td>
                                <Button onClick={(e) => {
                                    setAddressToEdit(a);
                                    handleModifyAddress(e);}}>Modify</Button>
                            </td>
                            <td>
                                <Button onClick={(e) => handleRemoveAddress(e)}>Remove</Button>
                            </td>
                        </tr>)}
                </tbody>
                )
            ) : (
                <tbody>
                    <tr>
                        <td>
                            No linked addresses
                        </td>
                    </tr>
                </tbody>
            )}
            
        </Table>
    )
}