import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import autoBind from "react-autobind";
import {
  apiGetRequest,
  navigate,
  login,
  registrationStep4,
  setFormErrors
} from "actions";
import { SETTINGS_LOGIN_URL } from "services/api";
import { Alert, Checkbox, ErrorBlock, Input, Modal } from "components";
import { formToObject } from "services/helpers";
/**
 * js/app.js had method that automatically removes "toggled" class
 * from lc-block and div started to be invisible.
 * Removed this method from app.js
 */
class Registration extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      showModal: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let { user, auth = {} } = nextProps;

    if (auth.step4 === true || (user !== null && !user.registration_step)) {
      this.props.navigate("/");
    }
  }

  componentWillUnmount() {
    this.props.setFormErrors("clear", null);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setFormErrors("clear", null);

    let form = formToObject(e.target);

    this.props.registrationStep4(form);
  }

  showModalWindow(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({ showModal: true });
  }

  hideModalWindow(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({ showModal: false });
  }

  render() {
    const { errors, successMessage, settings } = this.props;
    let { showModal } = this.state;

    return (
      <div className="login-content">
        <div ref="block" className="lc-block toggled">
          <h1
            style={{
              color: "white",
              textShadow: "1px 1px 2px #666"
            }}
          >
            Create a CoinStash Account
          </h1>

          {showModal ? (
            <Modal
              onClickClose={this.hideModalWindow}
              showCloseButton={true}
              visible
              title="SSN"
            >
              <div className="modal-window-terms">
                <div className="modal-window-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
                  eveniet nihil tempore ea ipsum, minus magni dolor. Iure sed
                  expedita, omnis totam ex tempore rerum reprehenderit
                  repellendus similique. Incidunt aliquam est voluptates eveniet
                  atque porro sequi odio voluptatum aut aperiam, eos ipsam nihil
                  officiis, earum totam ad temporibus molestiae quibusdam cum.
                  Dolor nulla inventore itaque, et sequi voluptas nemo amet
                  quisquam, nostrum dolorem totam laudantium dolores. Rem
                  repellendus soluta explicabo, labore excepturi iure
                  consectetur voluptatibus tenetur obcaecati! Corrupti impedit
                  laudantium, in, alias dolore corporis, velit quae natus,
                  voluptatum tenetur nisi. Ab beatae ipsum ea sunt laudantium,
                  culpa odio dolores, assumenda, quos, numquam unde alias totam
                  ullam libero eveniet ratione suscipit possimus debitis fuga
                  explicabo architecto sint aut! Eligendi ipsum quam veniam,
                  ratione qui alias, nemo rerum explicabo debitis temporibus
                  saepe sit accusantium earum dolorum assumenda laudantium
                  corporis excepturi similique, molestiae nostrum. Laboriosam
                  ipsa suscipit voluptatem natus deserunt repudiandae veritatis
                  dolore fuga, tenetur vero recusandae consequuntur modi
                  aliquid, iusto eaque facere vitae molestiae praesentium
                  numquam architecto quo quisquam, quod. Ducimus laudantium ex
                  temporibus nostrum eius, quibusdam possimus neque eveniet,
                  quisquam explicabo officiis assumenda reprehenderit qui
                  inventore, quae nemo magni? Culpa cumque accusamus similique,
                  vero aut praesentium, officia repudiandae minus voluptatibus
                  modi odit consequatur sint corrupti possimus quae atque, ipsum
                  voluptatum dolores recusandae molestiae, eius veniam! Vero
                  laborum, officia esse tempora ipsa. Eius aut aperiam, ratione
                  libero sit doloribus accusantium pariatur eos, officia
                  expedita in natus vitae voluptatem, harum inventore tempora,
                  omnis velit at deleniti quos! Incidunt aliquid similique
                  quidem quisquam amet consectetur ab pariatur itaque dolor quia
                  ratione, placeat, animi, perferendis, fugiat quaerat aliquam.
                  Neque earum illo est facere qui consequuntur. Quaerat eaque
                  numquam omnis perspiciatis harum, praesentium tempore facilis
                  non, totam minus excepturi! Totam in maxime nulla nesciunt
                  aliquid! Consequatur pariatur quos corporis amet quasi unde
                  dignissimos inventore dolor minus.
                </div>
              </div>
            </Modal>
          ) : null}

          <div className="lcb-form">
            <form ref="form" onSubmit={this.onSubmit} target="">
              <div className="input-group m-b-20" style={{ display: "flex" }}>
                <Input
                  name="ssn"
                  type="number"
                  max="9999"
                  wrapperClass="flex-container-full-width"
                  zmdi="zmdi-card"
                  placeholder="Last 4 of Social Security"
                  errors={errors}
                />
                <button
                  onClick={this.showModalWindow}
                  className="btn btn-warning"
                >
                  ?
                </button>
              </div>

              <Input
                name="date_of_birth"
                type="date"
                wrapperClass="input-group m-b-20"
                zmdi="zmdi-calendar"
                placeholder="Date of Birth MM/DD/YYYY"
                errors={errors}
              />

              <button type="submit" className="btn btn-success">
                Continue
              </button>

              {errors && <ErrorBlock errors={errors} />}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
  apiGetRequest: PropTypes.func,
  errors: PropTypes.object,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  navigate: PropTypes.func,
  registration: PropTypes.func,
  setFormErrors: PropTypes.func,
  settings: PropTypes.object,
  successMessage: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user.item,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.formErrors.registrationStep4,
  settings: state.settingsLogin,
  successMessage: state.auth.registrationSuccessMessage
});

export default connect(mapStateToProps, {
  apiGetRequest,
  login,
  navigate,
  registrationStep4,
  setFormErrors
})(Registration);
