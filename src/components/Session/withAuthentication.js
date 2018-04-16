import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { firebase, auth, db } from "../../firebase";
import * as routes from "../../constants/routes";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      const { history } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          auth.doGetRedirectResult()
          this.setState(() => ({ authUser }));
          history.push(routes.ACCOUNT);
        } else {
          this.setState(() => ({ authUser: null }));

          history.push(routes.LANDING);
        }
      });
    }
    render() {
      const authUser = this.state.authUser;
      return authUser ? (
        <Component {...this.props} authUser={authUser} />
      ) : (
        <Component {...this.props} />
      );
    }
  }

  WithAuthentication.propTypes = {
    authUser: PropTypes.object
  };

  return withRouter(WithAuthentication);
};

export default withAuthentication;
