import React, {useEffect, useState} from 'react';
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
    MDBNavbarToggler,
    MDBIcon,
} from 'mdb-react-ui-kit';
import styled from 'styled-components';

const Header = () => {

    const [showNavExternal, setShowNavExternal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Set your breakpoint
        };

        handleResize(); // Call it initially
        window.addEventListener('resize', handleResize);

        return () => {
            // Clean up the listener when the component unmounts
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Define your dropdown items here
    const p2pItems = [
        {text: 'Chord System', link: 'chord-system'},
        {text: 'Polymorph Polyring', link: 'polymorph-polyring'},
    ];

    const csItems = [
        {text: "Berkeley", link: "berkeley"},
        {text: "Lamport's Logical Clocks", link: "lamports-logical-clocks"},
        {text: "Vector Clock", link: "vector-clock"},
    ];

    const kemItems = [
        {text: "Diffie Hellman", link: "diffie-hellman"},
        {text: "Crypto System", link: "crypto-system"},
    ];

    const spItems = [{text: "Greedy", link: "greedy"}];

    return (
        <div>
            {/* Main Navbar */}
            {!isMobile ? (
                    <MDBNavbar expand='sm' light bgColor='light'>
                        <MDBContainer fluid>
                            <ResponsiveBrand href='/'>Distributed System</ResponsiveBrand>
                            <MDBCollapse navbar>
                                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                                    <Dropdown title='P2P' items={p2pItems}/>
                                    <Dropdown title='CS' items={csItems}/>
                                    <Dropdown title='KEM' items={kemItems}/>
                                    <Dropdown title='SP' items={spItems}/>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>)
                : null
            }

            {/* Hamburger Navbar (conditionally rendered) */}
            {isMobile ? (
                <MDBNavbar light bgColor='light'>
                    <MDBContainer fluid>
                        <ResponsiveBrand href='/'>Distributed System</ResponsiveBrand>
                        <MDBNavbarToggler
                            type='button'
                            data-target='#navbarToggleExternalContent'
                            aria-controls='navbarToggleExternalContent'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                            onClick={() => setShowNavExternal(!showNavExternal)}
                        >
                            <MDBIcon icon='bars' fas/>
                        </MDBNavbarToggler>
                    </MDBContainer>
                </MDBNavbar>
            ) : null}

            {/* Collapsed Content (conditionally rendered) */}
            {isMobile && showNavExternal ? (
                <MDBCollapse show={showNavExternal}>
                    <div className='bg-light p-4'>
                        <div style={collapsedGrid}>
                            {/* Content for collapsed menu */}
                            <CollapsedContent title="P2P" items={p2pItems}/>
                            <CollapsedContent title="CS" items={csItems}/>
                            <CollapsedContent title="KEM" items={kemItems}/>
                            <CollapsedContent title="SP" items={spItems}/>
                        </div>
                    </div>
                </MDBCollapse>
            ) : null}
        </div>
    );
};

export default Header;

const Dropdown = ({title, items}) => (
    <MDBNavbarItem>
        <MDBDropdown>
            <MDBDropdownToggle tag='a' className='nav-link' role='button' style={textStyle}>
                {title}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                {items.map((item) => (
                    <MDBDropdownItem key={item.link} link href={item.link}>
                        {item.text}
                    </MDBDropdownItem>
                ))}
            </MDBDropdownMenu>
        </MDBDropdown>
    </MDBNavbarItem>
);

const CollapsedContent = ({title, items}) => (
    <div>
        <div className="mb-2" style={{fontWeight: 'bold', color: 'black'}}>{title}</div>
        {items.map((item) => (
            <a
                key={item.link}
                className='nav-link'
                href={item.link}
                style={itemStyle}
            >
                {item.text}
            </a>
        ))}
    </div>
);

const textStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'black',
};

const itemStyle = {
    fontSize: '16px',
    color: 'darkgray',
};

const ResponsiveBrand = styled(MDBNavbarBrand)`
  font-weight: bold;
  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const collapsedGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
};
