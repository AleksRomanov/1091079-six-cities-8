type ReviewType = {
  id: number,
  comment: string,
  date: string,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string
  }
};

export type ReviewServerModel = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: {
    'avatar_url': string,
    id: number;
    'is_pro': boolean,
    name: string;
  }
}

export type sentReview = {
  id: number,
  comment: string,
  rating: number,
}

export type {ReviewType};
