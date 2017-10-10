import { h, Component } from 'preact';
import { auth } from '../../lib/firebaseConfig';
import style from './style';

export default class Settings extends Component {

	render() {
		return (
			<section class={style.settings}>
				<button onClick={() => auth.signOut()}>Sign Out</button>
      </section>
		);
	}
}
