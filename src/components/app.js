import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import Header from './header';
import Nav from './nav';
import SnackBar from './snackbar';
import Loader from './loader';
import Routes from 'async!../routes';

import initializeState from '../lib/state/initializeState';

@observer
export default class App extends Component {

	componentWillMount() {
		initializeState(this.props.store);
	}

	render() {

		const { error, general } = this.props.store;

		return (
			<div id="app">

				<SnackBar store={this.props.store} />
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
