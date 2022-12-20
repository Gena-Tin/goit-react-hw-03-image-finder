import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ toggleModal, children }) => {
  const checkEvent = e => {
    if (e.target !== e.currentTarget) {
      toggleModal({
        status: true,
        src: e.target.dataset.imageurl,
        alt: e.target.alt,
      });
    }
  };
  return (
    <ul className={css.gallery} onClick={checkEvent}>
      {children}
    </ul>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}