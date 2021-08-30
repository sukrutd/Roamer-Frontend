import React, { useContext, useState } from 'react';
import { AuthContext } from 'Context/AuthContext';
import { Button, Input } from 'Components/FormElements';
import LoadingSpinner from 'Components/LoadingSpinner';
import ErrorModal from 'Components/ErrorModal';
import ImageUpload from 'Components/ImageUpload';
import Card from 'Components/Card';
import { removeFromObjectByKey } from 'Utils';
import * as validators from 'Utils/validators';
import { useHttpClient } from 'Hooks/useHttpClient';
import { useForm } from 'Hooks/useForm';
import './styles.scss';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: { value: '', isValid: false },
            password: { value: '', isValid: false }
        },
        false
    );

    const authSubmitHandler = (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-console
        console.log(formState.inputs);

        if (isLoginMode) {
            sendRequest(
                'http://localhost:5000/api/users/login',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            ).then((data) => auth.login(data.user.id));
        } else {
            sendRequest(
                'http://localhost:5000/api/users/signup',
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            ).then((data) => auth.login(data.user.id));
        }
    };

    const switchMode = () => {
        if (!isLoginMode) {
            setFormData(
                removeFromObjectByKey(formState.inputs, ['name', 'image']),
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: { value: '', isValid: false },
                    image: { value: null, isValid: false }
                },
                false
            );
        }

        setIsLoginMode((previousMode) => !previousMode);
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='auth-section'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2 className='font-weight-normal align-center'>Sign In</h2>
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <>
                            <Input
                                id='name'
                                type='text'
                                label='Name'
                                validators={[validators.VALIDATOR_REQUIRE()]}
                                errorText='Please enter your name.'
                                onInput={inputHandler}
                            />
                            <ImageUpload id='image' onInput={inputHandler} center />
                        </>
                    )}
                    <Input
                        id='email'
                        type='email'
                        label='Email'
                        validators={[validators.VALIDATOR_EMAIL()]}
                        errorText='Please enter a valid email address.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='password'
                        type='password'
                        label='Password'
                        validators={[validators.VALIDATOR_MINLENGTH(6)]}
                        errorText='Password must be at least 6 characters.'
                        onInput={inputHandler}
                    />
                    <div className='align-center'>
                        <Button type='submit' disabled={!formState.formIsValid}>
                            {isLoginMode ? 'SIGN IN' : 'SIGN UP'}
                        </Button>
                    </div>
                </form>
                {isLoginMode ? (
                    <p className='switch-mode'>
                        <span>Don&apos;t have an account?</span>
                        <Button inverse onClick={switchMode}>
                            SIGN UP
                        </Button>
                    </p>
                ) : (
                    <p className='switch-mode'>
                        <span>Already have an account?</span>
                        <Button inverse onClick={switchMode}>
                            SIGN IN
                        </Button>
                    </p>
                )}
            </Card>
        </>
    );
};

export default Auth;
