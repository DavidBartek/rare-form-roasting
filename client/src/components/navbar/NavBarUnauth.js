import { NavLink as RRNavLink } from "react-router-dom";
import {
Collapse,
Nav,
NavLink,
NavItem,
NavbarToggler,
UncontrolledDropdown,
DropdownToggle,
DropdownMenu,
DropdownItem
} from "reactstrap";
import { BsPersonCircle } from "react-icons/bs";
import Cart from "./Cart";

export default function NavBarUnauth ({ toggleNavbar, open, setOpen }) {
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
                </Nav>
            </Collapse>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <BsPersonCircle />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <NavLink tag={RRNavLink} to="/login">
                            Login/Create Account
                        </NavLink>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <Cart />
        </>
    )
}