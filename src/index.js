import './style';
import App from './components/app';
import Stores from './lib/state/stores';

const Mnged = () => <App stores={Stores} />;

export default Mnged;
