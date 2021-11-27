import {useParams, useRouteMatch} from 'react-router-dom';
import {memo, useEffect, useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {nanoid} from 'nanoid';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useFetchFavoritesQuery, useFetchNearbyOffersQuery} from '../../services/api';
import React from 'react';
import {loadOffers, pickOffers, setNearbyOffers} from '../../store/offers-reducer';

type offerId = {
  id: string,
}

function OffersList(): JSX.Element {
  const isOfferPage = useRouteMatch(AppRoute.Offer);
  const isFavouritePage = useRouteMatch(AppRoute.Favorites);
  const {id}: offerId = useParams();
  const dispatch = useAppDispatch();
  const pickedOffers = useAppSelector((state) => state.offersReducer.pickedOffers);
  const {data: nearbyData, isSuccess} = useFetchNearbyOffersQuery(id, {refetchOnMountOrArgChange: true});
  const [isFirstRender, setFirstRenderStatus] = useState(true);

  useEffect(() => {
    if (isOfferPage !== null && isFirstRender && isSuccess) {
      nearbyData && dispatch(setNearbyOffers(nearbyData));
      setFirstRenderStatus(false);
    }
    if (isOfferPage !== null && !isFirstRender) {
      nearbyData && dispatch(setNearbyOffers(pickedOffers));
    }
  }, [isSuccess, nearbyData, isOfferPage, dispatch, isFavouritePage, pickedOffers, isFirstRender, setFirstRenderStatus]);

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
