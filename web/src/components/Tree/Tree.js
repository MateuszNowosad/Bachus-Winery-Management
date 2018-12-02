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
          if (key === 'idPartie') partia = true;
          if (key === 'idOperacja')
            result.push(
              <Chip color="secondary" label={'Operacje na parii'} style={{ marginLeft: levelCounter * 50 + 'px' }} />
            );
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
        {this.parseJSONintoTree(JSON.parse(this.props.queryData)['data']['Partie'][0], 0)}
      </div>
    );
  }
}

Tree.propTypes = {
  queryData: PropTypes.string.isRequired
};

export default withStyles(TreeStyle)(Tree);
