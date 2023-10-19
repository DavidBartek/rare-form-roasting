import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import ProfileAddressEdit from "./ProfileAddressEdit";
import { getAddressDetails, removeAddress } from "../../managers/addressManager";

export default function ProfileAddresses ({ userDetails, renderUserDetails }) {
    const [editAddressView, setEditAddressView] = useState(false);
    const [addressToEdit, setAddressToEdit] = useState({});
    const [addressToDelete, setAddressToDelete] = useState({});
    const [modal, setModal] = useState(false);

    const handleModifyAddress = (e, a) => {
        e.preventDefault();
        getAddressDetails(a.id)
            .then(setAddressToEdit)
            .then(() => setEditAddressView(!editAddressView));
    }

    const handleRemoveAddress = (e, a) => {
        e.preventDefault();
        getAddressDetails(a.id)
            .then(setAddressToDelete)
            .then(toggle);
    }

    const toggle = () => setModal(!modal);

    const confirmChanges = (e) => {
        e.preventDefault();
        removeAddress(addressToDelete.id)
            .then(() => {renderUserDetails()})
            .then(toggle);
    }

    if (!userDetails) {
        return null
    }
    return (
        <>
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
                                        handleModifyAddress(e, a);}}>Modify</Button>
                                </td>
                                <td>
                                    <Button onClick={(e) => handleRemoveAddress(e, a)}>Remove</Button>
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
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    Confirm Removal?
                </ModalHeader>
                <ModalBody>
                    {addressToDelete.address1}<br />
                    {addressToDelete.address2 ? (
                        <div>
                            {addressToDelete.address2}
                            <br />
                        </div>
                        ) : (
                        ""
                    )}
                    {addressToDelete.city}, {addressToDelete.stateCode} {addressToDelete.zip}<br />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => confirmChanges(e)}>
                        Confirm
                    </Button>
                    <Button onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}