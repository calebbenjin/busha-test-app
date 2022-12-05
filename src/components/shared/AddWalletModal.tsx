import { useState, useEffect, SetStateAction } from 'react'
import styled from 'styled-components'
import Modal from './Modal';
import { IoClose } from 'react-icons/io5'
// import Button from './Button';
import Loader from './Loader';
import NetworkMessage from './NetworkMessage';

export interface ItemProps {
  name: string,
  currency: string,
  id: string
}

type ModalProsType = {
  isOpen: boolean,
  closeModal: any;
  data: {}
}


export default function AddWalletModal ({isOpen, closeModal, data}: ModalProsType) {

  console.log(data)

  const [wallets, setWallets] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const handleCloseModal = () => {
    closeModal(false)
  }

  useEffect(() => {
    // getAllWallets()

    // eslint-disable-next-line
  },[])

  const handleTryAgain = async () => {
    // getAllWallets()
  }
  
  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setWallets(e.target.value)
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    // createWallet(wallets)
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalWrapper>
        <IoClose className="closeModalBtn" onClick={handleCloseModal}  />
        <ModalContainer>
          {loading ? <Wrapper><Loader size={70} width={6} /></Wrapper> : errorMessage ? <Wrapper><NetworkMessage onClick={handleTryAgain} loading={loading} /></Wrapper> : 
          <ModalBody>
            <Title>Add new wallet</Title>
            <Text>The crypto wallet will be created instantly and be available in your list of wallets.</Text>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="select">Select wallet</Label>
              <SelectController>
                <Select onChange={handleChange}>
                  {/* {allWalletData?.map((item: ItemProps, i: number) => (
                    <option value={item?.currency} key={i}>{item?.name}</option>
                  ))} */}
                </Select>
              </SelectController>
              <FormControl>
                {/* <Button>Create wallet</Button> */}
              </FormControl>
            </Form>
          </ModalBody>
          }
        </ModalContainer>
      </ModalWrapper>
    </Modal>
  );
}

const ModalContainer = styled.div`
  height: 100vh;
`

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalBody = styled.div`
  padding: 1.5rem 2rem;
`
const Title = styled.h3`
  color: #000;
  font-size: 1rem;
`
const Text = styled.p`
  margin-top: 2rem;
  color: #3E4C59;
  font-weight: 500;
  font-size: 1.2rem;
`
const Form = styled.form`
  margin-top: 2rem;
`

const FormControl = styled.div`
  text-align: center;
  margin-top: 2rem;
`

const Label = styled.label`
  color: #3E4C59;
  font-weight: 500;
  text-align: left;
`

const SelectController = styled.div`
  padding-right: 0.5rem;
  border: solid 1px #CBD2D9;
  border-radius: 5px;
  margin-top: 0.5rem;
  width: 100%
  
`
const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 5px;
  font-size: 1.2rem;
  
  option {
    font-size: 1.2rem;
  }
`

const ModalWrapper = styled.div`
  padding: 1rem;
  position: relative;

  .closeModalBtn {
    font-size: 2rem;
    position: absolute;
    top: 2.5rem;
    right: 2rem;
  }
`
