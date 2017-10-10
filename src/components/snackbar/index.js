import { h, Component } from 'preact';

import style from './style';

export default class SnackBar extends Component {

	showSnackbar() {
		const timeout = setTimeout(() => {
			this.setState({
				open: false
			});
		}, 7000);
		this.setState({ timeout });
	}

	constructor() {
		super();
		this.state = {
			notification: {
				body: 'Heres the body',
				actionTxt: 'OKAY',
				key: Math.random(),
				action() {console.log('some action');}
			},
			open: false,
			timeout: null
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.notification.key !== nextProps.notification.key && nextProps.notification.body !== null) {
			clearTimeout(this.state.timeout);
			if (!this.state.open) {
				this.setState({ notification: nextProps.notification });
				this.setState({ open: true });
				this.showSnackbar();
			}
			else {
				this.setState({
					open: false
				});
				setTimeout(() => {
					this.setState({ notification: nextProps.notification });
					this.setState({ open: true });
				}, 500);
				this.showSnackbar();
			}
		}
	}
  
	render() {

		const clickAction = () => {
			clearTimeout(this.state.timeout);
			this.state.notification.action();
			this.setState({ open: false });
		};

		return (
			<div style={{ bottom: this.state.open ? 0 : '-100px' }} class={style.snackbar}>
				<span>{this.state.notification.body}</span>
				<button onClick={clickAction}>{this.state.notification.actionTxt}</button>
			</div>
		);
	}
}