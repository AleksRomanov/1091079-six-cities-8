import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import PlaceReview from '../place-review/place-review';
import {useEffect, useState} from 'react';
import {ThunkAppDispatch} from '../../types/action';
import {fetchCommentCurrentOffer, fetchCurrentOffer} from '../../store/api-actions';
import {nanoid} from 'nanoid';

function mapStateToProps({reviews}: State) {
  return ({
    reviews,
  });
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onFetchCommentsCurrentOffer(id: string) {
    dispatch(fetchCommentCurrentOffer(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReviewsListProps = ReviewsListOutsideProps & ConnectedProps<typeof connector>;

type ReviewsListOutsideProps = {
  currentOfferId: string;
}

function ReviewsList({currentOfferId, reviews, onFetchCommentsCurrentOffer}: ReviewsListProps): JSX.Element {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      onFetchCommentsCurrentOffer(currentOfferId);
      setIsFirstRender(false);
    } else return;
  }, [currentOfferId, isFirstRender]);

  return (
    <>
      {reviews.map((review) => (<PlaceReview review={review} key={nanoid()}/>))}
    </>
  );
}

export default connector(ReviewsList);
