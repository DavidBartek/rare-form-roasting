import { NavLink as RRNavLink } from "react-router-dom";
import {
Collapse,
Nav,
NavLink,
NavItem,
NavbarToggler,
Popover,
PopoverBody,
NavbarBrand,
} from "reactstrap";
import { logout } from "../../managers/authManager";
import { BsPersonCircle } from "react-icons/bs";
import Cart from "./Cart";
import { useState } from "react";

export default function NavBarAuth ({ loggedInUser, setLoggedInUser, toggleNavbar, open, setOpen }) {
    const [popover, setPopover] = useState(false);

    const togglePopover = () => {
        setPopover(!popover);
    };
    
    return (
        <>
            <NavbarBrand tag={RRNavLink} to="/">
                <img className="navbar-logo" src="images/Logo_Thin_500x100.svg" />
            </NavbarBrand>
            <div className="togglerContainer">
                <NavbarToggler onClick={toggleNavbar} />
            </div>
            <Collapse isOpen={open} navbar>
                <Nav navbar>
                    <NavItem onClick={() => setOpen(false)}>
                        <NavLink tag={RRNavLink} to="/coffees" style={{
                                    fontWeight: "700",
                                    textAlign: "center"
                                }}>
                            Coffees
                        </NavLink>
                    </NavItem>
                    {loggedInUser.roles.includes("Admin") && (
                        <>
                            <NavItem onClick={() => setOpen(false)}>
                                <NavLink tag={RRNavLink} to="/inventorymanager" style={{
                                    fontWeight: "700",
                                    textAlign: "center"
                                }}>
                                    Inventory Manager
                                </NavLink>
                            </NavItem>
                            <NavItem onClick={() => setOpen(false)}>
                                <NavLink tag={RRNavLink} to="/ordermanager" style={{
                                    fontWeight: "700",
                                    textAlign: "center"
                                }}>
                                    Order Manager
                                </NavLink>
                            </NavItem>
                        </>
                    )}
                </Nav>
            </Collapse>
            <div className="navbar-icons">
                <BsPersonCircle id="profileIcon"/>
                <Popover
                    target="profileIcon"
                    placement="bottom"
                    trigger="focus"
                    isOpen={popover}
                    toggle={() => togglePopover()}>
                    <PopoverBody>
                        <h5>
                            Hi, {loggedInUser.firstName}
                        </h5>
                        <div
                            onClick={() => {
                                logout().then(() => {
                                setLoggedInUser(null);
                                });
                            }}
                            style={{
                                fontWeight: "900",
                                cursor: "pointer"}}
                            >Sign out
                        </div>
                        <div>
                            <NavLink tag={RRNavLink} to="/orders">
                                My Orders
                            </NavLink>
                        </div>
                        <div>
                            <NavLink tag={RRNavLink} to="/profile">
                                Profile
                            </NavLink>
                        </div>
                    </PopoverBody>
                </Popover>
                <Cart className="cartIcon" loggedInUser={loggedInUser}/>
            </div>
        </>
    )
}