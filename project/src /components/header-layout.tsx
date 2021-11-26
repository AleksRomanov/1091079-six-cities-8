import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../constants';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../hooks/useAppSelector';
import {ReactComponent as Logo} from '../static/logo.svg';
import {getEmail} from '../services/token';
import {useLogOutMutation} from '../services/api';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {setAuthStatus} from '../store/reducer';


type HeaderChildrenProps = {
  children: JSX.Element,
}

function HeaderLayout({children}: HeaderChildrenProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.appReducer.authorizationStatus);
  const dispatch = useAppDispatch();
  const isAuthorised = () => authStatus === AuthorizationStatus.Auth;
  const [logOut] = useLogOutMutation();
  const [userDataEmail, setUserData] = useState(getEmail())

  useEffect(() => {
    let userEmail = getEmail();
    setUserData(userEmail);
  }, [authStatus, getEmail()])

  const onLogoutClick = () => {
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
    logOut();
  }

  function LoginPanel() {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={isAuthorised() ? AppRoute.Favorites : AppRoute.Login} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            {isAuthorised() ? <span className="header__user-name user__name">{userDataEmail}</span> : <span className="header__login">Sign in</span>}
          </Link>
        </li>
        {isAuthorised() && <li className="header__nav-item">
            <a className="header__nav-link" onClick={onLogoutClick} href="#">
                <span className="header__signout">Sign out</span>
            </a>
        </li>}
      </ul>
    );
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
                <Logo className="header__logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <LoginPanel/>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export default HeaderLayout;
