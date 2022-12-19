import css from './ImageGallery.module.css';

const ImageGallery = ({ children }) => (
  <ul className={css.gallery}>
      {children}
  </ul>
);

export default ImageGallery;
