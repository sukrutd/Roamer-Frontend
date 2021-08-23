import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE': {
            let formIsValid = true;

            for (const inputId in state.inputs) {
                formIsValid =
                    inputId === action.inputId
                        ? formIsValid && action.isValid
                        : formIsValid && state.inputs[inputId].isValid;
            }

            return {
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                formIsValid
            };
        }

        case 'SET_DATA':
            return { inputs: action.inputs, formIsValid: action.formIsValid };

        default:
            return state;
    }
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        formIsValid: initialFormValidity
    });

    const inputHandler = useCallback(
        (inputId, value, isValid) => {
            dispatch({ type: 'INPUT_CHANGE', inputId, value, isValid });
        },
        [dispatch]
    );

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({ type: 'SET_DATA', inputs: inputData, formIsValid: formValidity });
    }, []);

    return [formState, inputHandler, setFormData];
};
