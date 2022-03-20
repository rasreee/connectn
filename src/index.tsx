import './styles/index.css';

import ReactDOM from 'react-dom';

import { App } from './components/App';
import { GlobalStoreProvider } from './components/GlobalStoreProvider';

ReactDOM.render(
  <GlobalStoreProvider>
    <App />
  </GlobalStoreProvider>,
  document.getElementById('root')
);
