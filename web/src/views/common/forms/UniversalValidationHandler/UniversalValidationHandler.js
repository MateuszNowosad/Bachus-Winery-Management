import PropTypes from 'prop-types';

function UniversalValidationHandler(dataObject, validationKeys) {
  return Object.keys(dataObject).filter(element => {
    if (!validationKeys.hasOwnProperty(element)) {
      return false;
    } else if (element === 'file') {
      if (!(dataObject.element['type'] === validationKeys[element])) return false;
    } else{
      return !(validationKeys[element].test(dataObject[element]));
    }
  });
}

UniversalValidationHandler.propTypes = {
  dataObject: PropTypes.object.isRequired
};

export default UniversalValidationHandler;
