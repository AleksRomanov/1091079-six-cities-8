import React, {FormEvent, useState} from 'react';
import {ThunkAppDispatch} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/authData';
import {AppRoute} from '../../constants';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useLoginMutation} from '../../services/apiPoke';
import {saveToken} from '../../services/token';
import {redirectToRoute} from '../../store/action';
// import {useLoginMutation} from '../../services/apiPoke';

function Login(): JSX.Element {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  let loginData = {
    email: loginInput,
    password: passwordInput,
  }
  const [login, data] = useLoginMutation();
  // console.log(data);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    login(loginData);
    dispatch(redirectToRoute(AppRoute.Main));
  };
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link" href="/">
                <img className="header__logo" src={AppRoute.OfferLink} alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input"
                       onChange={(evt) => setLoginInput(evt.target.value)}
                       value={loginInput}
                       type="email"
                       name="email"
                       placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input"
                       onChange={(evt) => setPasswordInput(evt.target.value)}
                       value={passwordInput}
                       type="password"
                       name="password"
                       placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
