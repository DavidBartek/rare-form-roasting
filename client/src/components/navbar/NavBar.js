import { useState } from "react";
import {Navbar} from "reactstrap";
import NavBarAuth from "./NavBarAuth";
import NavBarUnauth from "./NavBarUnauth";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    
    <Navbar fixed="true" expand="lg">
        {loggedInUser ? (
            <NavBarAuth 
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
                toggleNavbar={toggleNavbar}
                open={open}
                setOpen={setOpen}
            />
        ) : (
            <NavBarUnauth 
                toggleNavbar={toggleNavbar}
                open={open}
                setOpen={setOpen}
            />
        )}
    </Navbar>
);
}