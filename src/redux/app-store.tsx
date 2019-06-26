import { createStore, Store } from 'redux';
import { IAppState } from './app-state';
import { rootReducer } from './reducers/app-reducers';

const appStore: Store<IAppState> = createStore<IAppState, any, any, any>(rootReducer);

console.log(appStore.getState());
export default appStore;