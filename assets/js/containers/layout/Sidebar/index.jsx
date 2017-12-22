import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";

import MainMenu from "./MainMenu";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user = {} } = this.props;

    return (
      <aside id="sidebar" className="sidebar c-overflow">
        <div className="s-profile">
          <a>
            <div className="sp-pic">
              {user.profile_image_url ? (
                <img src={user.profile_image_url} alt="" />
              ) : (
                <img src="img/demo/profile-pics/1.jpg" alt="" />
              )}
            </div>

            <div className="sp-info">
              {user.first_name} {user.last_name}
            </div>
          </a>
        </div>

        <MainMenu />
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.details
});

export default connect(mapStateToProps, {})(Sidebar);
