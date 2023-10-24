import { NavLink as RRNavLink } from "react-router-dom";
import {
Collapse,
Nav,
NavLink,
NavItem,
NavbarToggler,
Popover,
PopoverBody,
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
            <Cart loggedInUser={loggedInUser}/>
        </>
    )
}