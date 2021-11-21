import PlaceReview from '../place-review/place-review';
import {nanoid} from 'nanoid';
import {useFetchCommentsQuery} from '../../services/apiAxios';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setCurrentOfferComments} from '../../store/new-reducer';
import {useEffect} from 'react';


type ReviewsListOutsideProps = {
  currentOfferId: string;
}

function ReviewsList({currentOfferId}: ReviewsListOutsideProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {data, isFetching} = useFetchCommentsQuery(currentOfferId);
  const currentOfferComments = useAppSelector(state => state.app.currentOfferComments);
  useEffect(() => {
    data && dispatch(setCurrentOfferComments(data))
  }, [currentOfferComments, dispatch]);
  if (isFetching) {
    return (
      <p>LOADING . . .</p>
    )
  }
  return (
    <>
      {currentOfferComments && currentOfferComments.map((review) => (<PlaceReview review={review} key={nanoid()}/>))}
    </>
  );
}

export default ReviewsList;
