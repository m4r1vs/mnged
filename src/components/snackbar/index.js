import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import style from './style';

@observer
export default class SnackBar extends Component {
  
	render() {

		const { notification } = this.props.store;

		const clickAction = () => {
			notification.action();
			this.props.store.notification = null;
		};

		return (
			<div style={{ transform: (notification && notification.text) ? 'translateY(0%)' : 'translateY(200%)' }} class={style.snackbar}>
				<span>{(notification && notification.text) ? notification.text : null}</span>
				<button onClick={(notification && notification.action) ? clickAction : null}>
					{(notification && notification.actionText) ? notification.actionText : null}
				</button>
			</div>
		);
	}
}