import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../store/new-reducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
