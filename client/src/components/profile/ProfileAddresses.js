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
            <h3 style={{marginTop: "15px"}}>Linked Addresses</h3>
            <Table borderless>
                {userDetails.shippingAddresses?.length > 0 ? (
                    editAddressView ? (
                        <ProfileAddressEdit addressToEdit={addressToEdit} setEditAddressView={setEditAddressView} renderUserDetails={renderUserDetails}/>
                    ) : (
                        <tbody style={{border: "5px #FDE6FE solid"}}>
                        {userDetails.shippingAddresses.map(a =>
                            <tr key={a.id}>
                                <td className="textDetailsInList">
                                    {a.address1}<br />
                                    {a.address2 ? (
                                        <div className="textDetailsInList" style={{backgroundColor: "transparent"}}>
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
                                        handleModifyAddress(e, a);}} className="button" style={{
                                            backgroundColor: "#FAB375",
                                            color: "#021E36",
                                            fontWeight: 800,
                                            border: "none",
                                            borderRadius: "0px",
                                            transition: "box-shadow 0.1s",
                                            fontSize: "larger"
                                            }}
                                        >
                                            Modify
                                        </Button>
                                </td>
                                <td>
                                    <Button onClick={(e) => handleRemoveAddress(e, a)} className="button" style={{
                                        backgroundColor: "#021E36",
                                        color: "#FEF5ED",
                                        fontWeight: 800,
                                        border: "none",
                                        borderRadius: "0px",
                                        transition: "box-shadow 0.1s",
                                        fontSize: "larger"
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>)}
                    </tbody>
                    )
                ) : (
                    <tbody style={{border: "5px #FDE6FE solid"}}>
                        <tr>
                            <td className="textDetailsInList">
                                No linked addresses
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="textReset">
                    Confirm Removal?
                </ModalHeader>
                <ModalBody className="textReset">
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
                <ModalFooter className="textReset">
                    <Button onClick={toggle} className="button" style={{
                            backgroundColor: "#FDE6FE",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}>
                        Go back
                    </Button>
                    <Button onClick={(e) => confirmChanges(e)} className="button" style={{
                            backgroundColor: "#FAB375",
                            color: "#021E36",
                            fontWeight: 800,
                            border: "none",
                            borderRadius: "0px",
                            transition: "box-shadow 0.1s",
                            fontSize: "larger"
                            }}>
                        Confirm
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}