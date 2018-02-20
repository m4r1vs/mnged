import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { observer } from 'preact-mobx';

import Home from './home';
import Donate from './donate';
import About from './about';
import Welcome from './welcome';
import ErrorPage from './errorpage';

@observer
export default class Routes extends Component {

		handleRoute = e => {

			// close drawer on navigation
			if (window.closeDrawer) window.closeDrawer();
			this.currentUrl = e.url;
		};

		render({ stores }) {

			if (stores.userStore.user) {
				return (
					<Router onChange={this.handleRoute}>
						<Home path="/" stores={stores} />
						<Donate path="/donate" />
						<About path="/about" />
						<ErrorPage default />
					</Router>
				);
			}

			return (
				<Router onChange={this.handleRoute}>
					<Welcome path="/" stores={stores} />
					<ErrorPage default />
				</Router>
			);
		}
}
