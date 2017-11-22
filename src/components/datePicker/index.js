import { h, Component } from 'preact';
import { observer } from 'preact-mobx';

import style from './style';

@observer
export default class DatePicker extends Component {
	
	closeDatePicker() {
		this.props.uiStore.closeDatePicker();
	}
  
	dayClicked(e) {
		if (e.srcElement.innerHTML === '') return false;
		if (document.getElementsByClassName(style.selected).length > 0) document.getElementsByClassName(style.selected)[0].classList.remove(style.selected);
		e.srcElement.classList.add(style.selected);
    
		const dayArr = [
			'Sun',
			'Mon',
			'Tue',
			'Wed',
			'Thu',
			'Fri',
			'Sat'
		];
    
		const day = parseInt(e.srcElement.innerHTML, 10);
    
		const date = new Date(day + ' Nov 2017');
		const dayStr = dayArr[date.getDay()];

		const dateStr = dayStr + ', Nov ' + day;

	  this.setState({ current: {
			year: '2017',
			month: 'November',
			date: dateStr
		} });
	}
	
	constructor() {
		super();
		this.closeDatePicker = this.closeDatePicker.bind(this);
		this.dayClicked = this.dayClicked.bind(this);

		this.state = {
			current: {
				year: '2017',
				month: 'November',
				date: 'Wed, Nov 22'
			}
		};
	}
	
	render({ uiStore, children }) {
    
		const {
			current
		} = this.state;

		return (
			<div>
				<div class={style.datePicker + ' card box-shadow-lvl-4 ' + style.opened} >
					<div class={style.titles}>
					  <h3>{current.year}</h3>
						<h2>{current.date}</h2>
					</div>

					<nav>
						<i class="material-icons">&#xE314;</i>
						<h4>{current.month} {current.year}</h4>
						<i class="material-icons">&#xE315;</i>
					</nav>

					<div class={style.calendar} >
						<div class={style.dayNames}>
							<span>S</span>
							<span>M</span>
							<span>T</span>
							<span>W</span>
							<span>T</span>
							<span>F</span>
							<span>S</span>
						</div>
						<div onClick={this.dayClicked} class={style.days}>
							<span />
							<span />
							<span />
							<span>1</span>
							<span>2</span>
							<span>3</span>
							<span>4</span>

							<span>5</span>
							<span>6</span>
							<span>7</span>
							<span>8</span>
							<span>9</span>
							<span>10</span>
							<span>11</span>

							<span>12</span>
							<span>13</span>
							<span>14</span>
							<span>15</span>
							<span>16</span>
							<span>17</span>
							<span>18</span>

							<span>19</span>
							<span>20</span>
							<span>21</span>
							<span class={style.today + ' ' + style.selected} ref={el => this.todayElement = el}>22</span>
							<span>23</span>
							<span>24</span>
							<span>25</span>

							<span>26</span>
							<span>28</span>
							<span>29</span>
							<span>30</span>
							<span />
							<span />
							<span />

							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
						</div>
					</div>

					<div class={style.actions}>
						<button onClick={this.closeDatePicker}>CANCEL</button>
						<button onClick={this.closeDatePicker}>OK</button>
					</div>
				</div>
				<div class={style.background} onClick={this.closeDatePicker} style={{
					display: 'block'
				}}
				/>
			</div>
		);
	}
}