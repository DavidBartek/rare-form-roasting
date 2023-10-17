import { useEffect, useState } from "react";
import { getUsersAddresses } from "../../managers/userProfileManager";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

export default function Profile ({ loggedInUser }) {
    const [linkedAddresses, setLinkedAddresses] = useState([]);

    useEffect(() => {
        getUsersAddresses(loggedInUser.id).then(setLinkedAddresses);
    },[])
    
    if (!loggedInUser) {
        return "Nothing to display."
    }
    return (
        <Container>
            <Form>
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
            </Form>
            <Button>
                Submit changes
            </Button>
        </Container>
        //modal here
        //addresses here
    )
}