import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.checkEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.checkEvent);
  }

  checkEvent = e => {
    if (e.key === 'Escape' || e.target === e.currentTarget) {
      this.props.toggleModal({ status: false });
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.checkEvent}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;


Modal.propTypes = {
  src:  PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}