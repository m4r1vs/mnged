import './style';
import App from './components/app';
import store from './lib/state/store';

const Mnged = () => <App store={store} />;

export default Mnged;
