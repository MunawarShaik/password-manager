import './index.css'

const PasswordItem = props => {
  const {passwordDetails} = props
  const {
    id,
    website,
    name,
    password,
    isHidden,
    initialClassName,
  } = passwordDetails
  const initial = website ? website[0].toUpperCase() : ''

  const onDeletePassword = () => {
    const {deletePassword} = props
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="password-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div className="details-container">
          <p className="website">{website}</p>
          <p className="username">{name}</p>
          {isHidden ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          ) : (
            <p className="password">{password}</p>
          )}
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeletePassword}
          testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
