import {isEmptyOffers} from './utils';
import {OfferType} from '../types/offerType';
import {makeFakeOffers} from './mocks';

const mockOffer = makeFakeOffers();

describe('Business Logiс', () => {
  describe('Function: isEmptyOffers', () => {
    it('should return "true" if offers array empty', () => {
      const emptyOffersArray: OfferType[] = []
      expect(isEmptyOffers(emptyOffersArray))
        .toBe(true);
    });
    it('should return "false" if offers array not empty', () => {
      const filledOffersArray: OfferType[] = [mockOffer]
      expect(isEmptyOffers(filledOffersArray))
        .toBe(false);
    });
  });
});

