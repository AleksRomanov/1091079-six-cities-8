import React, {useMemo, useState} from 'react';
import {OfferType} from '../../types/offerType';
import {ReviewType} from '../../types/reviewType';
import OffersList from '../offers-list/offers-list';
import ReviewsList from '../reviews-list/reviews-list';
import SubmitFormComment from '../submit-form-comment/submit-form-comment';
import {City} from '../../types/city';
import Map from '../map/map';
import {withHeader} from '../../hocks/withHeader';
import {useParams} from 'react-router-dom';

type CardPropertyProps = {
  offer: OfferType,
  offers: OfferType[],
  reviews: ReviewType[],
  city: City,
}
type offerId = {
  id: string,
}

function Offer({offer, offers, reviews, city}: CardPropertyProps): JSX.Element {
  const {id}: offerId = useParams();
  const currenOffer = useMemo(() => offers.find((offerItem) => offerItem.id.toString() === id), [offers, id]);
  const [activeCard, setActiveCard] = useState<OfferType | null>(null);
  const [, setCommentValueStar] = useState<string | null>(null);
  const [, setCommentValueText] = useState<string | null>(null);
  const handleSelectStarRating = (value: string): void => {
    setCommentValueStar(value);
  };
  const handleInputCommentText = (value: string): void => {
    setCommentValueText(value);
  };

  const {
    rating,
  } = offer;

  const placesInNearby = offers.slice(0, 3);

  function renderImages() {
    return (
      <div className="property__gallery">
        {currenOffer && currenOffer.images.map((image) => (
          <div className="property__image-wrapper" key={offer.key}>
            <img className="property__image" src={image} alt=""/>
          </div>))}
      </div>
    );
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          {renderImages()}
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {currenOffer && currenOffer.isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {currenOffer && currenOffer.title}
              </h1>
              <button className={`property__bookmark-button button ${currenOffer && currenOffer.isFavorite ? 'property__bookmark-button--active' : null}`} type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${Math.round(20 * rating)}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{currenOffer && currenOffer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {currenOffer && currenOffer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {currenOffer && currenOffer.amountOfBedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {currenOffer && currenOffer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">€{currenOffer && currenOffer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {currenOffer && currenOffer.goods.map((good) => (
                  <li className="property__inside-item" key={good}>
                    {good}
                  </li>))};
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={currenOffer && currenOffer.hostAvatarUrl} alt="Host avatar" width="74" height="74"/>
                </div>
                <span className="property__user-name">
                  {currenOffer && currenOffer.hostName}
                </span>
                {currenOffer && currenOffer.hostIsPro &&
                <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {currenOffer && currenOffer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews · <span className="reviews__amount">1</span></h2>
              <ul className="reviews__list">
                <ReviewsList reviews={reviews} offer={offer}/>
              </ul>
              <SubmitFormComment
                handleSelectStarRating={handleSelectStarRating}
                handleInputCommentText={handleInputCommentText}
              />
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map offers={placesInNearby} city={city} activeCard={activeCard}/>
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <OffersList offers={placesInNearby} isFavourite={false} setActiveCard={setActiveCard}/>
          </div>
        </section>
      </div>
    </main>
  );
}

export default withHeader(Offer);
