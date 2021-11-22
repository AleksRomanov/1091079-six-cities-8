import React from 'react';
import Map from '../map/map';
import {withHeader} from '../../hocks/withHeader';
import {ReactComponent as IconBookmark} from '../../static/icon-bookmark.svg';
import {useParams} from 'react-router-dom';
import {nanoid} from 'nanoid';
import ReviewsList from '../reviews-list/reviews-list';
import SubmitFormComment from '../submit-form-comment/submit-form-comment';
import OffersList from '../offers-list/offers-list';
import {AuthorizationStatus} from '../../constants';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useFetchOfferQuery} from '../../services/api';
import {setOfferPageData} from '../../store/reducer';

type offerId = {
  id: string,
}

function Offer() {
  const dispatch = useAppDispatch();
  const {id}: offerId = useParams();
  const {data} = useFetchOfferQuery(id);
  data && dispatch(setOfferPageData(data));
  const observingOffer = useAppSelector(((state) => state.app.offerPageData));
  const authorizationStatus = useAppSelector(((state) => state.app.authorizationStatus));

  function RenderImages() {
    return (
      <div className="property__gallery">
        {observingOffer && observingOffer.images.map((image) => (
          <div className="property__image-wrapper" key={nanoid()}>
            <img className="property__image" src={image} alt=""/>
          </div>))}
      </div>
    );
  }

  function RenderGoodsFeatures() {
    return (
      <ul className="property__inside-list">
        {observingOffer && observingOffer.goods.map((good) => (
          <li className="property__inside-item" key={good}>
            {good}
          </li>))}
      </ul>
    );
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <RenderImages/>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {observingOffer && observingOffer.isPremium && <div className="property__mark"><span>Premium</span></div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {observingOffer && observingOffer.title}
              </h1>
              <button className={`property__bookmark-button button ${observingOffer && observingOffer.isFavorite ? 'property__bookmark-button--active ' : ''}`} type="button">
                <IconBookmark className="property__bookmark-icon" width="31" height="33"/>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${(observingOffer ? 100 * observingOffer.rating : 0) / 5.0}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{observingOffer && observingOffer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {observingOffer && observingOffer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {observingOffer && observingOffer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {observingOffer && observingOffer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">€{observingOffer && observingOffer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>

            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <RenderGoodsFeatures/>
            </div>

            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={observingOffer && `../${observingOffer.host.avatarUrl}`} alt="Host avatar" width="74" height="74"/>
                </div>
                <span className="property__user-name">
                  {observingOffer && observingOffer.host.name}
                </span>
                {observingOffer && observingOffer.host.isPro &&
                <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {observingOffer && observingOffer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews · <span className="reviews__amount">1</span></h2>
              <ul className="reviews__list">
                <ReviewsList currentOfferId={id}/>
              </ul>
              {authorizationStatus === AuthorizationStatus.Auth && <SubmitFormComment currentOfferId={id}/>}
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map/>
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <OffersList/>
          </div>
        </section>
      </div>
    </main>
  );
}

export default withHeader(Offer);
