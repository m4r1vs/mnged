import { h, Component } from 'preact';
import style from './style';

export default class Settings extends Component {

	activateNightmode() {
		document.body.classList.toggle('nightmode');
	}

	render() {
		return (
			<section class={style.settings}>
				<div class={style.card} >
					<button onClick={this.activateNightmode}>Activate Nightmode</button>
				</div>
			</section>
		);
	}
}
