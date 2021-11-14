import React, {FormEvent, useState} from 'react';
import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/authData';

function mapStateToProps({}: State) {
  return ({});
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLogin(login: AuthData) {
    dispatch(loginAction(login));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type LoginPageProps = ConnectedProps<typeof connector>;

function Login({onLogin}: LoginPageProps): JSX.Element {
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onLogin({
      login: loginInput,
      password: passwordInput,
    });
  };
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
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

export default connector(Login);
