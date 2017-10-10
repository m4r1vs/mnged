import { h, Component } from 'preact';

import { observer } from 'preact-mobx';

@observer
export default class Lol extends Component {
	render() {

		const { user } = this.props.store;

		return (
			<div>
				<h1>Name: {user.name}</h1>
			</div>
		);
	}
}