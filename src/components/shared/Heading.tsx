import React from 'react'
import styled from 'styled-components'

interface ITitle {
  children: React.ReactNode
}

const Heading: React.FC<ITitle>= ({children}) => {
  return (
    <Title>{children}</Title>
  )
}

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`

export default Heading
