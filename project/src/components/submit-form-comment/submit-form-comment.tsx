import {ReactComponent as IconStar} from '../../static/icon-star.svg';
import {nanoid} from 'nanoid';
import React, {FormEvent, useEffect, useState} from 'react';
import {useLoginMutation, useSubmitCommentMutation} from '../../services/apiAxios';
import {pickOffers, setCurrentOfferComments} from '../../store/new-reducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';

type OutsideCommentFormProps = {
  currentOfferId: string
}

function SubmitFormComment({currentOfferId}: OutsideCommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  function RatingPanel() {
    const panelMarkup = [];
    for (let i = 5; i >= 1; i--) {
      panelMarkup.push(
        <React.Fragment key={nanoid()}>
          <input className="form__rating-input visually-hidden" name="rating" value={i} id={`${i}-stars`} type="radio" onChange={(evt) => setRatingValue(parseInt(evt.target.value))}/>
          <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
            <IconStar/>
          </label>
        </React.Fragment>);
    }
    return panelMarkup;
  }

  const [submitComment, {data}] = useSubmitCommentMutation();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submitComment({data: {commentValue, ratingValue}, currentOfferId})
  };

  useEffect(() => {
    dispatch(setCurrentOfferComments(data))
  }, [data]);

  const [commentValue, setCommentValue] = useState('');
  const [ratingValue, setRatingValue] = useState(1);

  return (
    <form className="reviews__form form" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RatingPanel()}
      </div>
      <textarea className="reviews__textarea form__textarea"
                onChange={(evt) => setCommentValue(evt.target.value)}
                value={commentValue} id="review"
                name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default SubmitFormComment;
