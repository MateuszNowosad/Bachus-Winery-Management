import PropTypes from 'prop-types';

function currentDate(variant) {
  const date = new Date();
  switch (variant) {
    case 'date':
      return date.toISOString().slice(0, 10);
    case 'dateTime':
      return date.toISOString().slice(0, 16);
  }
}

currentDate.propTypes = {
  variant: PropTypes.string.isRequired
};

export default currentDate;
