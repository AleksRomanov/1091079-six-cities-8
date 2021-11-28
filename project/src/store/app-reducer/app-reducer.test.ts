import {setAuthStatus, setCurrentOfferComments, setMapHoveredOffer, setOfferPageData, setOfferPageFavoriteStatus} from './app-reducer';
import {AuthorizationStatus} from '../../constants';
import {store} from '../store';
import {makeFakeOffer, makeFakeReview} from '../../utils/mocks';

const mockOffer = makeFakeOffer();
const mockReview = makeFakeReview();

/*eslint-disable*/
describe('Reducer: app-reducer', () => {
  describe('Action: setAuthStatus', () => {
    it('should set authorization status by a given value', () => {
      store.dispatch(setAuthStatus(AuthorizationStatus.Auth));
      let state = store.getState().appReducer.authorizationStatus;
      expect(state).toBe(AuthorizationStatus.Auth);
    });
    it('should set authorization status by a given value', () => {
      store.dispatch(setAuthStatus(AuthorizationStatus.Unknown));
      let state = store.getState().appReducer.authorizationStatus;
      expect(state).toBe(AuthorizationStatus.Unknown);
    });
  });
  describe('Action: setMapHoveredOffer', () => {
    it('should set hovered offer card data for map usage by given offer data', () => {
      store.dispatch(setMapHoveredOffer(mockOffer));
      let state = store.getState().appReducer.mapHoveredOffer;
      expect(state).toBe(mockOffer);
    });
    it('should set undefined offer card data for map usage', () => {
      store.dispatch(setMapHoveredOffer(null));
      let state = store.getState().appReducer.mapHoveredOffer;
      expect(state).toBe(null);
    });
  });
  describe('Action: setOfferPageData', () => {
    it('should set offer page object data by a given value', () => {
      store.dispatch(setOfferPageData(mockOffer));
      let state = store.getState().appReducer.offerPageData;
      expect(state).toBe(mockOffer);
    });
    it('should set off offer page object data', () => {
      store.dispatch(setOfferPageData(undefined));
      let state = store.getState().appReducer.offerPageData;
      expect(state).toBe(undefined);
    });
  });
  describe('Action: setCurrentOfferComments', () => {
    it('should set setCurrentOfferComments data by a given value', () => {
      store.dispatch(setCurrentOfferComments([mockReview]));
      let state = store.getState().appReducer.currentOfferComments;
      expect(state[0]).toBe(mockReview);
    });
    it('should set setCurrentOfferComments data by empty value', () => {
      store.dispatch(setCurrentOfferComments([]));
      let state = store.getState().appReducer.currentOfferComments;
      expect(state[0]).toBe(undefined);
    });
  });
  describe('Action: setOfferPageFavoriteStatus', () => {
    it('should change current favorite status by a given value', () => {
      store.dispatch(setOfferPageData(mockOffer));
      store.dispatch(setOfferPageFavoriteStatus(mockOffer));
      let state = store.getState().appReducer.offerPageData;
      expect(state).toBe(mockOffer);
    });
  });
});
/*eslint-disable*/
