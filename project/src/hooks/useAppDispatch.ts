import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/newReducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();
