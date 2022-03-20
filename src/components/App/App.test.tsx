import { GlobalStoreProvider } from 'components/GlobalStoreProvider';
import ReactDOM from 'react-dom';

import { App } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GlobalStoreProvider>
      <App />
    </GlobalStoreProvider>,
    div
  );
});
