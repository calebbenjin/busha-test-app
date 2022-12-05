import React from 'react'
import styled from 'styled-components'

interface IContainer {
  children: React.ReactChild | React.ReactNode,
  maxWidth?: string
}

const Container: React.FC<IContainer> = ({children, maxWidth}) => {
  return (
    <ContainerWrapper maxWidth={maxWidth}>
      {children}
    </ContainerWrapper>
  )
}

const ContainerWrapper = styled.div.attrs((props: {maxWidth: string}) => props)`
  width: ${(props) => (props.maxWidth ? props.maxWidth :  "80%")};
  margin: 0 auto;
`

export default Container