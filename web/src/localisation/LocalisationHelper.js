import PropTypes from 'prop-types';

/**
 * @return {string}
 */
function LocalisationHelper(localisationArray, queryField) {
  for (let i = 0; i < localisationArray.length; i++) {
    if (localisationArray[i].hasOwnProperty(queryField)) return localisationArray[i][queryField];
  }
  return 'ErrorLabel';
}

LocalisationHelper.propTypes = {
  localisationArray: PropTypes.array.isRequired,
  queryField: PropTypes.string.isRequired
};

export default LocalisationHelper;
