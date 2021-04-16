import {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {TextField} from '@material-ui/core'
import api from './api'
import SubmitButton from '../src/components/SubmitButton'

const FormContainer = styled.form`
    width: 30rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const TwoInputsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const Select = styled.select`
    margin: 1rem 0;
    align-self: flex-start;
`

function UserForm() {
    const [cities, setCities] = useState([])
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cep, setCep] = useState('')
    const [cepError, setCepError] = useState({error: false, text: ''})
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [city, setCity] = useState('')

    useEffect(() => {
        const getCities = async () => {
            await api.get('cidades')
            .then((res) => setCities(res.data))
        }
        getCities()
    }, [])

    const cepValidator = async () => {
        await axios.get(`https://viacep.com.br/ws/${cep}/json`)
        .then((res) => {
            setStreet(res.data.logradouro)
            setNeighborhood(res.data.bairro)
            setCepError({error: false, text: ''})
        })
        .catch(() => setCepError({error: true, text: 'CEP inválido!'}))
    }

    const postUser = async (e) => {
        e.preventDefault()
        await api.post('usuario', {
            cpf: cpf,
            email: email,
            endereco: {
                bairro: neighborhood,
                cep: cep,
                cidade: {
                    id: city
                },
                logradouro: street,
                numero: number,
            },
            nomeCompleto: name,
            senha: password,
            telefone: phone,
        })
        .then(() => alert('usuario cadastrado com sucesso'))
        .catch(() => alert('Falha ao cadastrar usuário!'))
    }

    return (
        <FormContainer onSubmit={postUser}>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label='Nome completo'
                variant='outlined'
                size='small'
                type='text'
                margin='normal'
                fullWidth
            />
            <TwoInputsContainer>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label='Email'
                    variant='outlined'
                    size='small'
                    type='email'
                    margin='normal'
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label='Senha'
                    variant='outlined'
                    size='small'
                    type='password'
                    margin='normal'
                />
            </TwoInputsContainer>
            <TextField
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                label='CPF'
                variant='outlined'
                size='small'
                type='number'
                margin='normal'
                fullWidth
            />
            <TwoInputsContainer>   
                <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    label='Telefone'
                    variant='outlined'
                    size='small'
                    type='number'
                    margin='normal'
                />
                <TextField
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={cepValidator}
                    error={cepError.error}
                    helperText={cepError.text}
                    label='CEP'
                    variant='outlined'
                    size='small'
                    type='number'
                    margin='normal'
                />
            </TwoInputsContainer>
            <TwoInputsContainer>
                <TextField
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    label='Rua'
                    variant='outlined'
                    size='small'
                    type='text'
                    margin='normal'
                />
                <TextField
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    label='Número'
                    variant='outlined'
                    size='small'
                    type='number'
                    margin='normal'
                />
            </TwoInputsContainer>
            <TextField
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                label='Bairro'
                variant='outlined'
                size='small'
                type='text'
                margin='normal'
                fullWidth
            />
            <Select onChange={(e) => setCity(e.target.value)}>
                <option defaultChecked>Escolha sua cidade</option>
                {cities.map((city) => {
                    return <option key={city.id} value={city.id}>{city.nome}</option>
                })}
            </Select>
            <SubmitButton type='submit'>Cadastrar Usuário</SubmitButton>
        </FormContainer>
    )
}

export default UserForm
