import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionsType} from '../../types/action';
import {selectStarRating, setCommentValueText} from '../../store/action';
import {ReactComponent as IconStar} from '../../static/icon-star.svg';
import {nanoid} from 'nanoid';
import React from 'react';

function mapStateToProps({commentValueText}: State) {
  return ({
    commentValueText,
  });
}

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    handleSelectStarRating(ratingValue: string) {
      dispatch(selectStarRating(parseFloat(ratingValue)));
    },
    handleInputCommentText(commentTextValue: string) {
      dispatch(setCommentValueText(commentTextValue));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type SubmitFormProps = ConnectedProps<typeof connector>;

function SubmitFormComment({handleSelectStarRating, handleInputCommentText, commentValueText}: SubmitFormProps): JSX.Element {
  function RatingPanel() {
    const panelMarkup = [];
    for (let i = 5; i >= 1; i--) {
      panelMarkup.push(
        <React.Fragment key={nanoid()}>
          <input className="form__rating-input visually-hidden" name="rating" value={i} id={`${i}-stars`} type="radio" onChange={(evt) => handleSelectStarRating(evt.target.value)}/>
          <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
            <IconStar/>
          </label>
        </React.Fragment>);
    }
    return panelMarkup;
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RatingPanel()}
      </div>
      <textarea className="reviews__textarea form__textarea" value={commentValueText} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={(evt) => handleInputCommentText(evt.target.value)}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default connector(SubmitFormComment);
