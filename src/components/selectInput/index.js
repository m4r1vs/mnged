import { h } from 'preact';
import style from './style';

const SelectInput = props => (
	<div class={style.select}>
		<label>Standard Select</label>
		<select ref={props.inputRef}>
			{props.children}
		</select>
	</div>
);

export default SelectInput;