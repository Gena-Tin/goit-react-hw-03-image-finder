import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images }) =>
  images.map(({ id, webformatURL, tags }) => (
    <li key={id} className={css.galleryItem}>
      <img className={css.image} src={webformatURL} alt={tags} />
    </li>
  ));
export default ImageGalleryItem;
