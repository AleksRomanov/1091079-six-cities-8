import {ReactComponent as IconStar} from '../../static/icon-star.svg';
import {nanoid} from 'nanoid';
import React, {FormEvent, Fragment, useEffect, useState} from 'react';
import {useSubmitCommentMutation} from '../../services/api';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setCurrentOfferComments} from '../../store/reducer';

type OutsideCommentFormProps = {
  currentOfferId: string
}

function SubmitFormComment({currentOfferId}: OutsideCommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitComment, {data}] = useSubmitCommentMutation();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    commentValue.length >= 50 && submitComment({data: {commentValue, ratingValue}, currentOfferId});
  };

  useEffect(() => {
    data && dispatch(setCurrentOfferComments(data));
  }, [data, dispatch]);

  const [commentValue, setCommentValue] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const [isSubmitButtonDisabled, setSubmitButtonActiveStatus] = useState(true);

  useEffect(() => {
    commentValue.length >= 50 && ratingValue !== 0 && setSubmitButtonActiveStatus(false);
  }, [commentValue, ratingValue]);

  function RatingPanel() {
    const panelMarkup = [];
    for (let i = 5; i >= 1; i--) {
      panelMarkup.push(
        <Fragment key={nanoid()}>
          <input className="form__rating-input visually-hidden" checked={ratingValue === i} name="rating" value={i} id={`${i}-stars`} type="radio" onChange={(evt) => {
            setRatingValue(i)
          }}/>
          <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
            <IconStar className="form__star-image" width="37" height="33"/>
          </label>
        </Fragment>);
    }
    return panelMarkup;
  }

  return (
    <form className="reviews__form form" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RatingPanel()}
      </div>
      <textarea className="reviews__textarea form__textarea" maxLength={300} onChange={(evt) => setCommentValue(evt.target.value)} value={commentValue} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <p></p>
        <button disabled={isSubmitButtonDisabled} className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default SubmitFormComment;
