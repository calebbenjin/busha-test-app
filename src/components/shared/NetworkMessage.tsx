import styled from 'styled-components'
import errorImg from '../../assets/errorimg.png'
import Loader from './Loader'

interface IErrorProps {
  onClick: () => Promise<void>,
  loading: boolean | null,
}

const NetworkErrorMessage = ({onClick, loading}: IErrorProps) => {

  return (
    <ErrorCardWrapper>
      <img src={errorImg} alt="ErrorImage" />
      <p>Network Error</p>
      <Button onClick={onClick}>{loading ? <Loader size={15} aria-label="Loading..."  /> : 'Try again'}</Button>
    </ErrorCardWrapper>
  )
}

const ErrorCardWrapper = styled.div`
  width: 50%;
  margin: 8rem auto 0 auto;
  padding: 2rem;
  text-align: center;
`

const Button = styled.button`
  border: transparent;
  background: #000;
  padding: 1.2em 4rem;
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }
`

export default NetworkErrorMessage