import {SortType} from '../../constants';
import {store} from '../store';
import {makeFakeOffer} from '../../utils/mocks';
import {loadOffers, pickFavoritesOffers, pickOffers, selectCity, setNearbyOffers, setOfferFavoriteStatus, sortCurrentOffers} from './offers-reducer';

const mockOffer = makeFakeOffer();
const mockOfferSecond = makeFakeOffer();

/*eslint-disable*/
describe('Reducer: offers-reducer', () => {
  describe('Action: loadOffers', () => {
    it('should set offers data by a given value', () => {
      store.dispatch(loadOffers([mockOffer]));
      let state = store.getState().offersReducer.offers;
      expect(state[0]).toBe(mockOffer);
    });
  });
  describe('Action: selectCity', () => {
    it('should set current city data by a given value', () => {
      store.dispatch(selectCity(mockOffer.city));
      let state = store.getState().offersReducer.currentCity;
      expect(state).toBe(mockOffer.city);
    });
  });
  describe('Action: pickOffers', () => {
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(loadOffers([mockOffer]));
      store.dispatch(selectCity(mockOffer.city));
      store.dispatch(pickOffers());
      let state = store.getState().offersReducer.pickedOffers[0];
      expect(state).toBe(mockOffer);
    });
  });
  describe('Action: setNearbyOffers', () => {
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(setNearbyOffers([mockOffer]));
      let state = store.getState().offersReducer.pickedOffers;
      expect(state[0]).toBe(mockOffer);
    });
  });
  describe('Action: sortCurrentOffers', () => {
    beforeAll(() => {
      store.dispatch(loadOffers([mockOffer, mockOfferSecond]));
      store.dispatch(selectCity(mockOffer.city));
      store.dispatch(pickOffers());
    });
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(sortCurrentOffers(SortType.Popular));
      let state = store.getState().offersReducer.pickedOffers;
      expect(state[0]).toBe(mockOffer);
      expect(state[1]).toBe(mockOfferSecond);
    });
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(sortCurrentOffers(SortType.LowToHighPrice));
      let state = store.getState().offersReducer.pickedOffers;
      expect(state[0].price <= state[1].price).toBe(true);
    });
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(sortCurrentOffers(SortType.HighToLowPrice));
      let state = store.getState().offersReducer.pickedOffers;
      expect(state[0].price >= state[1].price).toBe(true);
    });
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(sortCurrentOffers(SortType.TopRated));
      let state = store.getState().offersReducer.pickedOffers;
      expect(state[0].rating >= state[1].rating).toBe(true);
    });
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(sortCurrentOffers(SortType.Popular));
      store.dispatch(sortCurrentOffers('undefined'));
      let state = store.getState().offersReducer.pickedOffers;
      expect(state[0]).toBe(mockOffer);
      expect(state[1]).toBe(mockOfferSecond);
    });
  });
  describe('Action: setOfferFavoriteStatus', () => {
    beforeAll(() => {
      store.dispatch(loadOffers([mockOffer]));
      store.dispatch(selectCity(mockOffer.city));
      store.dispatch(pickOffers());
    });
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(setOfferFavoriteStatus(mockOffer));
      let state = store.getState().offersReducer;
      expect(state.pickedOffers[0].isFavorite).toBe(mockOffer.isFavorite);
      expect(state.offers[0].isFavorite).toBe(mockOffer.isFavorite);
    });
    it('should filter offers data by a current city data and set it to picked offers', () => {
      store.dispatch(pickFavoritesOffers([mockOffer]));
      let state = store.getState().offersReducer.favoritesOffers;
      expect(state[0]).toBe(mockOffer);
    });
  });
});
/*eslint-disable*/
