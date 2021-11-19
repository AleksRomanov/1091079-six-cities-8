import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {ActionsType, ThunkAppDispatch} from '../../types/action';
import {fetchCurrentOffers} from '../../store/action';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {nanoid} from 'nanoid';
import {fetchNearbyOffers} from '../../store/api-actions';
import { pickOffers } from '../../store/new-reducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

type offerId = {
  id: string,
}

function OffersList(): JSX.Element {
  let currentUrl = useLocation();
  let isOfferPage = useRouteMatch(AppRoute.Offer);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const {id}: offerId = useParams();
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state => state.app.offers));
  const pickedOffers = useAppSelector((state => state.app.pickedOffers));

  useEffect(() => {
    if (isFirstRender && offers.length > 0) {
      if (isOfferPage) {
        // onFetchNearbyOffers(id);
      } else {
        dispatch(pickOffers(currentUrl.pathname));
      }
      setIsFirstRender(false);
    } else return;
  }, [id, currentUrl, isOfferPage, isFirstRender, offers]);

  return (
    <>
      {pickedOffers.map((offer) => (
        <OfferCard
          offer={offer}
          key={nanoid()}
        />
      ))}
    </>
  );
}

export default OffersList;
