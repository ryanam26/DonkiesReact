import React, { Component } from "react";
import classNames from "classnames";

/**
 * onClickClose - passed from parent (show/hide controls from parent).
 * footer - additional node to footer.
 */
class Modal extends Component {
  static get defaultProps() {
    return {
      footer: null,
      showCloseButton: true
    };
  }

  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose() {
    this.props.onClickClose();
  }

  render() {
    const { children, footer, title, visible, showCloseButton } = this.props;
    const {
      contentClassNames = "",
      headerTitleClassNames = "",
      buttonClassNames = ""
    } = this.props;

    let style = visible
      ? { display: "block", paddingRight: "15px" }
      : { display: "none" };

    let cn = classNames("modal fade", { in: visible });
    let mcc = classNames(contentClassNames, "modal-content");
    let htc = classNames(headerTitleClassNames, "modal-title");
    let bc = classNames(buttonClassNames, "btn btn-link waves-effect");

    let modalBodyStyle = {
      maxHeight: "80%"
      // overflowY: "scroll"
    };

    return (
      <div className={cn} style={style}>
        <div className="modal-dialog" style={modalBodyStyle}>
          <div className={mcc}>
            <div className="modal-header">
              <h4 className={htc}>{title}</h4>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {footer}

              {showCloseButton && (
                <button
                  onClick={this.onClickClose}
                  type="button"
                  className={bc}
                  data-dismiss="modal"
                >
                  {"Close"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
