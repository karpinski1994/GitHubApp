import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      document.getElementById('modal-root'),
    );
  }
}
export default Modal;
