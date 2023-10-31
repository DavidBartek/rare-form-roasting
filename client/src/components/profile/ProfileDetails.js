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
        if (firstName === "") {
            setFirstName(userDetails.firstName);
        }

        if (lastName === "") {
            setLastName(userDetails.lastName);
        }

        if (email === "") {
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
            <h1>edit profile details</h1>
            <FormGroup>
                <Label for="firstName">
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
                />
            </FormGroup>
            <FormGroup>
                <Label for="lastName">
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
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">
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
                />
            </FormGroup>
            {loggedInUser.roles.includes("Admin") && (
                <p>Logged in as an <strong>administrator.</strong></p>
            )}
        </Form>
        <Button onClick={(e) => handleUserEdits(e)}>
            Submit changes
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>
                Confirm Profile Edits?
            </ModalHeader>
            <ModalBody>
                First name: {firstName}<br />
                Last name: {lastName}<br />
                Email: {email}<br />
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