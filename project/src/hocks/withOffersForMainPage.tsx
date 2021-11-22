import {ComponentType, useEffect, useState} from 'react';
import {pickOffers} from '../store/reducer';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useLocation} from 'react-router-dom';
import {useAppSelector} from '../hooks/useAppSelector';

export function WithOffersForMainPage<T>(Component: ComponentType<T>): ComponentType<T> {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const offers = useAppSelector(((state) => state.app.offers));
  const currentUrl = useLocation();
  const dispatch = useAppDispatch();

  function WithLayout(props: T): JSX.Element {
    useEffect(() => {
      if (isFirstRender === null && offers.length > 0) {

        dispatch(pickOffers(currentUrl.pathname));
        setIsFirstRender(false);
      }
    }, [currentUrl, isFirstRender, offers, dispatch]);
    return (
      <Component {...props as T}/>
    );
  }

  return WithLayout;
}

