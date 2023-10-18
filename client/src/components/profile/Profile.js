import { useEffect, useState } from "react";
import { getUsersAddresses } from "../../managers/userProfileManager";
import { Button, Container, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { Link } from "react-router-dom";

export default function Profile ({ loggedInUser }) {
    const [linkedAddresses, setLinkedAddresses] = useState([]);
    // create state for each form field; default is loggedInUser.prop. onChange calls setProp.

    useEffect(() => {
        getUsersAddresses(loggedInUser.id).then(setLinkedAddresses);
    },[])
    
    const handleUserEdits = (e) => {
        e.preventDefault();
        console.log("edits submitted modal appears")
        // do we need to do a fetch for logged in user info, or will this hot update?
    }

    const handleModifyAddress = (e) => {
        e.preventDefault();
        console.log("modify address view")
    }

    const handleRemoveAddress = (e) => {
        e.preventDefault();
        console.log("delete address modal appears")
    }

    if (!loggedInUser) {
        return "Nothing to display."
    }
    return (
        <Container>
            <Form>
                <h1>Edit Profile Details</h1>
                <FormGroup>
                    <Label for="firstName">
                        First Name
                    </Label>
                    <Input 
                        id="firstName"
                        name="firstName"
                        placeholder={loggedInUser.firstName}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">
                        Last Name
                    </Label>
                    <Input 
                        id="lastName"
                        name="lastName"
                        placeholder={loggedInUser.lastName}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder={loggedInUser.email}
                        type="email"
                    />
                </FormGroup>
                {loggedInUser.roles.includes("Admin") && (
                    <p><strong>Administrator</strong></p>
                )}
            </Form>
            <Button onClick={(e) => handleUserEdits(e)}>
                Submit changes
            </Button>
            <Table borderless>
                <thead>
                    <tr>
                        <th>
                            Linked Addresses
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {linkedAddresses.map(a =>
                        <tr key={a.id}>
                            <td>
                                {a.address1}<br />
                                {a.address2 ? (
                                    <Container>
                                        {a.address2}
                                        <br />
                                    </Container>
                                    ) : (
                                    ""
                                    )}
                                {a.city}, {a.stateCode} {a.zip}
                            </td>
                            <td>
                                <Link onClick={(e) => handleModifyAddress(e)}>Modify</Link>
                            </td>
                            <td>
                                <Link onClick={(e) => handleRemoveAddress(e)}>Remove</Link>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </Container>
        //modal(s) here
    )
}