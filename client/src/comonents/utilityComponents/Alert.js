import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert, index) => (
    <div
      key={alert.id}
      className={`alert alert-${alert.alertType}`}
      style={{ top: `${(index + 1) * 60}px` }}
    >
      {alert.msg}
    </div>
  ));

Alert.prototype = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
