import React, { Component } from "react";
import { Link } from "react-router-dom";
import autoBind from "react-autobind";
import classNames from "classnames";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      activeUrl: null
    };
  }

  getMenu() {
    return [
      {
        url: "/",
        name: "Dashboard",
        className: ""
        // className: "zmdi-home"
      },
      {
        url: "/user_profile",
        name: "Profile",
        className: ""
        // className: "zmdi-male"
      },
      {
        url: "/accounts",
        name: "Bank Account",
        className: ""
        // className: "zmdi-assignment-account"
      },
      {
        url: "/add_lender",
        name: "Lenders",
        className: ""
        // className: "zmdi-money"
      },
      {
        url: "/loan_calculator",
        name: "Calculator",
        className: ""
        // className: "zmdi-money"
      },
      // { url: "/settings", name: "Settings", className: "zmdi-settings" }
      {
        url: "/faq",
        name: "FAQ & Support"
        // className: "zmdi-assignment-account"
      }
    ];
  }

  onClick(url) {
    this.setState({ activeUrl: url });
  }

  render() {
    const { activeUrl } = this.state;

    return (
      <ul className="main-menu">
        {this.getMenu().map((obj, index) => {
          const cnActive = classNames({ active: activeUrl === obj.url });
          const cnZmdi = classNames("zmdi", obj.className);

          return (
            <li key={index} className={cnActive}>
              <Link onClick={this.onClick.bind(null, obj.url)} to={obj.url}>
                <i className={cnZmdi} /> {obj.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}
