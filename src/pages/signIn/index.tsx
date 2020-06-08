import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { Form } from '@unform/web';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import getValidationErrors from '../../util/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const logo = require('../../assets/logo.svg');

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useContext(AuthContext);

    formRef.current?.setErrors({});

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail is required')
                        .email('You must enter a valid email'),
                    password: Yup.string().required('Password is required'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        },
        [signIn]
    );

    return (
        <Container>
            <Content>
                <img src={logo} alt="gobarberLogo" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Logon</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input
                        name="password"
                        type="password"
                        icon={FiLock}
                        placeholder="Senha"
                    />

                    <Button type="submit">Log-in</Button>
                    <a href="">Forgot my passowrd</a>
                </Form>

                <Link to="signup">
                    <FiLogIn />
                    Sign-in
                </Link>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
