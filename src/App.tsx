import { useState, useEffect } from 'react'
import Loader from './components/shared/Loader';
import styled from 'styled-components'
import Sidebar from './components/shared/Sidebar';
import NetworkErrorMessage from './components/shared/NetworkMessage';
import NavHeader from './components/shared/NavHeader';
import Container from './components/shared/Container';
import { formatToCurrency } from './lib'
import Heading from './components/shared/Heading';
import Modal from './components/shared/Modal';
import { IoClose } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'


const BASE_URL = process.env.BASE_URL || "http://localhost:3090";

function App() {
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modalLoader, setModalLoader] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [wallets, setWallets] = useState([])
  const [currencyType, setCurrencyType] = useState([])
  const [errorMessage, setErrorMessage] = useState(false)
  const [networkError, setNetworkError] = useState(false)
  const [walletError, setWalletError] = useState(false)
  const [openModal, setOpenModal] = useState(false)


  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal;

    (async () => {
      setLoading(true)
      fetch(`${BASE_URL}/accounts`, {
        signal,
      }).then((response) => {
        if(response.statusText === "OK" && response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            throw new Error("Network error")
        }
      }).then((data) => {
        setLoading(false)
        setAccounts(data)
      }).catch((error) => {
        setLoading(false)
        setErrorMessage(true);
      });
    })();

    return () => controller.abort();
  }, [])


  const tryAccountRefresh = async () => {
    setLoading(true)
    fetch(`${BASE_URL}/accounts`).then((response) => {
      if(response.statusText === "OK" && response.status >= 200 && response.status < 300) {
          return response.json()
      } else {
          throw new Error("Network error")
      }
    }).then((json) => {
      setLoading(false)
      setAccounts(json)
    }).catch((error) => {
      setLoading(false)
      setErrorMessage(true);
    });
  }

  const handleAddWallet = async () => {
    const controller = new AbortController()
    const signal = controller.signal;
    setModalLoader(true)
    setOpenModal(true)
    fetch(`${BASE_URL}/wallets`, {signal}).then((response) => {
      if(response.statusText === "OK" && response.status >= 200 && response.status < 300) {
          return response.json()
      } else {
          throw new Error("Network error")
      }
    }).then((json) => {
      setModalLoader(false)
      setWallets(json)
    }).catch((error) => {
      setModalLoader(false)
      setWalletError(true);
    });
  }

  const handleChange = (e: any) => {
    setCurrencyType(e.target.value)
  }

  const createWallets = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/accounts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({currency: currencyType})
      })

      if(res.ok) {
        setOpenModal(false)
        tryAccountRefresh()
        setIsLoading(false)
      } else {
        setNetworkError(true)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setNetworkError(true)
    }
  }
  
  return <LayoutContainer>
    <Modal isOpen={openModal}>
      <ModalWrapper>
        <IoClose className="closeModalBtn" onClick={() => setOpenModal(false)}  />
        <ModalContainer>
        {modalLoader ? <LoaderWrapper><Loader size={50} aria-label="Loading..." /></LoaderWrapper> : walletError ? (<NetworkErrorMessage loading={modalLoader} onClick={handleAddWallet} />) : 
        <ModalBody>
          <Title>Add new wallet</Title>
          <Text>The crypto wallet will be created instantly and be available in your list of wallets.</Text>
          <form onSubmit={createWallets}>
            <Label htmlFor="select">Select wallet</Label>
            <SelectController>
              <Select onChange={handleChange}>
                {wallets?.map((item: any, i: number) => (
                  <option value={item?.currency} key={i}>{item?.name}</option>
                ))}
              </Select>
            </SelectController>
            <FormControl>
              <Button>{isLoading ? <Loader size={8} aria-label="Loading..." /> : "Create wallet"}</Button>
            </FormControl>
            {networkError && <div>Network error</div>}
          </form>
        </ModalBody>
        }
        </ModalContainer>
      </ModalWrapper>
    </Modal>
    <NavHeader />
    <Container>
      <Flex>
        <Sidebar />
        <main>
          <FlexHeading>
            <Heading>Wallet</Heading>
            <AddWalletButton onClick={handleAddWallet}>Add new wallet</AddWalletButton>
          </FlexHeading>
          {loading ? <LoaderWrapper><Loader size={60} aria-label="Loading..." /></LoaderWrapper> : errorMessage ? <NetworkErrorMessage loading={loading} onClick={tryAccountRefresh} /> : <CardWrapper>
            {accounts.map((account) => {
              const { id, name, balance, currency, imgURL } = account
              return (
                <Card key={id}>
                  <CardHead>
                    <img src={imgURL} alt={name} />
                    <p className="text">{name}</p>
                  </CardHead>
                  <CardBody>
                    {currency === 'NGN' ? <p>{formatToCurrency(Number(balance))} {currency}</p> : <p>{balance} {currency}</p>}
                    <MdKeyboardArrowRight className="arrowBtn" />
                  </CardBody>
                </Card>    
              )
            })}
          </CardWrapper>};
        </main>
      </Flex>
    </Container>
  </LayoutContainer>
}


const LayoutContainer = styled.div`
  height: 100vh;
  overflow: hidden;

  main {
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding: 1rem 0 0 4rem;
  }
`

const Flex = styled.div`
  display: flex;
`

const ModalBody = styled.div`
  padding: 1.5rem 2rem;
`

const FlexHeading = styled.div`
  border-bottom: solid 1px #cccc;
  padding-bottom: 0.6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-top: 2rem;
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

const ModalContainer = styled.div`
  height: 100vh;

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

const AddWalletButton = styled.button`
  padding: 0.6rem 1rem;
  background: #fff;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.5s linear; 
  span {
    font-size: 1rem;
    font-weight: 600;
  }

  &:hover {
    background: #F5F7FA;
  }
`

const CardBody = styled.div`
  padding: 0rem 1rem;

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

const LoaderWrapper = styled.div`
  margin: 10rem auto 0 auto;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default App;
