import {ReactComponent as IconStar} from '../../static/icon-star.svg';
import {nanoid} from 'nanoid';
import React, {FormEvent, Fragment, useEffect, useState} from 'react';
import {useSubmitCommentMutation} from '../../store/api-reducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setCurrentOfferComments} from '../../store/app-reducer/app-reducer';
import {checkCommentLengthValidity, checkRatingValueValidity} from '../../utils/utils';
import {countOfStars} from '../../constants';

type OutsideCommentFormProps = {
  currentOfferId: string
}

function SubmitFormComment({currentOfferId}: OutsideCommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [submitComment, {data}] = useSubmitCommentMutation();
  const [isSubmitButtonDisabled, setSubmitButtonActiveStatus] = useState(true);
  const [commentValue, setCommentValue] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const maxLengthComment = 300;

  useEffect(() => {
    data && dispatch(setCurrentOfferComments(data));
  }, [data, dispatch]);

  useEffect(() => {
    checkCommentLengthValidity(commentValue) && checkRatingValueValidity(ratingValue) && setSubmitButtonActiveStatus(false);
  }, [commentValue, ratingValue]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    checkCommentLengthValidity(commentValue) && submitComment({data: {commentValue, ratingValue}, currentOfferId});
  };

  function RatingPanel() {
    const panelMarkup = [];
    for (let i = countOfStars; i >= 1; i--) {
      panelMarkup.push(
        <Fragment key={nanoid()}>
          <input className="form__rating-input visually-hidden" checked={ratingValue === i} name="rating" value={i} id={`${i}-stars`} type="radio" onChange={() => setRatingValue(i)}/>
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
      <textarea className="reviews__textarea form__textarea" maxLength={maxLengthComment} onChange={(evt) => setCommentValue(evt.target.value)} value={commentValue} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button disabled={isSubmitButtonDisabled} className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default SubmitFormComment;
