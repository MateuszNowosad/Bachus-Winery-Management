import PropTypes from 'prop-types';

function UniversalSubmitHander(mutation, dataObject) {
  console.log('4, dataObject jakub: ', dataObject);
  mutation({ variables: dataObject });
}

UniversalSubmitHander.propTypes = {
  dataObject: PropTypes.object.isRequired
};

export default UniversalSubmitHander;
