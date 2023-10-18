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
Container,
} from "reactstrap";
import { logout } from "../../managers/authManager";
import { BsPersonCircle, BsCart } from "react-icons/bs";

export default function NavBarAuth ({ loggedInUser, setLoggedInUser, toggleNavbar, open, setOpen }) {
    return (
        <Container>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
                <Nav navbar pills>
                    <NavItem onClick={() => setOpen(false)}>
                        <NavLink tag={RRNavLink} to="/coffees">
                            Coffees
                        </NavLink>
                    </NavItem>
                    {loggedInUser.roles.includes("Admin") && (
                        <Container>
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
                        </Container>
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
            <BsCart />
        </Container>
    )
}