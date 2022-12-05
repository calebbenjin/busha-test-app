import React from 'react'
import styled from 'styled-components'
import logoImg from '../../assets/logo.svg'

const Logo = () => {
  return (
    <LogoContainer>
      <div data-testid="logo">
        <img src={logoImg} alt="logo" />
      </div>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  img {
    width: 100px;
  }
`

export default Logo