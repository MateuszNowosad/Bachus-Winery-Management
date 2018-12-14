import PropTypes from 'prop-types';

function UniversalValidationHandler(dataObject, validationKeys) {
  let dataErrorFields = [];
  let entries = Object.entries(dataObject);
  let test = false;
  for (let entry in entries) {
    if (entries[entry][0] === 'file') {
      if (!(entries[entry][1]['type'] === validationKeys[entries[entry][0]])) test = false;
    } else if (validationKeys[entries[entry][0]] === undefined) {
      continue;
    } else test = validationKeys[entries[entry][0]].test(entries[entry][1]);

    if (!test) {
      dataErrorFields.push(entries[entry][0]);
    }
  }
  return dataErrorFields;
}

UniversalValidationHandler.propTypes = {
  dataObject: PropTypes.object.isRequired
};

export default UniversalValidationHandler;
