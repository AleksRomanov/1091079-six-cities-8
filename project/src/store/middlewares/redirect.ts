import {ActionType} from '../../types/action';
import browserHistory from '../../browser-history';
import {Middleware} from '@reduxjs/toolkit';

/*eslint-disable*/
export const redirect: Middleware<unknown, any> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.url);
        }
        return next(action);
      };
/*eslint-disable*/
