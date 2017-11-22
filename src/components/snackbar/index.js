import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import style from './style';

@observer
export default class SnackBar extends Component {

	componentDidUpdate() {
		if (document.getElementById('floatingActionButton')) {
			if (this.props.stores.uiStore.notification) document.getElementById('floatingActionButton').style.bottom = (this.snackbarElement.clientHeight + 22) + 'px';
			else document.getElementById('floatingActionButton').style.bottom = '22px';
		}

		if (document.getElementById('taskInputForm')) {
			if (this.props.stores.uiStore.notification) document.getElementById('taskInputForm').style.bottom = (this.snackbarElement.clientHeight) + 'px';
			else document.getElementById('taskInputForm').style.bottom = '0';
		}
	}

	render() {

		const { notification } = this.props.stores.uiStore;

		const clickAction = () => {
			this.props.stores.uiStore.notification = null;
			if (notification && notification.action) notification.action();
		};

		return (
			<div ref={el => this.snackbarElement = el} style={{ transform: (notification && notification.text) ? 'translateY(0%)' : 'translateY(200%)' }} class={style.snackbar}>
				<span>{(notification && notification.text) ? notification.text : null}</span>
				<button onClick={clickAction}>
					{(notification && notification.actionText) ? notification.actionText : null}
				</button>
			</div>
		);
	}
}