import React from 'react';
import Autosuggest from 'react-autosuggest';
import { data } from '../../views/common/forms/StaticData';
import { MenuItem, Paper, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : data['data']['contractors'].filter(lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <MenuItem component="div">{suggestion.name}</MenuItem>;

const renderInputComponent = inputProps => {
  return (
    <TextField
      fullWidth
      margin="dense"
      variant={'outlined'}
      inputProps={{
        maxLength: '40'
      }}
      {...inputProps}
    />
  );
};

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class OCAutoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const { classes } = this.props;

    const inputProps = {
      label: 'Nadawca',
      placeholder: 'Nadawca',
      value,
      onChange: this.onChange
    };

    const autosuggestProps = {
      renderInputComponent,
      suggestions: suggestions,
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.onSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <div>
        <Autosuggest
          {...autosuggestProps}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          inputProps={inputProps}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(OCAutoSuggest);
