import PropTypes from 'prop-types';

function UniversalSubmitHander(mutation, dataObject) {
  mutation({ variables: dataObject });
}

UniversalSubmitHander.propTypes = {
  dataObject: PropTypes.object.isRequired
};

export default UniversalSubmitHander;
