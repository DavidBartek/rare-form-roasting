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
DropdownItem,
Button,
} from "reactstrap";
import { logout } from "../../managers/authManager";
import { BsPersonCircle, BsCart } from "react-icons/bs";

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
            <BsCart />
        </>
    )
}