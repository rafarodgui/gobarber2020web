import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import getValidationErrors from '../../util/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const logo = require('../../assets/logo.svg');

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    formRef.current?.setErrors({});

    const handleSubmit = useCallback(async (data: object) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string()
                    .required('E-mail is required')
                    .email('You must enter a valid email'),
                password: Yup.string().min(
                    6,
                    'You must type at least 6 caracters'
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Background />
            <Content>
                <img src={logo} alt="logo" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Create an account</h1>

                    <Input icon={FiUser} name="name" placeholder="Name" />
                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />

                    <Button type="submit"> Sign-up </Button>
                </Form>

                <Link to="/">
                    <FiArrowLeft />I already have an account
                </Link>
            </Content>
        </Container>
    );
};

export default SignUp;
