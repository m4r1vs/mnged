import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import style from './style';
import Card from '../../components/card';

@observer
export default class CafeteriaMenu extends Component {
	render() {

		const { schedule } = this.props.stores.classesStore;

		return (
			<div class={style.cafMenu} >
				{schedule && schedule.menu.map((item, i) => (
					<Card>
						<h2>{item.dayname}</h2>
						<ul>
							<li>Entree: {item.entree}</li>
							<li>Soup: {item.soup}</li>
							<li>Soup: {item.soup}</li>
						</ul>
					</Card>
				))}
			</div>
		);
	}
}