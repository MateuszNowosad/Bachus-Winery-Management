import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TreeStyle from '../../assets/jss/common/components/TreeStyle';
import Chip from '@material-ui/core/Chip/Chip';
import ChipExpansionPanel from './ChipExpansionPanel';
import LocalisationHelper from '../../localisation/LocalisationHelper';
import Typography from '@material-ui/core/Typography/Typography';

class Tree extends React.Component {
  parseJSONintoTree(jsonObject, levelCounter) {
    const { labels, hardBreak } = this.props;
    let result = [];
    let partia = false;
    for (let key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        if (Array.isArray(jsonObject[key])) {
          if (jsonObject[key].length !== 0) {
            for (let index in jsonObject[key])
              result.push(this.parseJSONintoTree(jsonObject[key][index], levelCounter + 1));
          }
        } else {
          if (key === hardBreak) {
            partia = true;
          } else if (key === Object.keys(jsonObject)[0]) {
            result.push(
              <Chip
                color="secondary"
                label={LocalisationHelper(labels, key) + ': ' + jsonObject[key]}
                style={{ marginLeft: levelCounter * 50 + 'px' }}
              />
            );
          } else
            result.push(
              <Typography variant="subtitle1" style={{ marginLeft: levelCounter * 50 + 20 + 'px' }} gutterBottom>
                <b>{LocalisationHelper(labels, key) + ': '}</b>
                {jsonObject[key]}
              </Typography>
            );
        }
      }
    }
    if (partia)
      result = (
        <ChipExpansionPanel
          level={levelCounter}
          id={jsonObject['idPartie']}
          label={LocalisationHelper(labels, 'idPartie')}
        >
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
  labels: PropTypes.array.isRequired,
  hardBreak: PropTypes.string.isRequired
};

export default withStyles(TreeStyle)(Tree);
