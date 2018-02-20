import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import style from './style';

@observer
export default class Dialog extends Component {
	
	closeDialog() {
		this.props.uiStore.closeDialog();
	}
	
	constructor() {
		super();
		this.closeDialog = this.closeDialog.bind(this);
	}
	
	render({ uiStore, children }) {

		const { dialog } = uiStore;

		return (
			<div>
				<div class={style.dialog + ' card box-shadow-lvl-4 ' + (dialog && dialog.opened && style.opened)} >
					<h2 style={{
						backgroundColor: (dialog && dialog.details && dialog.details.themeColor) ? dialog.details.themeColor : 'transparent',
						color: (dialog && dialog.details && dialog.details.titleColor) ? dialog.details.titleColor : 'var(--primary-text-color)'
					}}
					>{dialog && dialog.title}</h2>
					{dialog && dialog.content}
					<div class={style.actions}>
						<button onClick={this.closeDialog}>CANCEL</button>
						<button onClick={this.closeDialog}>OK</button>
					</div>
				</div>
				<div class={style.background} onClick={this.closeDialog} style={{
					display: (dialog && dialog.opened) ? 'block' : 'none'
				}}
				/>
			</div>
		);
	}
}