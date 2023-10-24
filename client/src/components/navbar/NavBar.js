import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Navbar,
NavbarBrand
} from "reactstrap";
import NavBarAuth from "./NavBarAuth";
import NavBarUnauth from "./NavBarUnauth";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    <div>
    <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        RFR Logo
        </NavbarBrand>
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
    </div>
);
}