import { combineReducers } from 'redux';
import user from './user_reducer';
import auth from './auth_reducer';

const rootReducer = combineReducers({
  user,
  auth,
});

export default rootReducer;
