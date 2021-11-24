import {useParams, useRouteMatch} from 'react-router-dom';
import {memo, useEffect} from 'react';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {nanoid} from 'nanoid';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useFetchNearbyOffersQuery} from '../../services/api';
import React from 'react';
import {setNearbyOffers} from '../../store/offers-reducer';

type offerId = {
  id: string,
}

function OffersList(): JSX.Element {
  const isOfferPage = useRouteMatch(AppRoute.Offer);
  const {id}: offerId = useParams();
  const dispatch = useAppDispatch();
  const pickedOffers = useAppSelector((state) => state.offersReducer.pickedOffers);

  const {data: nearbyData} = useFetchNearbyOffersQuery(id);

  useEffect(() => {
    if (isOfferPage !== null) {
      nearbyData && dispatch(setNearbyOffers(nearbyData));
    }
  }, [nearbyData, isOfferPage, dispatch]);

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

export default memo(OffersList);
