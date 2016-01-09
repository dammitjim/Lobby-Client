import React from 'react';
import Row from './row';
import { connect } from 'react-redux';

class Table extends React.Component {

  /**
   * render
   */
  render() {
    console.log(this.props.store);
    return (
      <div className="table">
        {
          this.props.store.streams._streams.map((item) => {
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
}

const mapStateToProps = (state) => {
  return {
    store: state
  };
};

const con = connect(mapStateToProps)(Table);

export default con;
