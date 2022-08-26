import React, { useState } from 'react'
import { NavLink as ReactLink } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import { checkLogin, getCurrentUser } from '../auth'
function CustomNavbar() {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar
                color='light'

                expand="md"
                className='px-5 shadow-sm'
            >
                <NavbarBrand tag={ReactLink} to="/" >MyShop</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/">Store</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/services">
                                Services
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about">
                                About
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Follow me
                            </DropdownToggle>
                            <DropdownMenu >
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Youtube</DropdownItem>
                                <DropdownItem>LinkedIn</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>


                    <Nav navbar>

                        {
                            (!checkLogin()) && (
                                <>

                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login">
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/singup">
                                            Singup
                                          
                                        </NavLink>
                                    </NavItem>

                                </>
                            )
                        }




                        {
                            (checkLogin()) && (
                                <>

                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard"  >
                                            {getCurrentUser().name}
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink  >
                                            Logout
                                        </NavLink>
                                    </NavItem>

                                </>
                            )
                        }

                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );

}

export default CustomNavbar