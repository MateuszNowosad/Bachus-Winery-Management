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

axios.defaults.withCredentials = true;
//const dashboard = props => <Link to="/admindashboard" {...props} />; //temporary placeholder

class SignIn extends React.Component {
  state = {
    login: '',
    password: '',
    errors: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    axios.post('/usrauthorization',{
      login: this.state.login,
      password: this.state.password
    }).then(response =>{
      console.log('41, response Mateusz: ', response);
      if(response.data){
        console.log('43, "Success" Mateusz: ', "Success");

      }
    });

    this.setState({ errors: true });
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
                <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange('login')}/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Hasło</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange('password')} />
              </FormControl>
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Zapamiętaj mnie" />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                //component={dashboard} //Deprecated
                onClick={this.handleSubmit}
              >
                Zaloguj się
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(LoginPageStyle)(SignIn);
