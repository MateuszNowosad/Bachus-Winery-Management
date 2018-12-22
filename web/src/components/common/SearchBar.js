import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase/InputBase';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchBarStyle from '../../assets/jss/common/components/SearchBarStyle';

class SearchBar extends React.Component {
  handleChange = event => {
    this.props.onChange(event.target.value);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Wyszukaj…"
            onChange={this.handleChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(SearchBarStyle)(SearchBar);
