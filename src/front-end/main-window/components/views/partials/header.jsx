import React from 'react';
import { connect } from 'react-redux';

const displayName = 'Header';
const propTypes = {
  header: React.PropTypes.object.isRequired
};

class Header extends React.Component {
  render() {
    let refresh = {};
    if (this.props.header.options.action !== null) {
      refresh = <a className="refresh" onClick={ this.props.header.options.action }>R</a>;
    } else {
      refresh = '';
    }

    return (
      <section className="table-header" id="table-header">
        <h2>{ this.props.header.options.title }</h2>
        { refresh }
        <div className="clearfix"></div>
      </section>
    );
  }
}

Header.displayName = displayName;
const mapStateToProps = (state) => {
  return {
    header: state.header
  };
};

const con = connect(mapStateToProps)(Header);
Header.propTypes = propTypes;

export default con;
