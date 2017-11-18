import { h, Component } from 'preact';

import style from './style';

export default class TaskItem extends Component {

	componentDidMount() {
		const element = window.el = this.taskElement;
		let startx;

		const toggleTransition = bool => {
			element.style.transition = bool ? 'transform .13s ease-in-out' : 'none';
		}

		element.addEventListener('touchstart', e => {
			toggleTransition(false);
			let touchobj = e.changedTouches[0];
			startx = parseInt(touchobj.clientX, 10);
		}, { passive: true });

		element.addEventListener('touchmove', e => {
			let touchobj = e.changedTouches[0];
			let dist = parseInt(touchobj.clientX, 10) - startx;
			element.style.transform = 'translatex('+dist+'px)';
			this.iconsElement.style.background = (dist > 0) ? 'rgba(16, 157, 89, 1)' : 'rgba(237, 163, 2, 1)';
		}, { passive: true });

		element.addEventListener('touchend', e => {
			let touchobj = e.changedTouches[0];
			toggleTransition(true);
			const diff = (startx - touchobj.clientX);
			if (diff < -95) {
				element.style.transform = 'translatex(100vw)';
				this.wrapperElement.style.transform = 'translatex(100vw)';
				this.wrapperElement.style.height = '0';
				setTimeout(() => {
					this.wrapperElement.style.display = 'none';
					this.props.uiStore.showSnackbar('Task deleted', 'UNDO', 2500);
				}, 300);
			}
			else if (diff > 95 && diff > 0) element.style.transform = 'translatex(-100vw)';
			else {
				element.style.transform = 'translatex(0)';
				this.iconsElement.style.background = 'linear-gradient(to right, rgba(16, 157, 89, 1) 0%, rgba(16, 157, 89, 1) 50%, rgba(237, 163, 2, 1) 50%, rgba(237, 163, 2, 1) 100%)';
			}
		}, { passive: true });
	}

	render({ task }) {
		
		const {
			title,
			done,
			timeLeft,
			numberOfAttachments,
			colorByGroup
		} = task;

		return (
			<div ref={el => this.wrapperElement = el} class={style.wrapper}>
	
				<div class={style.hoverRecievers + ' ' + style.leftReciever} />
				<div class={style.hoverRecievers + ' ' + style.rightReciever} />
	
				<div ref={el => this.taskElement = el} class={style.taskitem + ' card box-shadow-lvl-1 ' + (done && style.done)}>
	
					<div class={style.colorIndicator} style={{
						backgroundColor: colorByGroup
					}}
					/>
	
					<h2>{title}</h2>
	
					<h3>
						<span class={style.time}>{timeLeft}</span>
						<span class={style.attachments}>{numberOfAttachments}</span>
					</h3>
	
				</div>
	
				<div ref={el => this.iconsElement = el} class={style.icons}>
					<i class="material-icons">&#xE876;</i>
					<i class="material-icons">&#xE3C9;</i>
				</div>
			</div>
		);
	}
}