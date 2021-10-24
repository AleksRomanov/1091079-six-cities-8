import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, OfferType} from '../../constants';
import {OffersType} from '../../types/offersType';
import {ReviewType} from '../../types/reviewType';
import OffersList from '../offers-list/offers-list';
import ReviewsList from '../reviews-list/reviews-list';
import SubmitFormComment from '../submit-form-comment/submit-form-comment';
import {City} from '../../types/city';
import Map from '../map/map';
import {nanoid} from 'nanoid';

type CardPropertyProps = {
  offer: OffersType,
  offers: OffersType[],
  reviews: ReviewType[],
  city: City,
}

function CardProperty({offer, offers, reviews, city}: CardPropertyProps): JSX.Element {
  const [, setCommentValueStar] = useState<string | null>(null);
  const [, setCommentValueText] = useState<string | null>(null);
  const handleSelectStarRating = (value: string): void => {
    setCommentValueStar(value);
  };
  const handleInputCommentText = (value: string): void => {
    setCommentValueText(value);
  };

  const {
    images,
    title,
    description,
    isPremium,
    rating,
    amountOfBedrooms,
    maxAdults,
    price,
    goods,
    hostIsPro,
    hostName,
    isFavorite,
  } = offer;

  const placesInNearby = offers.slice(0, 3);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="../img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div className="property__image-wrapper" key={nanoid()}>
                  <img className="property__image" src={image} alt="Room"/>
                </div>),
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
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
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OfferType['apartment']}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {amountOfBedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>))};
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="../img/avatar-angelina.jpg" alt="Host avatar" width="74" height="74"/>
                  </div>
                  <span className="property__user-name">
                    {hostName}
                  </span>
                  {hostIsPro &&
                  <span className="property__user-status">
                      Pro
                  </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
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
            <Map offers={placesInNearby} city={city} activeCard={null}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList offers={placesInNearby} isMain/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default CardProperty;
