import styled from 'styled-components'

const Button = styled.button`
    border: none;
    width: 100%;
    height: 2rem;
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.contrastText};
    border-radius: ${({theme}) => theme.borderRadius};
    align-self: center;

    &:disabled {
        background-color: #696969;
    }
`

export default Button