import PlaceReview from '../place-review/place-review';
import {nanoid} from 'nanoid';
import {useFetchCommentsQuery} from '../../services/api';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setCurrentOfferComments} from '../../store/reducer';
import React, {useEffect} from 'react';

type ReviewsListOutsideProps = {
  currentOfferId: string;
}

function ReviewsList({currentOfferId}: ReviewsListOutsideProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {data, isFetching, isSuccess} = useFetchCommentsQuery(currentOfferId);
  const currentOfferComments = useAppSelector((state) => state.app.currentOfferComments);
  // const magicCount = React.useMemo(() => getMagicCount(testString), [testString])
  useEffect(() => {
    if (isSuccess) {
      data && dispatch(setCurrentOfferComments(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    currentOfferComments && dispatch(setCurrentOfferComments(currentOfferComments));
  }, [currentOfferComments, dispatch]);

  if (isFetching) {
    return (
      <p>Loading ...</p>
    );
  }
  return (
    <>
      {currentOfferComments.map((review) => (
        <PlaceReview
          review={review}
          key={nanoid()}
        />
      ))}
    </>
  );
}

export default React.memo(ReviewsList);
