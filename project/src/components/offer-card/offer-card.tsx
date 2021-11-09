import {OfferType} from '../../types/offerType';
import {Link, useRouteMatch} from 'react-router-dom';
import {AppRoute, offerCardClasses} from '../../constants';
import {Dispatch} from 'redux';
import {ActionsType} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {rewriteActiveCity} from '../../store/action';

function mapStateToProps() {
  return ({});
}

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    setActiveCity(city: OfferType | null) {
      dispatch(rewriteActiveCity(city));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type OfferCardProps = {
  offer: OfferType,
}

function OfferCard({offer, setActiveCity}: PropsFromRedux & OfferCardProps): JSX.Element {
  const {
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
    id,
  } = offer;

  let isFavourite = useRouteMatch(AppRoute.Favorites);

  const onCardSelect = (offerItem: OfferType | null): void => {
    setActiveCity(offerItem);
  };

  const articleClass = isFavourite ? offerCardClasses.favoritesArticleClass : offerCardClasses.mainArticleClass;
  const imageData = isFavourite ? offerCardClasses.favoritesImageData : offerCardClasses.mainImageData;

  return (
    <article className={articleClass} onMouseEnter={() => onCardSelect(offer)} onMouseLeave={() => onCardSelect(null)}>
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
        <div className="place-card__price-wrapper" key={offer.key}>
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isFavourite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${20 * Math.round(rating)}%`}}/>
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

export default connector(OfferCard);
