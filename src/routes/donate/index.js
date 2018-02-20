import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { DoughnutIcon, BeerIcon, PizzaIcon, ChickenIcon, BrushIcon } from '../../components/icons';

import Card from '../../components/card';
import style from './style';

export default class Donate extends Component {
	
	constructor() {
		super();
		this.state = null;
	}

	componentDidMount() {
		document.querySelectorAll('.applyHoverEffect').forEach((element) => {
			console.log("lol")
				const hoverColor = element.getAttribute('fill'); // get the fill color

				// set it as a custom property inline
				if (hoverColor) element.style.setProperty('--hover-color', hoverColor);
			});
	}

	shapeshiftClick (e) {
		e.preventDefault();
		const link = "https://shapeshift.io/shifty.html?destination=1Lg9BjkTaGkXfhU54LkG91fkQRUunBDSYR&output=BCH&apiKey=9623e7650ab4c717e953bd4d6461fa81372208af22f9b2e56bab1393605a43b2ac7e0db570552fd2073a3c0c5ae9702827e061c2af2d43969e66fdc8f5683835";
		window.open(link, '1418115287605', 'width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0,left=0,top=0');
		return false;
	}

	componentWillMount() {
		fetch('https://maniyt.de/api/crypto/get-value?BTC=1&BROWSER=false')
			.then(res => res.json())
			.then(res => this.setState({ price: res.BTC }));
	}
	
	render() {
		return (
			<div class={style.donate}>
				<Card>
					<h2>Donate</h2>
					<p>
						<div class={style.icons}>
							<a href="https://www.paypal.me/MariusNiveri/1.29eur"><DoughnutIcon title="I love donuts (1.29€)" /></a>
							<a href="https://www.paypal.me/MariusNiveri/4.9eur"><BeerIcon title="Buy me a beer (4.9€)" /></a>
							<a href="https://www.paypal.me/MariusNiveri/9.5eur"><PizzaIcon title="Donate me a pizza (9.5€)" /></a>
							<a href="https://www.paypal.me/MariusNiveri/14.99eur"><ChickenIcon title="Nothing tops a good ol' KFC bucket (14.99€)" /></a>
							<a href="https://www.paypal.me/MariusNiveri/59.49eur"><BrushIcon title="Or a month of Adobe (59.49€)" /></a>
						</div>
						Hi there, I am happy that you are thinking of giving me a small tip for my work.<br />
						Maintaining open source projects like this one is fun and important but bills still have to be payed so every donation is very much appreciated.<br />
						You can either choose one of the things above or <a href="https://www.paypal.me/MariusNiveri/">set the amount you wish to tip</a> :)<br /><br />
						
						The links above will redirect you to PayPal which I think will be just fine for this purpose and even if you don't have an account you should be able to just use a credit card without having to log in.<br />
						But if you have some crypto coins laying around somewhere you also can use those as a tip by using <a onClick={this.shapeshiftClick} href="https://shapeshift.io/shifty.html?destination=1Lg9BjkTaGkXfhU54LkG91fkQRUunBDSYR&output=BCH&apiKey=9623e7650ab4c717e953bd4d6461fa81372208af22f9b2e56bab1393605a43b2ac7e0db570552fd2073a3c0c5ae9702827e061c2af2d43969e66fdc8f5683835">ShapeShift</a>.
					</p>
				</Card>
			</div>
		);
	}
}