import { NavLink as RRNavLink } from "react-router-dom";
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
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
                <Nav navbar>
                    <NavItem onClick={() => setOpen(false)}>
                        <NavLink tag={RRNavLink} to="/coffees">
                            Coffees
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            <NavbarBrand tag={RRNavLink} to="/">
                <img src="images/Logo_Thin_500x100.svg" style={{
                    height: "50px"
                }}/>
            </NavbarBrand>
            <BsPersonCircle id="profileIcon"/>
            <Popover
                target="profileIcon"
                placement="bottom"
                trigger="focus"
                isOpen={popover}
                toggle={() => togglePopover()}>
                <PopoverBody>
                    <div>
                        <NavLink tag={RRNavLink} to="/login">
                            Login/Create Account
                        </NavLink>
                    </div>
                </PopoverBody>        
            </Popover>
            <Cart />
        </>
    )
}