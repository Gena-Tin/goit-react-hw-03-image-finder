import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick, massage }) => {
  return (
    <button type="button" onClick={onClick} className={css.button}>
      {massage}
    </button>
  );
};

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}
