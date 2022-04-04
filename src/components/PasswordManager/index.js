import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    websiteNameInput: '',
    userNameInput: '',
    passwordInput: '',
    searchInput: '',
    isHidden: true,
  }

  onShowPassword = () => {
    const {isHidden} = this.state
    this.setState({
      isHidden: !isHidden,
    })
  }

  onChangeWebsite = event => {
    this.setState({websiteNameInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePassword = id => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(password => password.id !== id),
    })
  }

  renderPasswordsList = () => {
    const {passwordList} = this.state

    return passwordList.map(eachPassword => (
      <PasswordItem
        key={eachPassword.id}
        passwordDetails={eachPassword}
        onShowPassword={this.onShowPassword}
        deletePassword={this.deletePassword}
      />
    ))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteNameInput, userNameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newPassword = {
      id: v4(),
      website: websiteNameInput,
      name: userNameInput,
      Password: passwordInput,
      isHidden: true,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteNameInput: '',
      userNameInput: '',
      passwordInput: '',
    }))
  }

  render() {
    const {
      websiteNameInput,
      userNameInput,
      passwordInput,
      searchInput,
      passwordList,
    } = this.state
    const searchResults = passwordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const containsPasswords = passwordList.length > 0

    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="form-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image-sm"
          />
          <div className="form-container">
            <form className="from" onSubmit={this.onAddPassword}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  alt="website"
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  value={websiteNameInput}
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <img
                  alt="username"
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  value={userNameInput}
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.onChangeUserName}
                />
              </div>
              <div className="input-container">
                <img
                  alt="password"
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  type="password"
                  value={passwordInput}
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="button-container">
                <button className="add-button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image-lg"
          />
        </div>
        <div className="passwords-container">
          <div className="header">
            <h1 className="heading">Your Passwords</h1>
            <p className="count">{passwordList.length}</p>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                value={searchInput}
                type="search"
                onChange={this.onChangeSearchInput}
                className="search-input"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-password-container">
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox"
              onClick={this.onShowPassword}
            />
            <label htmlFor="checkbox" className="show-password-heading">
              Show passwords
            </label>
          </div>
          <div>
            {containsPasswords ? (
              <ul className="passwords-list">
                {searchResults.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    onShowPassword={this.onShowPassword}
                    deletePassword={this.deletePassword}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-img"
                />
                <p>No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
