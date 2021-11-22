import {ComponentType, useEffect} from 'react';
import {setNearbyOffers} from '../store/reducer';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useParams} from 'react-router-dom';
import {useFetchNearbyOffersQuery} from '../services/api';
type offerId = {
  id: string,
}

export function withOffersForOfferPage<T>(Component: ComponentType<T>): ComponentType<T> {
  function WithLayout(props: T): JSX.Element {
    const {id}: offerId = useParams();
    const {data} = useFetchNearbyOffersQuery(id);
    const dispatch = useAppDispatch();

    useEffect(() => {
      data && dispatch(setNearbyOffers(data));
    }, [data, dispatch]);
    return (
      <Component {...props as T}/>
    );
  }
  return WithLayout;
}

