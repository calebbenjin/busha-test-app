import React from 'react'
import styled from 'styled-components'
import Container from './Container'
import Logo from './Logo'

const NavHeader = () => {
  return (
    <HeaderContainer>
      <Container>
        <Flex>
          <Logo />
          <UserProfile>
            <NameSymblo>O</NameSymblo>
            <Text>Oluwatobi Akindunjoye</Text>
          </UserProfile>
        </Flex>
      </Container>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  padding: 1rem 0;
  width: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;  
`
const NameSymblo = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 33px;
  background: rgba(154, 165, 177, 0.3);
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`

const Text = styled.p`
  font-size: 0.9rem;
`

export default NavHeader