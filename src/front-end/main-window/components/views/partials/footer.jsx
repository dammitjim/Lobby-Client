import React from 'react';
import Electron from 'electron';
import { connect } from 'react-redux';

const ipcRenderer = Electron.ipcRenderer;

const displayName = 'Footer';
const propTypes = {
  header: React.PropTypes.object.isRequired
};

class Footer extends React.Component {

  constructor() {
    super();
    this.openLink = this.openLink.bind(this);
  }

  openLink() {
    ipcRenderer.send('open-browser', this.props.header.options.out.url);
  }

  render() {
    let refresh = '';
    if (this.props.header.options.action !== null) {
      let classes = 'fa fa-refresh';
      if (this.props.header.loader.loading === true) {
        classes += ' fa-spin fa-fw';
      }
      refresh = <a className="refresh" onClick={ this.props.header.options.action }><i className={ classes }></i></a>;
    }

    let linkOut = '';
    if (this.props.header.options.out) {
      if (this.props.header.options.out.url !== null) {
        linkOut = <a className="link-out" onClick={ this.openLink }><i className="fa fa-external-link"></i></a>;
      }
    }

    return (
      <footer>
        { refresh }
        { linkOut }
      </footer>
    );
  }
}

Footer.displayName = displayName;
const mapStateToProps = (state) => {
  return {
    header: state.header
  };
};

const con = connect(mapStateToProps)(Footer);
Footer.propTypes = propTypes;

export default con;
