import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Changepin from './Changepin';

const mapStateToProps = (state) => {
  const {
    changepin: {
      error,
      status,
    }
  } = state;

  return {
    error,
    status,
  };
};

@connect(mapStateToProps)
export default class ChangepinContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    error: PropTypes.object,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = Changepin.navigationOptions;

  state = {
    oldpin: null,
    newpin: null,
    validationForced: false
  }
  
  changeOldpin(oldpin) {
    this.setState({oldpin});
  }
  
  changeNewpin(newpin) {
    this.setState({newpin});
  }
  
  changepin() {
    const { oldpin, newpin } = this.state;
    const { dispatch } = this.props;
    
    if (!oldpin || !newpin) {
      this.setState({validationForced: true});
      return;
    }
    
    dispatch({
      type: 'IrmaBridge.Changepin',
      oldpin,
      newpin,
    });
  }

  render() {
    const { oldpin, newpin, validationForced } = this.state;
    const { status, error } = this.props;
  
    return (
      <Changepin 
        changeOldpin = { ::this.changeOldpin }
        changeNewpin = { ::this.changeNewpin }
        oldpin = { oldpin }
        newpin = { newpin }
        status = { status }
        error = { error }
        validationForced = { validationForced }
        changepin = { ::this.changepin }
      />
    );
  }
}
