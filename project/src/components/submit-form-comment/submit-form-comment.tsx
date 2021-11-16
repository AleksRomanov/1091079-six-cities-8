import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionsType, ThunkAppDispatch} from '../../types/action';
import {selectStarRating, setCommentValueText} from '../../store/action';
import {ReactComponent as IconStar} from '../../static/icon-star.svg';
import {nanoid} from 'nanoid';
import React, {FormEvent} from 'react';
import {submitComment} from '../../store/api-actions';

function mapStateToProps({commentValueText, offerStarRating}: State) {
  return ({
    commentValueText,
    offerStarRating,
  });
}

const mapDispatchToProps = (dispatch: Dispatch<ActionsType> & ThunkAppDispatch) => ({
  handleSelectStarRating(ratingValue: string) {
    dispatch(selectStarRating(parseFloat(ratingValue)));
  },
  handleInputCommentText(commentTextValue: string) {
    dispatch(setCommentValueText(commentTextValue));
  },
  onHandleSubmit(commentTextValue: string, currentOfferId: string, rating: number) {
    dispatch(submitComment(commentTextValue, currentOfferId, rating));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);


type SubmitFormProps = OutsideCommentFormProps & ConnectedProps<typeof connector>;
type OutsideCommentFormProps = {
  currentOfferId: string
}
function SubmitFormComment({handleSelectStarRating, handleInputCommentText, commentValueText, currentOfferId, onHandleSubmit, offerStarRating}: SubmitFormProps): JSX.Element {
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

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onHandleSubmit(
      commentValueText, currentOfferId, offerStarRating
    );
  };


  return (
    <form className="reviews__form form" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RatingPanel()}
      </div>
      <textarea className="reviews__textarea form__textarea"
                onChange={(evt) => handleInputCommentText(evt.target.value)}
                value={commentValueText} id="review"
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

export default connector(SubmitFormComment);
