import { Link, NavLink as RRNavLink } from "react-router-dom";
import {
Collapse,
Nav,
NavLink,
NavItem,
NavbarToggler,
Popover,
PopoverBody,
NavbarBrand
} from "reactstrap";
import { BsPersonCircle } from "react-icons/bs";
import Cart from "./Cart";
import { useState } from "react";

export default function NavBarUnauth ({ toggleNavbar, open, setOpen }) {
    const [popover, setPopover] = useState(false);

    const togglePopover = () => {
        setPopover(!popover);
    };
    
    return (
        <>
            <NavbarBrand tag={RRNavLink} to="/">
                <img className="navbar-logo" src="/Logo_Thin_500x100.svg" alt="Logo"/>
            </NavbarBrand>
            <div className="togglerContainerUnauth">
                <NavbarToggler onClick={toggleNavbar} style={{color: "FEF5ED"}}/>
            </div>
            <Collapse isOpen={open} navbar>
                <Nav navbar>
                    <NavItem>
                        <img className="navlink-image" src="/Logo_Plane.svg" alt="Logo"/>
                    </NavItem>
                    <NavItem onClick={() => setOpen(false)}>
                        <NavLink tag={RRNavLink} to="/coffees" style={{
                                    fontWeight: "700",
                                    textAlign: "center",
                                    fontSize: "larger"
                                }}>
                            Coffees
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <img className="navlink-image" src="/Logo_Plane.svg" alt="Logo"/>
                    </NavItem>
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
                            <Link to="/login">
                                Login/Create Account
                            </Link>
                    </PopoverBody>        
                </Popover>
                <Cart className="cartIcon"/>
            </div>
        </>
    )
}