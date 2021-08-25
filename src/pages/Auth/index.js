import React, { useContext, useState } from 'react';
import { AuthContext } from 'Context/AuthContext';
import Card from 'Components/Card';
import { Button, Input } from 'Components/FormElements';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from 'Utils/validators';
import { removeFromObjectByKey } from 'Utils';
import { useForm } from 'Hooks/useForm';
import './styles.scss';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);

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

        auth.login();
    };

    const switchMode = () => {
        if (!isLoginMode) {
            setFormData(
                removeFromObjectByKey(formState.inputs, 'name'),
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData({ ...formState.inputs, name: { value: '', isValid: false } }, false);
        }

        setIsLoginMode((previousMode) => !previousMode);
    };

    return (
        <Card className='auth-section'>
            <h2 className='font-weight-normal align-center'>Sign In</h2>
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        id='name'
                        type='text'
                        label='Name'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter your name.'
                        onInput={inputHandler}
                    />
                )}
                <Input
                    id='email'
                    type='email'
                    label='Email'
                    validators={[VALIDATOR_EMAIL()]}
                    errorText='Please enter a valid email address.'
                    onInput={inputHandler}
                />
                <Input
                    id='password'
                    type='password'
                    label='Password'
                    validators={[VALIDATOR_MINLENGTH(6)]}
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
    );
};

export default Auth;
