import { h, Component } from 'preact';

import style from './style';


export default class Donate extends Component {
	
	constructor() {
		super();
		this.state = null;
	}

	componentWillMount() {
		fetch('https://maniyt.de/api/crypto/get-value?BTC=1&BROWSER=false')
			.then(res => res.json())
			.then(res => this.setState({ price: res.BTC }));
	}
	
	render() {
		return (
			<div class={style.donate}>
				DONATE<br />
				One pizza would be: 5CAD$ <br />or {Math.round((5 / this.state.price) * 100000000) / 100 || '...'}ƀ<br /><br />
				One KFC meal: 15CAD$ <br />or {Math.round((15 / this.state.price) * 100000000) / 100 || '...'}ƀ<br /><br />
				A month of Adobe Creative Cloud: 60CAD$ <br />or {Math.round((60 / this.state.price) * 100000000) / 100 || '...'}ƀ
			</div>
		);
	}
}