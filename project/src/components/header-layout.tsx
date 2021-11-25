import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../constants';
import React from 'react';
import {useAppSelector} from '../hooks/useAppSelector';
import {ReactComponent as Logo} from '../static/logo.svg';


type HeaderChildrenProps = {
  children: JSX.Element,
}

function HeaderLayout({children}: HeaderChildrenProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.appReducer.authorizationStatus);

  const isAuthorised = () => authStatus === AuthorizationStatus.Auth;

  function getUserName() {
    return isAuthorised() ? <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
      : <span className="header__login">Sign in</span>;
  }

  function LoginPanel() {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {getUserName()}
          </Link>
        </li>
        {isAuthorised() && <li className="header__nav-item"><Link to={AppRoute.Login} className="header__nav-link"><span className="header__signout">Sign out</span></Link></li>}
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
                <Logo className="header__logo"  width="81" height="41"/>
                {/*<img className="header__logo" src="../static/logo.svg" alt="6 cities logo" width="81" height="41"/>*/}
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
