import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../util/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const logo = require('../../assets/logo.svg');

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const { user, signIn } = useAuth();
    const { addToast } = useToast();

    console.log(user);

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

                await signIn({
                    email: data.email,
                    password: data.password,
                });

                history.push('/dashboard');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    title: 'error',
                    type: 'error',
                    description: 'Login error, check the data',
                });
            }
        },
        [signIn, addToast, history]
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="gobarberLogo" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Logon</h1>
                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            type="password"
                            icon={FiLock}
                            placeholder="Passowrd"
                        />

                        <Button type="submit">Log-in</Button>
                        <a href="/">Forgot my passowrd</a>
                    </Form>

                    <Link to="signup">
                        <FiLogIn />
                        Sign-Up
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
