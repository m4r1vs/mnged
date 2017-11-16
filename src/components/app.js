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

	componentWillMount() {
		
		// don't execute on prerender
		if (typeof window !== 'undefined') {

			// gets fired when user logs in/out and on initial load
			auth.onAuthStateChanged((user) => {

				// call function to set up listeners
				initializeState(this.props.stores, user);

				// if user logged on, show snackbar
				if (user) this.props.stores.uiStore.showSnackbar(
					'Signed in as ' + user.email,
					null,
					3500
				);
			});
		}
	}

	render({ stores }) {

		// If there's an error, render only the error
		if (stores.uiStore.error) {
			return (
				<div class="errorDiv">
					<h1>{stores.uiStore.error}</h1>
					<button onClick={() => location.reload()}>RELOAD</button>
				</div>
			);
		}

		// assuming no error render the app:
		return (
			<div id="app">

				<SnackBar stores={stores} />
				
				{/* only show the header and nav drawer if in app mode */}
				{stores.userStore.user && (
					<div>
						<Nav stores={stores} />
						<Header stores={stores} />
					</div>
				)}

				<div id="main_component">
					{stores.uiStore.appLoaded ? <Routes stores={stores} /> : <Loader />}
				</div>

			</div>
		);
	}
}
