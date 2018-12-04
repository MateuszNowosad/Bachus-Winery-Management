import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase/InputBase';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchBarStyle from '../../assets/jss/common/components/SearchBarStyle';

function SearchBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
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
  );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(SearchBarStyle)(SearchBar);
