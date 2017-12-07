import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import classNames from "classnames";
import DashboardColorBlock from "./private/DashboardColorBlock";
import { LoadingInline } from "components";

class HomeStat extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { stat } = this.props;
    if (!stat) {
      return null;
    }

    return (
      <div className="row">
        <DashboardColorBlock
          value={`$${stat.roundup_since_signup.toFixed(2)}`}
          className="bgm-lightgreen"
          title="Total Saved"
          content="This is the total amount that has been rounded up since registering with the app."
        />

        <DashboardColorBlock
          value={`$${stat.monthly_average_roundup.toFixed(2)}`}
          className="bgm-purple"
          title="Monthly Ave Spare Change"
          content="This is the average monthly round ups."
        />

        <DashboardColorBlock
          value={`$${stat.yearly_average_roundup.toFixed(2)}`}
          className="bgm-bluegray"
          title="Yearly Ave Spare Change"
          content="This is the average yearly round ups."
        />
      </div>
    );
  }
}

HomeStat.propTypes = {
  stat: PropTypes.object
};

const mapStateToProps = state => ({
  stat: state.stat
});

export default connect(mapStateToProps, {})(HomeStat);
