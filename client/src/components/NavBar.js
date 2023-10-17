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
import { logout } from "../managers/authManager";
import { BsPersonCircle, BsCart } from "react-icons/bs";

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
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
                <Nav navbar pills>
                    <NavItem onClick={() => setOpen(false)}>
                        <NavLink tag={RRNavLink} to="/coffees">
                            Coffees
                        </NavLink>
                    </NavItem>
                    {loggedInUser.roles.includes("Admin") && (
                        <>
                        <NavItem onClick={() => setOpen(false)}>
                            <NavLink tag={RRNavLink} to="/inventorymanager">
                                Inventory Manager
                            </NavLink>
                        </NavItem>
                        <NavItem onClick={() => setOpen(false)}>
                            <NavLink tag={RRNavLink} to="/ordermanager">
                                Order Manager
                            </NavLink>
                        </NavItem>
                        </>
                    )}
                </Nav>
            </Collapse>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <BsPersonCircle />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem
                        onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                            logout().then(() => {
                            setLoggedInUser(null);
                            setOpen(false);
                            });
                        }}
                    >Log out</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <BsCart />
        </>
        ) : (
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
            </NavLink>
            </NavItem>
        </Nav>
        )}
    </Navbar>
    </div>
);
}