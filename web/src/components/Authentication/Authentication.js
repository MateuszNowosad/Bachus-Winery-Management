import axios from 'axios';
import React from 'react';

// Authorization HOC
const Authorization = allowedRoles => WrappedComponent => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      new Promise(async resolve => {
        await axios({
          method: 'get',
          url: 'http://localhost:8080/usrrole',
          withCredentials: true
        }).then(response => {
          console.log('41, response Mateusz: ', response);
          if (response.data) {
            console.log('43, "Success" Mateusz: ', 'Success');
            this.state = {
              user: {
                role: response.data.role
              }
            };
            this.setState({ error: false });
          } else {
            console.log('45, "Error" Mateusz: ', 'Error');
            this.setState({ error: true });
          }
        });
        resolve();
      });
    }

    render() {
      const { role } = this.state.user;
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <h1>No page for you!</h1>;
      }
    }
  };
};
export default Authorization;
