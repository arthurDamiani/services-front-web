import styled from 'styled-components'

const Modal = styled.div`
  position: absolute;
  width: 10rem;
  top: 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  padding: 1rem;

  @media (min-width: 480px) and (max-width: 768px) {
    width: 7rem;
  }
  @media (max-width: 479px) {
    width: 6rem;
    
  }
`

const ModalServiceProviderActions = ({
  openServiceForm,
  openServiceList,
  deleteAccount,
}) => {
  return (
    <Modal>
      <p onClick={openServiceForm}>Cadastrar Serviço</p>
      <p onClick={openServiceList}>Listar Serviços</p>
      <p onClick={deleteAccount}>Deletar conta</p>
    </Modal>
  )
}

export default ModalServiceProviderActions
