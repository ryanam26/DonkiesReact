import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import { apiGetRequest, navigate, setFormErrors } from "~Scripts/actions";
import {
  addLender,
  changeUserLender,
  deleteUserLender
} from "~Scripts/actions/lenders";
import formToObject from "~Scripts/utils/formToObject";
import Alert from "~Scripts/components/Alert";
import ErrorBlock from "~Scripts/components/ErrorBlock";
import Loader from "~Scripts/components/Loader";
import InputAutocomplete from "~Scripts/components/InputAutocomplete";
import Input from "~Scripts/components/Input";

class AddLender extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      institutionId: null,
      showSuccess: false,
      editField: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    let { user_lenders = [] } = this.props;

    if (
      user_lenders !== null &&
      nextProps.user_lenders !== null &&
      user_lenders.length < nextProps.user_lenders.length
    ) {
      this.props.navigate("/");
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { institutionId } = this.state;

    const form = formToObject(e.target);
    if (form.account_number === "") {
      this.props.setFormErrors("addLender", {
        account_number: ["Please fill account number"]
      });
      return;
    }

    form.institution_id = institutionId;
    this.props.addLender(form);
    this.refs.form.reset();
    this.setState({ institutionId: null });
  }

  onSuccess(id, value) {
    this.setState({ institutionId: id });
  }

  onFail() {
    this.setState({ institutionId: null });
  }

  /**
   * Institutions suggestions for Autocomplete.
   */
  get suggestions() {
    const { institutions } = this.props;
    let arr = [];
    for (let i of institutions) {
      arr.push({ id: i.id, value: i.name });
    }
    return arr;
  }

  /**
   * Returns institution object by id.
   * id get from state.
   */
  get institution() {
    const { institutions } = this.props;
    const { institutionId } = this.state;
    if (!institutionId) {
      return null;
    }
    return institutions.filter(i => i.id === institutionId)[0];
  }

  changeUserLender(pk, e) {
    let { editField } = this.state;

    let account_number = document.getElementsByName(
      `lender[${pk}].account_number`
    )[0].value;
    this.props.changeUserLender(pk, account_number);

    this.setState({
      editField: {
        ...editField,
        [pk]: false
      }
    });
  }

  deleteUserLender(pk, e) {
    this.props.deleteUserLender(pk);
  }

  makeFieldEditable(pk, e) {
    let { editField } = this.state;
    this.setState({
      editField: {
        ...editField,
        [pk]: true
      }
    });
  }

  render() {
    const { errors, institutions, inProgress, user_lenders = [] } = this.props;
    const { institutionId, showSuccess, editField } = this.state;

    if (!institutions) {
      return <Loader inline />;
    }

    if (showSuccess) {
      return (
        <Alert showClose={false} type="success" value={"Lender created!"} />
      );
    }

    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="form-horizontal">
              <div className="card-header">
                <h2>{"Search for Lender"}</h2>
              </div>

              <div className="card-body card-padding">
                <InputAutocomplete
                  disabled={inProgress}
                  type="text"
                  name="institution"
                  suggestions={this.suggestions}
                  onSuccess={this.onSuccess}
                  onFail={this.onFail}
                  placeholder="Input your bank"
                />

                {institutionId && (
                  <form ref="form" onSubmit={this.onSubmit}>
                    <br />
                    <br />
                    <Input
                      name="account_number"
                      placeholder="Account number"
                      label="Account number"
                      errors={errors}
                    />

                    <div className="add-debt">
                      <div className="bank-name">{this.institution.name}</div>

                      <div className="po-box">{this.institution.box}</div>

                      <div className="bank-address">
                        {this.institution.address}
                      </div>

                      <div className="bank-http-link">
                        <a href={this.institution.link} target="_blank">
                          {this.institution.link}
                        </a>
                      </div>

                      <br />
                      <br />

                      <button
                        className="btn btn-primary waves-effect"
                        type="submit"
                      >
                        Add
                      </button>

                      <ErrorBlock errors={errors} />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="form-horizontal">
              <div className="card-header">
                <h2>{"Your lenders"}</h2>
              </div>

              <div className="card-body card-padding">
                <div className="lender-user-section">
                  {user_lenders !== null && user_lenders.length
                    ? user_lenders.map((bank, index) => (
                        <div key={index} className="lender-user-section-bank">
                          <div>{bank.institution_name}</div>
                          <div className="lender-user-section-bank-input">
                            <Input
                              name={`lender[${bank.pk}].account_number`}
                              placeholder="Account number"
                              wrapperClass=""
                              col2=""
                              value={bank.account_number}
                              errors={errors}
                              disabled={!editField[bank.pk]}
                            />
                            {!editField[bank.pk] ? (
                              <button
                                onClick={this.makeFieldEditable.bind(
                                  this,
                                  bank.pk
                                )}
                                className="btn btn-warning btn-sm waves-effect"
                                type="submit"
                              >
                                Edit
                              </button>
                            ) : (
                              <button
                                onClick={this.changeUserLender.bind(
                                  this,
                                  bank.pk
                                )}
                                className="btn btn-success btn-sm waves-effect"
                                type="submit"
                              >
                                Save
                              </button>
                            )}
                            <button
                              onClick={this.deleteUserLender.bind(
                                this,
                                bank.pk
                              )}
                              className="btn btn-danger btn-sm waves-effect"
                              type="submit"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.formErrors.addLender,
  inProgress: state.accounts.addLenderInProgress,
  institutions: state.institutions.debtInstitutions,
  user_lenders: state.lenders.user_lenders,
  trigger: state.lenders.triggerLenderCreated
});

export default connect(mapStateToProps, {
  apiGetRequest,
  addLender,
  changeUserLender,
  deleteUserLender,
  navigate,
  setFormErrors
})(AddLender);
