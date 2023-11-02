import { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateUserDetails } from "../../managers/userProfileManager";

export default function ProfileDetails ({ loggedInUser, userDetails, renderUserDetails }) {
    const [firstName, setFirstName] = useState(userDetails.firstName);
    const [lastName, setLastName] = useState(userDetails.lastName);
    const [email, setEmail] = useState(userDetails.email);
    const [modal, setModal] = useState(false);

    const handleUserEdits = (e) => {
        e.preventDefault();
        
        // changes empty strings back to default values
        if (firstName === "" || firstName === undefined) {
            setFirstName(userDetails.firstName);
        }

        if (lastName === "" || lastName === undefined) {
            setLastName(userDetails.lastName);
        }

        if (email === "" || email === undefined) {
            setEmail(userDetails.email);
        }

        toggle();
    }

    const confirmChanges = (e) => {
        e.preventDefault();

        updateUserDetails(userDetails.id, firstName, lastName, email)
            .then(() => {renderUserDetails()})
            .then(toggle);
    }

    const toggle = () => setModal(!modal);

    return (
    <>
        <Form>
            <h1 style={{marginTop: "10px"}}>Edit Profile Details</h1>
            <FormGroup>
                <Label for="firstName" className="textReset">
                    First Name
                </Label>
                <Input 
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={userDetails.firstName}
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    style={{
                        fontSize: "larger",
                        borderRadius: 0,
                        border: "1px solid #021E36"
                      }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="lastName" className="textReset">
                    Last Name
                </Label>
                <Input 
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={userDetails.lastName}
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    style={{
                        fontSize: "larger",
                        borderRadius: 0,
                        border: "1px solid #021E36"
                      }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="email" className="textReset">
                    Email
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={userDetails.email}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    style={{
                        fontSize: "larger",
                        borderRadius: 0,
                        border: "1px solid #021E36"
                      }}
                />
            </FormGroup>
            {loggedInUser.roles.includes("Admin") && (
                <p className="textReset">Logged in as an <strong className="textReset">administrator.</strong></p>
            )}
        </Form>
        <Button onClick={(e) => handleUserEdits(e)} className="button" style={{
            backgroundColor: "#75BCFA",
            color: "#021E36",
            fontWeight: 800,
            border: "none",
            borderRadius: "0px",
            transition: "box-shadow 0.1s",
            fontSize: "larger"
            }} >
            Submit changes
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader className="textReset">
                Confirm Profile Edits?
            </ModalHeader>
            <ModalBody className="textReset">
                First name: {firstName ? firstName : userDetails.firstName}<br />
                Last name: {lastName ? lastName : userDetails.lastName}<br />
                Email: {email ? email : userDetails.email}<br />
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
                    Cancel
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