import React from "react";
import autoBind from "react-autobind";
import { FAQ } from "components";

export default class FAQPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return <FAQ />;
  }
}
