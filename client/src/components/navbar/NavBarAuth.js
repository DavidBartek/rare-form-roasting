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
} from "reactstrap";
import { logout } from "../../managers/authManager";
import { BsPersonCircle, BsCart } from "react-icons/bs";

export default function NavBarAuth ({ loggedInUser, setLoggedInUser, toggleNavbar, open, setOpen }) {
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
    )
}