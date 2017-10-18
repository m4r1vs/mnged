import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import { auth } from '../lib/firebase';

import Header from './header';
import Nav from './nav';
import SnackBar from './snackbar';
import Loader from './loader';
import Routes from 'async!../routes';

import initializeState from '../lib/state/initializeState';

@observer
export default class App extends Component {

	componentWillMount() {

		auth.onAuthStateChanged((user) => {
			initializeState(this.props.stores, user);
			this.props.stores.userStore.setUser(user, true);
			this.props.stores.uiStore.initUi(!!user);
			if (user && /signin/.test(document.location.pathname)) document.location.href = '/';
		});

	}

	render() {

		const stores = this.props.stores;

		return (
			<div id="app">

				<SnackBar stores={stores} />
				<Header action={stores.uiStore.headerAction} actionIcon={stores.uiStore.headerActionIcon} title={stores.uiStore.headerTitle || 'Managed me!'} />
				<Nav stores={stores} />

				{stores.uiStore.error && <div class="error_div">{stores.uiStore.error}</div>}

				<div id="main_component" style={{ minHeight: '100vh', minWidth: '100vw' }}>
					{ stores.uiStore.appState ? (stores.uiStore.appState.appLoaded ? <Routes stores={stores} /> : <Loader />) : <Loader /> }
				</div>

			</div>
		);
	}
}
