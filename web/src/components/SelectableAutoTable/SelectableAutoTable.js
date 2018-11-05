import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import AutoLabels from '../AutoTable/AutoLabels';
import SelectableAutoContent from './SelectableAutoContent';
import AutoTableStyle from '../../assets/jss/common/components/AutoTableStyle.js';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase/InputBase';
import TextField from '@material-ui/core/TextField';
import LabelGenerator from '../AutoTable/LabelGenerator';

class SelectableAutoTable extends React.Component {
  state = {
    querySize: 100,
    open: false,
    selected: this.props.id
  };

  handleChange = event => {
    if (event.target.value >= 0)
      this.setState({
        querySize: event.target.value
      });
    if (event.target.value > 5000) {
      this.setState({
        querySize: 5000
      });
    }
  };

  handleRowClick = row => {
    this.props.onSelect(row);
    this.props.onClose();
  };

  render() {
    const { classes, queryData, querySubject, labelsArr } = this.props;
    const { querySize, selected } = this.state;

    return (
      <div>
        <div className={classes.actions}>
          <TextField
            id="querySize"
            label="Ile wierszy na stronę"
            value={querySize}
            onChange={this.handleChange}
            type="number"
            className={classes.textField}
            margin="normal"
          />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Wyszukaj…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            {labelsArr !== undefined ? (
              <LabelGenerator labelsArr={labelsArr} editMode={false} />
            ) : (
              <AutoLabels queryData={queryData} querySubject={querySubject} editMode={false} />
            )}
            <SelectableAutoContent
              queryData={queryData}
              querySubject={querySubject}
              selected={selected}
              onClick={this.handleRowClick}
            />
          </Table>
        </Paper>
      </div>
    );
  }
}

SelectableAutoTable.propTypes = {
  classes: PropTypes.object.isRequired,
  queryData: PropTypes.object.isRequired,
  querySubject: PropTypes.string.isRequired,
  dialogFormTitle: PropTypes.string,
  dialogForm: PropTypes.object,
  labelsArr: PropTypes.array
};

export default withStyles(AutoTableStyle)(SelectableAutoTable);
