import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from 'Components/Backdrop';
import clsx from 'clsx';
import './styles.scss';

const ModalOverlay = ({ header, footer, children, onSubmit, className }) => {
    const content = (
        <div className={clsx('modal', { [className]: !!className })}>
            <header className='modal__header'>
                <h3>{header}</h3>
            </header>
            <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
                <div className='modal__content'>{children}</div>
                <footer className='modal__footer'>{footer}</footer>
            </form>
        </div>
    );

    return ReactDOM.createPortal(content, document.querySelector('#modal-hook'));
};

const Modal = ({ show, header, footer, onSubmit, onCancel, className, children }) => {
    return (
        <>
            {show && <Backdrop onClick={onCancel} />}
            <CSSTransition in={show} timeout={200} mountOnEnter unmountOnExit classNames='modal'>
                <ModalOverlay
                    header={header}
                    footer={footer}
                    onSubmit={onSubmit}
                    className={className}
                >
                    {children}
                </ModalOverlay>
            </CSSTransition>
        </>
    );
};

export default Modal;
