import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import style from './style';

@observer
export default class SnackBar extends Component {

	render() {

		const { notification } = this.props.stores.uiStore;

		const clickAction = () => {
			this.props.stores.uiStore.notification = null;
			if (notification && notification.action) notification.action();
		};

		return (
			<div style={{ transform: (notification && notification.text) ? 'translateY(0%)' : 'translateY(200%)' }} class={style.snackbar}>
				<span>{(notification && notification.text) ? notification.text : null}</span>
				<button onClick={clickAction}>
					{(notification && notification.actionText) ? notification.actionText : null}
				</button>
			</div>
		);
	}
}