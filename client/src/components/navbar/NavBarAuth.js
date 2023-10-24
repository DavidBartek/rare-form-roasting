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
import { BsPersonCircle } from "react-icons/bs";
import Cart from "./Cart";

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
                    <DropdownItem header>Hi, {loggedInUser.firstName}</DropdownItem>
                    <DropdownItem
                        onClick={() => {
                            logout().then(() => {
                            setLoggedInUser(null);
                            });
                        }}
                    >Sign out</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>
                        <NavLink tag={RRNavLink} to="/orders">
                            My Orders
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink tag={RRNavLink} to="/profile">
                            Profile
                        </NavLink>
                    </DropdownItem>
                    
                </DropdownMenu>
            </UncontrolledDropdown>
            <Cart />
        </>
    )
}