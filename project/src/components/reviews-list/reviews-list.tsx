import PlaceReview from '../place-review/place-review';
import {nanoid} from 'nanoid';
import {useFetchCommentsQuery} from '../../services/api';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import React, {memo, useEffect} from 'react';
import {setCurrentOfferComments} from '../../store/reducer';

type ReviewsListOutsideProps = {
  currentOfferId: string;
}

function ReviewsList({currentOfferId}: ReviewsListOutsideProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {data, isFetching, isSuccess: isSuccessFetchComments} = useFetchCommentsQuery(currentOfferId);
  const currentOfferComments = useAppSelector((state) => state.appReducer.currentOfferComments);
  useEffect(() => {
    if (isSuccessFetchComments) {
      data && dispatch(setCurrentOfferComments(data));
    }
  }, [data, dispatch, isSuccessFetchComments]);

  if (isFetching) {
    return (
      <p>Loading ...</p>
    );
  }
  return (
    <>

      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{currentOfferComments.length}</span></h2>
      <ul className="reviews__list">
        {currentOfferComments.map((review) => (
          <PlaceReview
            review={review}
            key={nanoid()}
          />
        ))}
      </ul>

    </>
  );
}

export default memo(ReviewsList);
