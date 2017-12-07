import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import classNames from "classnames";
import DashboardColorBlock from "./private/DashboardColorBlock";
import { LoadingInline, Modal, Loading } from "components";

class HomeStat extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      showModal: false,
      loader: false
    };
  }

  showModal(e) {
    this.setState({ showModal: true });
  }

  hideModal(e) {
    this.setState({ showModal: false });
  }

  hideModalDelay(e) {
    this.setState({ loader: true });
    setTimeout(() => {
      this.setState({ showModal: false, loader: false });
    }, 2000);
  }

  render() {
    let { showModal, loader } = this.state;
    const { stat } = this.props;

    if (loader) {
      return <Loading />;
    }

    if (!stat) {
      return null;
    }

    return (
      <div className="row">
        {showModal ? (
          <Modal
            onClickClose={this.hideModal}
            showCloseButton={true}
            visible
            title="Refund"
            footer={
              <button
                onClick={this.hideModalDelay}
                className="btn btn-success waves-effect"
              >
                Confirm
              </button>
            }
          >
            Please allow 2 - 3 business days for funds to be reflected in your
            account
          </Modal>
        ) : null}

        <DashboardColorBlock
          value={`$${stat.roundup_since_signup.toFixed(2)}`}
          className="bgm-lightgreen"
          title="Total Saved"
          content="This is the total amount that has been rounded up since registering with the app."
          footer={
            <button
              className="btn btn-default waves-effect"
              style={{ width: 150, margin: "0 auto" }}
              onClick={this.showModal}
            >
              Refund
            </button>
          }
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
