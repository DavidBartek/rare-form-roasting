import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
UncontrolledDropdown,
DropdownToggle,
DropdownMenu,
DropdownItem,
} from "reactstrap";
import { logout } from "../../managers/authManager";
import { BsPersonCircle, BsCart } from "react-icons/bs";
import NavBarAuth from "./NavBarAuth";
import NavBarUnauth from "./NavBarUnauth";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

// to do:
// flesh out remaining ternary statement with corresponding navbar view

return (
    <div>
    <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        Rare Form Roasting Logo
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