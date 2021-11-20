import {ActionType} from '../../types/action';
import browserHistory from '../../browser-history';
import {Middleware} from '@reduxjs/toolkit';
import reducer, {RootState} from '../new-reducer';

// type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, any> =
  (_store) =>
    (next) =>
      (action) => {
        console.log('herefdasfsdaf');

        if (action.type === ActionType.RedirectToRoute) {
          // console.log(browserHistory);
          // browserHistory.push('/');
        }
        return next(action);
      };
