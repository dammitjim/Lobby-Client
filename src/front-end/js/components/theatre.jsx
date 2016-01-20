import React from 'react';

const displayName = 'Theatre';

class Theatre extends React.Component {
  render() {
    return (
      <div className="theatre">
        <h2>The Theatre</h2>
      </div>
    );
  }
}

Theatre.displayName = displayName;

// Theatre.propTypes = propTypes;

export default Theatre;
