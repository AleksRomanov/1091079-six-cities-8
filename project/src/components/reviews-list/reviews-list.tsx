import PlaceReview from '../place-review/place-review';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

type ReviewsListProps = {
  offer: Offer;
  reviews: Review[];
}

function ReviewsList({reviews, offer}: ReviewsListProps): JSX.Element {
  const reviewsPlace = reviews.filter((review) => offer.id === review.offersID);

  return (
    <>
      {reviewsPlace.map((review) => (<PlaceReview review={review} key={review.id}/>))}
    </>
  );
}

export default ReviewsList;
