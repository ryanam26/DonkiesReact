import React, { Component } from "react";
import classNames from "classnames";

class TableSimple extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const tableClassName = data.className || "table table-inner table-vmiddle";

    return (
      <div className="table-responsive">
        <table id={data.id} className={tableClassName}>
          {data.header !== null && (
            <thead>
              <tr>
                {data.header.map((name, index) => {
                  return <th key={index}>{name}</th>;
                })}
              </tr>
            </thead>
          )}

          <tbody>
            {data.rows.map((row, index) => {
              const f = row.onClick ? row.onClick.bind(null, row.params) : null;

              return (
                <tr key={index} className={row.className} onClick={f}>
                  {row.cols.map((col, index) => {
                    let colspan = col.colspan ? col.colspan : 1;

                    const f = col.onClick
                      ? col.onClick.bind(null, col.params)
                      : null;

                    return (
                      <td
                        colSpan={colspan}
                        key={index}
                        className={col.className}
                        onClick={f}
                      >
                        {col.value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableSimple;
