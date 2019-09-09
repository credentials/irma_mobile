import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import irmaBridgeMiddleware from './middlewares/irmaBridge';
import rootReducer from './reducers/root';

const middleware = [thunk, irmaBridgeMiddleware];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const store = createStoreWithMiddleware(rootReducer);
export default store;