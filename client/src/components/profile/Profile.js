import { Container } from "reactstrap";
import ProfileDetails from "./ProfileDetails";
import ProfileAddresses from "./ProfileAddresses";
import { useEffect, useState } from "react";
import { getUserDetailsWithRolesAndEmail } from "../../managers/userProfileManager";

export default function Profile ({ loggedInUser }) {

    const [userDetails, setUserDetails] = useState({});

    const renderUserDetails = () => {
        getUserDetailsWithRolesAndEmail(loggedInUser.id).then(setUserDetails);
    }
    
    useEffect(() => {
        renderUserDetails();
    }, []);

    if (!userDetails) {
        return "Nothing to display."
    }
    return (
        <Container>
            <ProfileDetails loggedInUser={loggedInUser} userDetails={userDetails} renderUserDetails={renderUserDetails} />
            <ProfileAddresses loggedInUser={loggedInUser} userDetails={userDetails} renderUserDetails={renderUserDetails} />
        </Container>
    )
}