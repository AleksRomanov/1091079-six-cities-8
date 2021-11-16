import {reducer} from '../reducer';
import {ActionType} from '../../types/action';
import browserHistory from '../../browser-history';
import {Middleware} from '@reduxjs/toolkit';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.goBack();
        }
        return next(action);
      };
