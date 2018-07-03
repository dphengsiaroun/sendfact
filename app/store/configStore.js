import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { middleware } from '../navigation/AppNavigator';
import ReduxThunk from 'redux-thunk';

export default function configStore() {

    const store = createStore(
        reducers,
        applyMiddleware(ReduxThunk, middleware),
      );

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}
