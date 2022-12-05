import * as React from 'react';
import styled from 'styled-components'
// import { NavLink } from 'react-router-dom';


const sidebarLinks = [
  "Wallets",
  "Prices",
  "Peer2Peer",
  "Activity",
  "Settings",
];


export default function Sidebar () {
  return (
    
    <SidebarContainer>
    <NavList>
      {sidebarLinks?.map((link, i) => (
        <a href="/" className={i === 0 ? "active navlink" : "navlink"} key={i}>{link}</a>
      ))}
    </NavList>
  </SidebarContainer>

  );
}


const SidebarContainer = styled.nav`
  height: 100vh;
  width: 20%;
  padding-top: 3.5rem;
`
const NavList = styled.nav`
  .navlink {
    display: block;
    line-height: 3rem;
    text-decoration: none;
    color: #3E4C59;
    font-size: 1rem;
    padding: 0 0.6rem;
  }

  .active {
    background: #F5F7FA;
    color: #000;
    border-radius: 3px;
  }
`