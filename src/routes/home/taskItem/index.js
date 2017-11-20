import { h, Component } from 'preact';
import { firestore, auth } from '../../../lib/firebase';
import { observer } from 'preact-mobx';

import AttachmentItem from './attachmentItem';

import style from './style';

@observer
export default class TaskItem extends Component {

	deleteTask() {
		if (this.taskElement) this.taskElement.style.transform = 'translatex(100vw)';
		if (this.wrapperElement) this.wrapperElement.style.transform = 'translatex(100vw)';
		if (this.wrapperElement) this.wrapperElement.style.maxHeight = '0px';

		setTimeout(() => {

			const task = this.props.task;
			
			firestore
				.collection('user-data')
				.doc(auth.currentUser.uid)
				.collection('tasks')
				.doc(this.props.task.id)
				.delete()
				.then(() => {
					this.props.uiStore.showSnackbar('Task deleted', 'UNDO', 2500, () => {
						firestore
							.collection('user-data')
							.doc(auth.currentUser.uid)
							.collection('tasks')
							.doc(this.props.task.id)
							.set({
								title: task.title,
								due: task.due,
								created: task.created,
								group: task.group,
								done: task.done
							})
							.then(() => this.props.uiStore.showSnackbar('Task restored', null, 2500))
							.catch(err => this.props.uiStore.showSnackbar('Error restoring Task: ', err, 'OKAY', 5000));
					});
				})
				.catch(err => {
					this.wrapperElement.style.transform = 'translatex(0)';
					this.wrapperElement.style.maxHeight = '256px';
					this.taskElement.style.transform = 'translatex(0)';
					this.iconsElement.style.background = 'linear-gradient(to right, rgba(16, 157, 89, 1) 0%, rgba(16, 157, 89, 1) 50%, rgba(237, 163, 2, 1) 50%, rgba(237, 163, 2, 1) 100%)';
					this.props.uiStore.showSnackbar('Error deleting task: ' + err, 'OKAY', 5000);
				});
		}, 300);
	}

	componentDidMount() {
		const element = this.taskElement;

		let startx;
		let move = true;

		const toggleTransition = bool => {
			element.style.transition = bool ? 'transform .13s ease-in-out' : 'none';
		};

		const touchstart = e => {
			move = true;
			if (e.path[0].classList.contains(style.attachments) || e.path[1].classList.contains(style.attachments) || e.path[2].classList.contains(style.attachments) || e.path[3].classList.contains(style.attachments)) move = false;
			toggleTransition(false);
			let touchobj = e.changedTouches[0];
			startx = parseInt(touchobj.clientX, 10);
			if (startx <= 25) move = false;
		};

		const touchmove = e => {
			if (move) {
				let touchobj = e.changedTouches[0];
				let dist = parseInt(touchobj.clientX, 10) - startx;
				element.style.transform = 'translatex('+dist+'px)';
				if (this.iconsElement) this.iconsElement.style.background = (dist > 0) ? 'rgba(16, 157, 89, 1)' : 'rgba(237, 163, 2, 1)';
			}
		};

		const touchend = e => {
			if (move) {
				let touchobj = e.changedTouches[0];
				toggleTransition(true);
				const diff = (startx - touchobj.clientX);
				if (diff < -95) {
					this.deleteTask();
				}
				else if (diff > 95 && diff > 0) element.style.transform = 'translatex(-100vw)';
				else {
					element.style.transform = 'translatex(0)';
					if (this.iconsElement) this.iconsElement.style.background = 'linear-gradient(to right, rgba(16, 157, 89, 1) 0%, rgba(16, 157, 89, 1) 50%, rgba(237, 163, 2, 1) 50%, rgba(237, 163, 2, 1) 100%)';
				}
			}
		};

		element.removeEventListener('touchstart', touchstart);
		element.removeEventListener('touchmove', touchmove);
		element.removeEventListener('touchend', touchend);

		element.addEventListener('touchstart', touchstart, { passive: true });
		element.addEventListener('touchmove', touchmove, { passive: true });
		element.addEventListener('touchend', touchend, { passive: true });

		if (this.wrapperElement && this.taskElement) {
			this.wrapperElement.style = null;
			this.taskElement.style = null;
		}
	}

	render({ task }) {

		
		const {
			title,
			done,
			timeLeft,
			numberOfAttachments,
			attachments,
			colorByGroup
		} = task;

		return (
			<div ref={el => this.wrapperElement = el} class={style.wrapper}>
	
				<div onClick={this.deleteTask.bind(this)} class={style.hoverRecievers + ' ' + style.leftReciever} />
				<div class={style.hoverRecievers + ' ' + style.rightReciever} />
	
				<div ref={el => this.taskElement = el} class={style.taskitem + ' card box-shadow-lvl-1 ' + (done && style.done)}>
	
					<div class={style.colorIndicator} style={{
						backgroundColor: colorByGroup
					}}
					/>
	
					<h2>{title}</h2>
	
					<h3>{timeLeft}</h3>

					<div class={style.attachments}>
						{numberOfAttachments && attachments.map(attachment => (
							<AttachmentItem key={attachment.id} attachment={attachment} color={colorByGroup} />
						))}
					</div>
	
				</div>
	
				<div ref={el => this.iconsElement = el} class={style.icons}>
					<i class="material-icons">&#xE876;</i>
					<i class="material-icons">&#xE3C9;</i>
				</div>
			</div>
		);
	}
}