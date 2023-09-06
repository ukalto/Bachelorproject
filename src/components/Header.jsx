import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';

const Header = () => {
    const textStyle = {
        fontWeight: 'bold',
        fontSize: '20px',
        color: 'black'
    };

    const brandStyle = {
        fontWeight: 'bold',
        fontSize: '28px',
    };

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/' style={brandStyle}>Distributed System</MDBNavbarBrand>
                <MDBCollapse navbar>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role='button' style={textStyle}>
                                    P2P
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link href='chord-system'>Chord System</MDBDropdownItem>
                                    <MDBDropdownItem link href='kademlia'>Kademlia</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role='button' style={textStyle}>
                                    CS
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link href='berkeley'>Berkeley</MDBDropdownItem>
                                    <MDBDropdownItem link href='lamports-logical-clocks'>Lamport's Logical
                                        Clocks</MDBDropdownItem>
                                    <MDBDropdownItem link href='vector-clock'>Vector Clock</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role='button' style={textStyle}>
                                    KEM
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link href='diffie-hellman'>Diffie Hellman</MDBDropdownItem>
                                    <MDBDropdownItem link href='crypto-system'>Crypto System</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role='button' style={textStyle}>
                                    SP
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link href='greedy'>Greedy</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Header;
