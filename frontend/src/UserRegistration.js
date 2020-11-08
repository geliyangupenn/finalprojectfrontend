import React from 'react';

import styled from 'styled-components';

import history from './history';

import { withRouter } from 'react-router-dom';

class UserRegistration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirm: false,
            username: "",
            password: ""
        }
    }

    checkValid = (password) => {
        if (password.length < 10) {
            return false
        }
    }

    register = () => {
        if (this.nameinput && this.passwordinput) {
            alert(`USERNAME: ${this.nameinput.value} PASSWORD: ${this.passwordinput.value} REGDATE: ${new Date()}`)

            if (this.checkValid(this.passwordinput.value)) {
                this.setState({
                    username: this.nameinput.value,
                    password: this.passwordinput.value,
                    registrationDate: new Date(),
                    confirm: true
                });
            } else {
                alert("PASSWORD NOT CORRECT")
            }
        }
    }

    renderConfirmation = () => {
        const { history } = this.props;
        return (
            <>
                <Header>
                    User Registration
                </Header>
                <Button onClick = {() => history.push('/login')}>
                    Confirm Registration
                </Button>
            </>
        )
    }


    renderForm = () => {
        return (
            <>
                <Header>
                    User Registration
                </Header>
                <Form>
                    <FormHeader >Username</FormHeader>
                    <StyledInput 
                        ref = {node => this.nameinput = node}
                        placeholder = {"Enter Username"}
                    />
                </Form>
                <Form>
                    <FormHeader>Password</FormHeader>
                    <StyledInput 
                        type = {"password"}
                        ref = {node => this.passwordinput = node}
                        placeholder = {"Enter Password"}
                    />
                </Form>
                <Bottom>
                    <Button onClick = {this.register}>
                        Register
                    </Button>
                </Bottom>
            </>
        )
    }

    render(){
        const { confirm } = this.state;
        return (
            <Background>
                <Container>
                    {confirm ? this.renderConfirmation() : this.renderForm()}
                </Container>
            </Background>
           
        )
    }
}

export default  withRouter(UserRegistration);

const Bottom = styled.div`
    display: flex;
    align-items: center;
    height: 5rem;
    width: 100%;
`

const Button = styled.div`
    display: inline-flex;
    padding: 0.8rem 0.75rem;
    box-shadow: rgba(9, 30, 66, 0.31) 0px 0px 1px 0px, rgba(9, 30, 66, 0.25) 0px 5px 10px -5px;
    margin-left: auto;
    background-color:#3498db;
    border-radius: 0.2rem;
    font-weight: 500;
    color: white;
    font-size: 1rem;
    cursor: pointer;
`

const StyledInput = styled.input`
    outline: none;
    background-color: #f7f9fb;
    height: 2rem;
    width: 20rem;
    border: none;
    margin-top: 0.5rem;
    border-radius: 0.3rem;
    border: 1px solid #E0E4E7;
    &::placeholder {
        color: #172A4E;
        opacity: 0.7;
    }
    padding: 0rem 1rem;
`

const Form = styled.div`
    margin-bottom: 1rem;
`

const FormHeader = styled.div`
    font-weight: 500;
    font-size: 0.9rem;
`

const Container = styled.div`
    width: 60vw;
    border: 1px solid #E0E4E7;
    border-radius: 0.5rem;
    margin-top: -10rem;
    padding: 3rem;
    color: #172A4E;
`

const Background = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Header = styled.div`
    height: 5rem;
    font-weight: 500;
    font-size: 1.8rem;
    font-family: -apple-system,BlinkMacSystemFont, sans-serif;
`