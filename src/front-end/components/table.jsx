import React from 'react';
import Row from './row';

const displayName = 'Table';
// TODO propTypes
const propTypes = {
  data: React.PropTypes.array.isRequired
};
class Table extends React.Component {

  /**
   * render
   */
  render() {
    const streams = this.props.data;
    if (streams) {
      return (
        <div className="table">
          {
            streams.map((item) => {
              return (
                <Row
                  key={item.key}
                  channelName={item.channelName}
                  viewers={item.viewers}
                  url={item.url}
                  preview={item.preview}
                  status={item.status}
                  game={item.game}
                  logo={item.logo}
                />
              );
            })
          }
        </div>
      );
    }
    return (
      <h2>Loading...</h2>
    );
  }
}

Table.displayName = displayName;
Table.propTypes = propTypes;

export default Table;

// const mapStateToProps = (state) => {
//   return {
//     store: state
//   };
// };
//
// const con = connect(mapStateToProps)(Table);
//
// export default con;
