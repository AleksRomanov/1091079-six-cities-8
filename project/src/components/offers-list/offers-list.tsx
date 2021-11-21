import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {nanoid} from 'nanoid';
import {pickOffers, setNearbyOffers} from '../../store/reducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useFetchNearbyOffersQuery, useSubmitCommentMutation} from '../../services/api';

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


  const {data} = useFetchNearbyOffersQuery(id);
  useEffect(() => {
    data && isOfferPage && dispatch(setNearbyOffers(data));
  }, [data]);

  useEffect(() => {
    if (isFirstRender && !isOfferPage && offers.length > 0) {
      dispatch(pickOffers(currentUrl.pathname));
      setIsFirstRender(false);
    } else return;
  }, [currentUrl, isFirstRender, offers]);

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
