import axios from 'axios';
import React from 'react';

// Authorization HOC
const Authorization = allowedRoles => WrappedComponent => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      axios({
        method: 'get',
        url: '/usrrole',
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
    }

    render() {
      const { role } = this.state.user;
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <h1>Błąd</h1>;
      }
    }
  };
};
export default Authorization;
