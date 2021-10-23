import {OffersType} from '../../types/offersType';
import {Link} from 'react-router-dom';
import {AppRoute, offerCardClasses} from '../../constants';

type OfferCardProps = {
  offer: OffersType,
  isMain: boolean,
  onCardSelect: (offer: OffersType) => void,
  onCardNotSelect: () => void,
}

function OfferCard({offer, isMain, onCardSelect, onCardNotSelect}: OfferCardProps): JSX.Element {
  const {
    isPremium,
    previewImage,
    price,
    isFavorite,
    rating,
    title,
    type,
    id,
  } = offer;

  // const handleMouseEnter = () => {
  //   if (onCardSelect) {
  //     onCardSelect(offer);
  //   }
  // };
  // const handleMouseLeave = () => {
  //   if (onCardNotSelect) {
  //     onCardNotSelect(null);
  //   }
  // };

  const articleClass = isMain ? offerCardClasses.mainArticleClass : offerCardClasses.favoritesArticleClass;
  const imageData = isMain ? offerCardClasses.mainImageData : offerCardClasses.favoritesImageData;

  return (
    <article className={articleClass} onMouseEnter={() => onCardSelect(offer)} onMouseLeave={() => onCardNotSelect()}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={imageData.imageClass}>
        <Link to={`${AppRoute.OfferLink}${id}`}>
          <img className="place-card__image" src={previewImage} width={imageData.imageSizes.width} height={imageData.imageSizes.height} alt="Place card"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
