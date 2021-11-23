import {useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {memo, useEffect, useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {nanoid} from 'nanoid';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useFetchNearbyOffersQuery} from '../../services/api';
import React from 'react';
import { pickOffers, setNearbyOffers } from '../../store/offers-reducer';

type offerId = {
  id: string,
}

function OffersList(): JSX.Element {
  const currentUrl = useLocation();
  const isOfferPage = useRouteMatch(AppRoute.Offer);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const {id}: offerId = useParams();
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offersReducer.offers);
  const {data} = useFetchNearbyOffersQuery(id);
  const pickedOffers = useAppSelector((state) => state.offersReducer.pickedOffers);

  useEffect(() => {
    if (isOfferPage !== null) {
      data && dispatch(setNearbyOffers(data));
    }
  }, [data, isOfferPage, dispatch]);

  useEffect(() => {
    if (isFirstRender && isOfferPage === null && offers.length > 0) {

      dispatch(pickOffers(currentUrl.pathname));
      setIsFirstRender(false);
    }
  }, [currentUrl, isFirstRender, offers, isOfferPage, dispatch]);

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

// export default memo(OffersList, (prevProps, nextProps) => {
//   return prevProps === nextProps;
// });

export default memo(OffersList);


// const magicCount = React.useMemo(() => getMagicCount(testString), [testString])
