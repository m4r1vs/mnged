import { h } from 'preact';
import style from './style';

const DefaultButton = props => (
	<button class={style.button} {...props}>
		{props.name}
	</button>
);

export default DefaultButton;