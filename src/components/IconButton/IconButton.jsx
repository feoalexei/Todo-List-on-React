import './IconButton.scss';

const IconButton = ({ children, onClick, ...allyProps }) => {
  return (
    <button
      type="button"
      className="IconButton"
      onClick={onClick}
      {...allyProps}
    >
      {children}
    </button>
  );
};

// IconButton.defaultProps = {
//   onClick: () => null,
//   children: null,
// };

export default IconButton;
