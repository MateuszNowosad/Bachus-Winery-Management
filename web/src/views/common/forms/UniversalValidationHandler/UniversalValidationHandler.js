import PropTypes from 'prop-types';

function UniversalValidationHander(dataObject, validationKeys) {
  let dataErrorFields = [];
  let entries = Object.entries(dataObject);
  for (let entry in entries) {
      if(validationKeys[entries[entry][0]] === undefined) continue;
    let test = validationKeys[entries[entry][0]].test(entries[entry][1]);
    if (!test){
      dataErrorFields.push(entries[entry][0]);
    }
  }
  return dataErrorFields;
}

UniversalValidationHander.propTypes = {
  dataObject: PropTypes.object.isRequired
};

export default UniversalValidationHander;
