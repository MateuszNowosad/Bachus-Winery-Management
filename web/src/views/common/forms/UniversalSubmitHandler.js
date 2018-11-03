import PropTypes from 'prop-types';


function UniversalSubmitHander(dataObject) {
    console.log('29, object Mateusz: ', dataObject);
    return dataObject;
}

UniversalSubmitHander.propTypes = {
    dataObject: PropTypes.object.isRequired,
};

export default UniversalSubmitHander;