import React from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { formatToCurrency } from '../../lib'

interface IWalletCard {
  data: {
    currency: string,
    imgURL: string,
    name: string,
    balance: string,
  }
}

const WalletCard: React.FC<IWalletCard> = ({data}) => {
  const { name, imgURL, balance, currency } = data

  return (
    <Card>
      <CardHead>
        <img src={imgURL} alt={name} />
        <Text className="text">{name}</Text>
      </CardHead>
      <CardBody>
        {/* {currency === 'NGN' ? <Text>{formatToCurrency(Number(balance))} {currency}</Text> : <Text>{balance} {currency}</Text>}
        <MdKeyboardArrowRight className="arrowBtn" /> */}
      </CardBody>
    </Card>
  )
}

const Card = styled.div`
  border-radius: 6px;
  background: #111111;
  color: #fff;
  height: 150px;
  position: relative;
  box-shadow: 0px 10px 20px rgba(138, 138, 138, 0.5);
`
const CardHead = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  .text {
    margin-left: 1rem;
    text-transform: capitalize !important;
    color: #9AA5B1;
    font-size: 0.8rem;
  }

  img {
    width: 2.2rem;
  }
`

const CardBody = styled.div`
  padding: 1rem;

  .arrowBtn {
    width: 22px;
    height: 22px;
    font-size: 0.5rem;
    background: #303030;
    border-radius: 50%;
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
  }
`
const Text = styled.div`
  color: #fff;
`

export default WalletCard
