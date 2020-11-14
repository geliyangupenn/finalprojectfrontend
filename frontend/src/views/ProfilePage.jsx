import React from 'react';
import PropTypes from 'prop-types';
import './ProfilePage.css';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationDate: '',
      message: '',
    }
    this.passwordChangeInput = React.createRef();
  }

  componentDidMount() {
    // Get registration date from backend
    this.setState({
      registrationDate: '11/08/2020',
    }); 
  }


  changePassword() {
    // Send new password to database!
    this.passwordChangeInput.current.value = '';
    this.setState({
      message: 'Updated Password!',
    })
  }

  handleKeypress(evt) {
    if (evt.key === 'Enter') {
      this.changePassword();
    }
  }

  deactivateAccount() {
    // Remove Account in backend
    // Go to Login Page
  }

  render() {
    const { username } = this.props;
    const { registrationDate, message } = this.state;
    return [
      <h1 key={0} id="pageTitle" style={{ textAlign: 'center' }}>User Profile Page</h1>,
      <div key={1} > 
        {message !== '' ? (
          <div id="messageDiv" style={{ margin: 'auto', textAlign: 'center', color: 'blue' }}>
            {message}
          </div>
        ) : (null)}
        <div>
          <div
            id="avatarImageDiv"
            className="infoDiv"
            style={{ backgroundImage: `url(images/defaultAvatar.jpeg)` }}
          />
          <div id="usernameDiv" className="infoDiv">
            <span style={{color: "blue"}}> Username: </span> {username}
          </div>
          <div id="registrationDiv" className="infoDiv">
            <span style={{color: "blue"}}> Registration Date: </span> {registrationDate}
          </div>
        </div>
        <br/>
        <br/>
        <div className="infoDiv">
          <input 
            type="password" 
            placeholder="Change your password"
            id="passwordChangeInput"
            ref={this.passwordChangeInput}
            onKeyDown={(evt) => this.handleKeypress(evt)}
          />
          <button type="button" onClick={() => this.changePassword()} className="infoDiv" >
            Change
          </button>
        </div>
        <br/>
        <br/>
        <br/>
        <div className="infoDiv">
          <button className="infoDiv"
            type="button"
            onClick={() => this.deactivateAccount()}
            style={{color: "red", margin: 'auto', textAlign: 'center',}}
          >
            Deactivate Account
          </button>
        </div>
      </div>
    ];
  }
}

ProfilePage.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfilePage;
