import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { observer } from 'preact-mobx';

import Dashboard from './dashboard';
import CafeteriaMenu from './cafeteriaMenu';
import Tasks from './tasks';
import AddTask from './tasks/addTask';
import Settings from './settings';
import About from './about';
import Class from './class';
import Task from './task';
import Register from './register';
import SignIn from './signin';
import Welcome from './welcome';
import ErrorPage from './errorpage';

@observer
export default class Routes extends Component {

		handleRoute = e => {
			if (window.closeDrawer) window.closeDrawer();
			this.currentUrl = e.url;
		};

		render() {

			const { appState } = this.props.stores.uiStore;

			if (appState.userLoggedIn) {
				return (
					<Router onChange={this.handleRoute}>
						<Dashboard path="/" stores={this.props.stores} />
						<Class stores={this.props.stores} path="/class/:class" />
						<Task stores={this.props.stores} path="/task/:task" />
						<Tasks stores={this.props.stores} path="/tasks/" />
						<AddTask stores={this.props.stores} path="/tasks/add" />
						<CafeteriaMenu stores={this.props.stores} path="/cafeteria-menu/" />
						<Settings path="/settings" />
						<About path="/about/" />
						<div path="/signin/"><br /><br /><br />redirecting...</div>
						<ErrorPage default />
					</Router>
				);
			}

			return (
				<Router onChange={this.handleRoute}>
					<Welcome path="/" stores={this.props.stores} />
					<Register path="/register/"  />
					<SignIn path="/signin/" stores={this.props.stores} />
					<About path="/about/" />
					<ErrorPage default />
				</Router>
			);
		}
}
