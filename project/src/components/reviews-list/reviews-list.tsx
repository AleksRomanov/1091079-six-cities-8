import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import PlaceReview from '../place-review/place-review';

function mapStateToProps({reviews}: State) {
  return ({
    reviews,
  });
}

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

type ReviewsListProps = {
  currentOfferId: string;
}

function ReviewsList({currentOfferId, reviews}: PropsFromRedux & ReviewsListProps): JSX.Element {
  const currentOffersReviews = reviews.filter((review) => currentOfferId === review.offersID.toString());

  return (
    <>
      {currentOffersReviews.map((review) => (<PlaceReview review={review} key={review.id}/>))}
    </>
  );
}

export default connector(ReviewsList);
