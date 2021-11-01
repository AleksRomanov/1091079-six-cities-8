import {OfferType} from '../../types/offerType';
import {Link} from 'react-router-dom';
import {AppRoute, offerCardClasses} from '../../constants';
import {State} from '../../types/state';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {rewriteActiveCity} from '../../store/action';

function mapStateToProps({offersByCity, offers}: State) {
  return ({
    offersByCity,
    offers,
  });
}
function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    setActiveCity(city: OfferType) {
      dispatch(rewriteActiveCity(city));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type OfferCardProps = {
  offer: OfferType,
  isFavourite: boolean,
  // onCardSelect: (offer: OfferType) => void,
  // onCardNotSelect: () => void,
}

function OfferCard({offer, isFavourite, setActiveCity}: OfferCardProps & PropsFromRedux): JSX.Element {
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

  const onCardSelect = (): void => {
    console.log(offer);
    setActiveCity(offer);
    // if (setActiveCard) {
    //   setActiveCard(offer);
    // }
  };
  // const handleNotActiveSelectOffer = (): void => {
  //   if (setActiveCard) {
  //     setActiveCard(null);
  //   }
  // };

  const articleClass = isFavourite ? offerCardClasses.favoritesArticleClass : offerCardClasses.mainArticleClass;
  const imageData = isFavourite ? offerCardClasses.favoritesImageData : offerCardClasses.mainImageData;

  return (
    // <article className={articleClass} onMouseEnter={() => onCardSelect(offer)} onMouseLeave={() => onCardNotSelect()}>
    <article className={articleClass} onMouseEnter={() => onCardSelect()}>
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
          <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
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
