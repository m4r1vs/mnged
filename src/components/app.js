import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import { firestore } from '../lib/firebase';

import Header from './header';
import Nav from './nav';
//import SnackBar from './snackbar';
import Loader from './loader';
import Routes from 'async!../routes';

import initializeState from '../lib/state/initializeState';
@observer
export default class App extends Component {

	addTask() {
		firestore
			.collection('users')
			.doc('aqCB6Pw5QZSgNuxzueuR')
			.collection('tasks')
			.doc()
			.set({
				body: 'Nice body babe',
				due: new Date(),
				subject: 'Science',
				title: 'sOmE tAsK'
			});
	}

	removeTask(id) {
		firestore
			.collection('users')
			.doc('aqCB6Pw5QZSgNuxzueuR')
			.collection('tasks')
			.doc(id)
			.delete()
			.catch((e) => {
				this.props.store.throwError('#003', 'Error deleting task');
			});
	}

	componentWillMount() {
		initializeState(this.props.store);
	}

	render() {

		const { error, general } = this.props.store;

		return (
			<div id="app">

				<Header title={general.headerTitle ? general.headerTitle : 'Managed me!'} />
				<Nav store={this.props.store} />
				{/* <SnackBar store={this.props.store} /> */}

				{error && <div class="error_div">{error}</div>}

				<div id="main_component" style={{ minHeight: '100vh', minWidth: '100vw' }}>
					{ general.loaded ? <Routes store={this.props.store} /> : <Loader /> }
				</div>

			</div>
		);
	}
}
