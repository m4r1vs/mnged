import { h, Component } from 'preact';

import { firestore } from '../../../lib/firebase';
import style from './style';

const template = [
	[ 'block_a', 'Block A' ],
	[ 'block_b', 'Block B' ],
	[ 'block_c', 'Block C' ],
	[ 'block_d', 'Block D' ],
	[ 'block_e', 'Block E' ],
	[ 'block_f', 'Block F' ],
	[ 'block_g', 'Block G' ],
	[ 'block_h', 'Block H' ],
	[ 'flex', 'Flex' ]
];

let myState = {
	block_a: {},
	block_b: {},
	block_c: {},
	block_d: {},
	block_e: {},
	block_f: {},
	block_g: {},
	block_h: {},
	flex: {}
};

export default class SetClass extends Component {
	
	handleChange(evt) {
		myState[evt.target.name.split('-')[0]][evt.target.name.split('-')[1]] = evt.target.value;
		console.log(myState);
	}

	proccessForm(evt) {
		evt.preventDefault();
		const fireRef = firestore
			.collection('users')
			.doc(this.props.state.user.uid)
			.collection('schedule');
		
		fireRef.doc('classes').set(myState);

		const date = new Date();
		fireRef.doc('info').set({
			schedule: true,
			lastEdit: date.getTime()
		}).then(() => location.reload());

	}
	
	constructor() {
		super();
		this.state = null;
	}

	renderInput(item) {
		return (
			<div class={style.inputGroup}>
				<h4 class={style.title}>{item[1]}:</h4>
				{item[0] !== 'flex' && <div class={style.input}>
					<input onChange={this.handleChange.bind(this)}
						type="text" name={item[0]+'-class'}
						required
					/>
					<span class={style.highlight} />
					<span class={style.bar} />
					<label for={item[0] + '-class'}>Class</label>
				</div>}
				<div class={style.input}>
					<input onChange={this.handleChange.bind(this)}
						type="text" name={item[0] + '-room'}
						required
					/>
					<span class={style.highlight} />
					<span class={style.bar} />
					<label for={item[0] + '-room'}>Room</label>
				</div>
				<div class={style.input}>
					<input onChange={this.handleChange.bind(this)}
						type="text" name={item[0] + '-teacher'}
						required
					/>
					<span class={style.highlight} />
					<span class={style.bar} />
					<label for={item[0] + '-teacher'}>Teacher</label>
				</div>
				<div class={style.input}>
					<center>
						<input
							onChange={this.handleChange.bind(this)}
							style={{ backgroundColor: '#ff1744' }}
							required
							type="radio"
							value="#ff1744"
							name={item[0] + '-color'}
						/>
						<input
							onChange={this.handleChange.bind(this)}
							style={{ backgroundColor: '#d500f9' }}
							required
							type="radio"
							value="#d500f9"
							name={item[0] + '-color'}
						/>
						<input
							onChange={this.handleChange.bind(this)}
							style={{ backgroundColor: '#2979ff' }}
							required
							type="radio"
							value="#2979ff"
							name={item[0] + '-color'}
						/>
						<input
							onChange={this.handleChange.bind(this)}
							style={{ backgroundColor: '#1de9b6' }}
							required
							type="radio"
							value="#1de9b6"
							name={item[0] + '-color'}
						/>
						<input
							onChange={this.handleChange.bind(this)}
							style={{ backgroundColor: '#ffea00' }}
							required
							type="radio"
							value="#ffea00"
							name={item[0] + '-color'}
						/>
						<input
							onChange={this.handleChange.bind(this)}
							style={{ backgroundColor: '#ff9100' }}
							required
							type="radio"
							value="#ff9100"
							name={item[0] + '-color'}
						/>
						<input
							onChange={this.handleChange.bind(this)}
							style={{ backgroundColor: '#8d6e63' }}
							required
							type="radio"
							value="#8d6e63"
							name={item[0] + '-color'}
						/>
						<input
							onChange={this.handleChange.bind(this)}
							style={{ backgroundColor: '#78909c' }}
							required
							type="radio"
							value="#78909c"
							name={item[0] + '-color'}
						/>
					</center>
				</div>
			</div>);
	}

	render() {
		return (
			<div class={style.wrapper}>
				<span>Before you can start using mnged, we need your schedule. Please insert your class, room and teacher for the corresponding block:</span>
				<form onSubmit={this.proccessForm.bind(this)}>
					{template.map((item, i) => (
						<div>{this.renderInput(item)}</div>
					))}
					<input type="submit" value="Set classes" />
				</form>
			</div>
		);
	}
}