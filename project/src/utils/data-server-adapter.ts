/*eslint-disable*/
const snakeSymbol = '_';
const nameOfObjectType = 'object';
export const adaptDataFromServer = (data: any): any => {
  const adaptOfferFeatures = (offer: any) => {
    for (const feature in offer) {
      if (typeof (offer[feature]) === nameOfObjectType) {
        adaptOfferFeatures(offer[feature]);
      } else {
        let snakeSymbolIndex = feature.indexOf(snakeSymbol);
        if (snakeSymbolIndex >= 0) {
          offer[`${feature.slice(0, snakeSymbolIndex)}${feature.slice(++snakeSymbolIndex)[0].toUpperCase()}${feature.slice(++snakeSymbolIndex)}`] = offer[feature];
          delete offer[feature];
        }
      }
    }
  };

  if (data.length) {
    data.map(adaptOfferFeatures);
  } else {
    adaptOfferFeatures(data);
  }
  return data;
};
/*eslint-disable*/
