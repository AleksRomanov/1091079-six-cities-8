import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/new-reducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();
