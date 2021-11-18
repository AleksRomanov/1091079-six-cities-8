import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../store/newReducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
