import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import { auth } from '../lib/firebase';

import Header from 'async!./header';
import Nav from 'async!./nav';
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
		
		if (typeof window !== 'undefined') {
			auth.onAuthStateChanged((user) => {
				this.props.stores.uiStore.increaseJobs();
				if (!this.props.stores.uiStore.appState) initializeState(this.props.stores, user);
				this.props.stores.userStore.setUser(user, true);
				this.props.stores.uiStore.initUi(!!user);
				if (user && /signin/.test(document.location.pathname)) document.location.href = '/';
				if (user) this.props.stores.uiStore.showSnackbar(
					'Signed in as ' + user.email,
					null,
					3500
				);
				this.props.stores.uiStore.decreaseJobs();
			});
		}

	}

	render() {

		const stores = this.props.stores;

		return (
			<div id="app">

				<SnackBar stores={stores} />
				
				{stores.uiStore.appState ? (stores.uiStore.appState.userLoggedIn ? <Header stores={stores} nightmode={this.nightmode()} /> : null) : null}
				{stores.uiStore.appState ? (stores.uiStore.appState.userLoggedIn ? <Nav stores={stores} /> : null) : null}
				

				{stores.uiStore.error && (<div class="errorDiv">
					<h1>{stores.uiStore.error}</h1>
					<button onClick={() => location.reload()}>RELOAD</button>
				</div>)}

				<div id="main_component" style={{ minHeight: '100vh', minWidth: '100vw' }}>
					{stores.uiStore.appState ? ((stores.uiStore.jobQueue <= 0) ? <Routes stores={stores} /> : <Loader />) : <Loader /> }
				</div>

			</div>
		);
	}
}
