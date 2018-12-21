import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import LoginPageStyle from '../assets/jss/common/views/LoginPageStyle.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { selectUpsertForForm } from '../mutations/FormMutations/selectUpsertForForm';
import { Mutation } from 'react-apollo';
import { userLogged } from '../mutations/userLogged';

//const dashboard = props => <Link to="/admindashboard" {...props} />; //temporary placeholder

class SignIn extends React.Component {
  state = {
    login: '',
    password: '',
    error: false,
    isAuthenticated: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = (mutate) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/usrauthorization',
      data: {
        login: this.state.login,
        password: this.state.password
      },
      withCredentials: true
    }).then(response => {
      console.log('41, response Mateusz: ', response);
      if (response.data) {
        console.log('43, "Success" Mateusz: ', 'Success');
        mutate({variables: {userId: response.data.userId}});
        this.setState({ error: false, isAuthenticated: true });
        this.props.isAuthenticated();
      } else {
        console.log('45, "Error" Mateusz: ', 'Error');
        this.setState({ error: true });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Logowanie
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange('login')}
                  error={this.state.error}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Hasło</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange('password')}
                  error={this.state.error}
                />
              </FormControl>
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Zapamiętaj mnie" />
              <Mutation
                mutation={userLogged}
              >
                {mutate => <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  //component={dashboard} //Deprecated
                  onClick={() => this.handleSubmit(mutate)}
                >
                  Zaloguj się
                </Button>
                }
              </Mutation>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.func.isRequired
};

export default withStyles(LoginPageStyle)(SignIn);
