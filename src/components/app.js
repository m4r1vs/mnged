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

	nightmode() {
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('nightmode') === 'true') return true;
			return false;
		}
	}

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
				<Header nightmode={this.nightmode()} action={stores.uiStore.headerAction} actionIcon={stores.uiStore.headerActionIcon} title={stores.uiStore.headerTitle || 'Managed me!'} />
				<Nav stores={stores} />

				{stores.uiStore.error && (<div class="errorDiv">
					<h1>{stores.uiStore.error}</h1>
					<button onClick={() => location.reload()}>RELOAD</button>
				</div>)}

				<div id="main_component" style={{ minHeight: '100vh', minWidth: '100vw' }}>
					{ stores.uiStore.appState ? (stores.uiStore.appState.appLoaded ? <Routes stores={stores} /> : <Loader />) : <Loader /> }
				</div>

			</div>
		);
	}
}
