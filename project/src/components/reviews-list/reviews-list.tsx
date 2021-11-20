import PlaceReview from '../place-review/place-review';
import {nanoid} from 'nanoid';
import {useFetchCommentsQuery} from '../../services/apiAxios';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setCurrentOfferComments} from '../../store/new-reducer';
import {useEffect, useState} from 'react';


type ReviewsListOutsideProps = {
  currentOfferId: string;
}

function ReviewsList({currentOfferId}: ReviewsListOutsideProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {data} = useFetchCommentsQuery(currentOfferId);
  const currentOfferComments = useAppSelector(state => state.app.currentOfferComments);
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    if (isFirstRender && data) {
      data && dispatch(setCurrentOfferComments(data))
      setIsFirstRender(false);
    } else return;
  }, [data, currentOfferComments]);
  return (
    <>
      {currentOfferComments && currentOfferComments.map((review) => (<PlaceReview review={review} key={nanoid()}/>))}
    </>
  );
}

export default ReviewsList;
