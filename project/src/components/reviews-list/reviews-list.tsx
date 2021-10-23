import PlaceReview from '../place-review/place-review';
import {OffersType} from '../../types/offersType';
import {ReviewType} from '../../types/reviewType';

type ReviewsListProps = {
  offer: OffersType;
  reviews: ReviewType[];
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
