import {adaptDataFromServer, isCommentsValid, isEmptyOffers} from './utils';
import {OfferType, OfferTypeFromServer} from '../types/offerType';
import {makeFakeComment, makeFakeOffer, makeFakeOfferFromServer} from './mocks';

const mockOffer = makeFakeOffer();
const mockServerOffer = makeFakeOfferFromServer();

describe('Utils', () => {
  describe('Function: isEmptyOffers', () => {
    it('should return "true" if offers array empty', () => {
      const emptyOffersArray: OfferType[] = [];
      expect(isEmptyOffers(emptyOffersArray))
        .toBe(true);
    });
    it('should return "false" if offers array not empty', () => {
      const filledOffersArray: OfferType[] = [mockOffer]
      expect(isEmptyOffers(filledOffersArray))
        .toBe(false);
    });
  });
  describe('Function: isCommentsValid', () => {
    it('should return "true" if comment valid', () => {
      const validComment = makeFakeComment();
      expect(isCommentsValid(validComment))
        .toBe(true);
    });
    it('should return "false" if comment not valid', () => {
      const notValidComment: string = '';
      expect(isCommentsValid(notValidComment))
        .toBe(false);
    });
  });
  describe('Function: isCommentsValid', () => {
    it('should return "true" if comment valid', () => {
      const validComment = makeFakeComment();
      expect(isCommentsValid(validComment))
        .toBe(true);
    });
    it('should return "false" if comment not valid', () => {
      const notValidComment: string = '';
      expect(isCommentsValid(notValidComment))
        .toBe(false);
    });
  });

  describe('Function: adaptDataFromServer', () => {
    it('should return adapted from server offer object ', () => {
      const localOfferKeys = Object.keys(mockOffer);
      localOfferKeys.forEach((localOfferKey) => {
        return expect(adaptDataFromServer(mockServerOffer)).toHaveProperty(localOfferKey);
      });
    });
    it('should return adapted from server array with offer object ', () => {
      const localOfferKeys = Object.keys(mockOffer);
      localOfferKeys.forEach((localOfferKey) => {
        return expect(adaptDataFromServer([mockServerOffer])[0]).toHaveProperty(localOfferKey);
      });
    });
  });
});

