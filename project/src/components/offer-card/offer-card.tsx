import {OfferType} from '../../types/offerType';
import {Link, useRouteMatch} from 'react-router-dom';
import {AppRoute, countOfStars, fullPercentageCount, offerCardClasses} from '../../constants';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setMapHoveredOffer} from '../../store/app-reducer/app-reducer';
import {ReactComponent as IconBookmark} from '../../static/icon-bookmark.svg';
import React, {useEffect} from 'react';
import {useSubmitFavoriteMutation} from '../../store/api-reducer';
import {setOfferFavoriteStatus} from '../../store/offers-reducer/offers-reducer';

type OfferCardProps = {
  offer: OfferType,
}

function OfferCard({offer}: OfferCardProps): JSX.Element {
  const {isPremium, previewImage, price, title, type, id, isFavorite} = offer;
  const dispatch = useAppDispatch();
  const isFavouritePage = useRouteMatch(AppRoute.Favorites);
  const articleClass = isFavouritePage ? offerCardClasses.favoritesArticleClass : offerCardClasses.mainArticleClass;
  const imageData = isFavouritePage ? offerCardClasses.favoritesImageData : offerCardClasses.mainImageData;
  const [submitFavorite, {data: submitFavoriteData, isSuccess: isFavoriteSubmitSuccess}] = useSubmitFavoriteMutation();

  useEffect(() => {
    submitFavoriteData && isFavoriteSubmitSuccess && dispatch(setOfferFavoriteStatus(submitFavoriteData));
  }, [submitFavoriteData, isFavoriteSubmitSuccess, dispatch]);

  const calculateRatingWidth = () => (fullPercentageCount / countOfStars) * Math.floor(offer.rating);

  const onCardSelect = (offerItem: OfferType | null): void => {
    dispatch(setMapHoveredOffer(offerItem));
  };

  return (
    <article className={articleClass} onMouseEnter={() => onCardSelect(offer)} onMouseLeave={() => onCardSelect(null)}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={imageData.imageClass}>
        <Link to={`${AppRoute.OfferLink}${id}`}>
          <img className="place-card__image" src={previewImage} width={imageData.imageSizes.width} height={imageData.imageSizes.height} alt="Place card"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper" key={offer.id}>
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} onClick={() => submitFavorite({offerId: id, offerStatus: +!isFavorite})} type="button">
            <IconBookmark className="place-card__bookmark-icon" width="18" height="19"/>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRatingWidth()}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.OfferLink}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default React.memo(OfferCard);
