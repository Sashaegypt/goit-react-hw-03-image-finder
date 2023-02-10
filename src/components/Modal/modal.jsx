import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalDiv } from './modal.style';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component{
    componentWillMount() {
        window.addEventListener('keydown', this.props.onChange);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.props.onChange);
    }

    render() {
        const { onClose, largeImageURL } = this.props;
        return createPortal(
            <Overlay onClick={onClose}>
                <ModalDiv>
                    <img src={largeImageURL} alt="help me" />
                </ModalDiv>
            </Overlay>,
            modalRoot
        );
    };
}

Modal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
