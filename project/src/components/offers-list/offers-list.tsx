import {useParams, useRouteMatch} from 'react-router-dom';
import {memo, useEffect, useState} from 'react';
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
  const dispatch = useAppDispatch();
  const {id: offerId}: offerId = useParams();
  const isOfferPage = useRouteMatch(AppRoute.Offer);
  const pickedOffers = useAppSelector((state) => state.offersReducer.pickedOffers);
  const {data: nearbyData, isSuccess: isSuccessFetchNearbyOffers} = useFetchNearbyOffersQuery(offerId, {refetchOnMountOrArgChange: true});
  const [isFirstRender, setFirstRenderStatus] = useState(true);

  useEffect(() => {
    if (isOfferPage !== null && isFirstRender && isSuccessFetchNearbyOffers) {
      nearbyData && dispatch(setNearbyOffers(nearbyData));
      setFirstRenderStatus(false);
    }
    if (isOfferPage !== null && !isFirstRender) {
      dispatch(setNearbyOffers(pickedOffers));
    }
  }, [isSuccessFetchNearbyOffers, nearbyData, isOfferPage, dispatch, pickedOffers, isFirstRender, setFirstRenderStatus]);

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
