import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TreeStyle from '../../assets/jss/common/components/TreeStyle';
import Chip from '@material-ui/core/Chip/Chip';
import ChipExpansionPanel from './ChipExpansionPanel';

class Tree extends React.Component {
  parseJSONintoTree(jsonObject, levelCounter) {
    let result = [];
    let partia = false;
    for (let key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        if (Array.isArray(jsonObject[key]) && jsonObject[key].length !== 0) {
          for (let index in jsonObject[key])
            result.push(this.parseJSONintoTree(jsonObject[key][index], levelCounter + 1));
        } else {
          if (key === 'idPartie') {
            partia = true;
          } else if (key === 'idOperacja') {
            result.push(
              <Chip
                color="secondary"
                label={'Operacje o ID: ' + jsonObject[key]}
                style={{ marginLeft: levelCounter * 50 + 'px' }}
              />
            );
          } else
            result.push(
              <Chip
                color="primary"
                variant="outlined"
                label={key + ' = ' + jsonObject[key]}
                style={{ marginLeft: levelCounter * 50 + 'px' }}
              />
            );
        }
      }
    }
    if (partia)
      result = (
        <ChipExpansionPanel level={levelCounter} id={jsonObject['idPartie']}>
          {result}
        </ChipExpansionPanel>
      );

    return result;
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexBasis: 'auto' }}>
        {this.parseJSONintoTree(this.props.queryData, 0)}
      </div>
    );
  }
}

Tree.propTypes = {
  queryData: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired
};

export default withStyles(TreeStyle)(Tree);
