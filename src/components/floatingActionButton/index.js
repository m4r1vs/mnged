import { h, Component } from 'preact';
import style from './style';

export default class FloatingActionButton extends Component {
  
	render() {
		return (
			<div ref={(div) => this.fab = div} id="floatingActionButton" class={style.fab} {...this.props}>
				<i class="material-icons">{this.props.children}</i>
			</div>
		);
	}
}