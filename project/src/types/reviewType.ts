type ReviewType = {
  comment: string,
  date: string,
  offersID: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string
  }
};

export type {ReviewType};
