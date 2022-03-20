import ReactDOM from 'react-dom';

import { App } from './App';
import { GlobalStoreProvider } from './GlobalStoreProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GlobalStoreProvider>
      <App />
    </GlobalStoreProvider>,
    div
  );
});
