import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../state/actionCreators';

export const useActions = (): typeof actionCreators => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
