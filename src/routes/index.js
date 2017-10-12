import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { observer } from 'preact-mobx';

import Dashboard from './dashboard';
import Tasks from './tasks';
import AddTask from './tasks/addTask';
import About from './about';
import Class from './class';
import Task from './task';
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

			const { user } = this.props.store;

			if (user.loggedIn) {
				return (
					<Router onChange={this.handleRoute}>
						<Dashboard path="/" store={this.props.store} />
						<Class store={this.props.store} path="/class/:class" />
						<Task store={this.props.store} path="/task/:task" />
						<Tasks store={this.props.store} path="/tasks/" />
						<AddTask store={this.props.store} path="/tasks/add" />
						<About path="/about/" />
						<div path="/signin/"><br /><br /><br />redirecting...</div>
						<ErrorPage default />
					</Router>
				);
			}

			return (
				<Router onChange={this.handleRoute}>
					<Welcome path="/" />
					<SignIn path="/signin/" />
					<ErrorPage default />
				</Router>
			);
		}
}
