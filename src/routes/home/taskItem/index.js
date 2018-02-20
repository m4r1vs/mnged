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
					this.props.uiStore.showSnackbar('Done with task!', 'UNDO', 2500, () => {
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
					this.wrapperElement.style.transform = 'translatex(0) scaley(100%)';
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
		let starty;
		let move = true;

		const toggleTransition = bool => {
			element.style.transition = bool ? 'transform .13s ease-in-out' : 'none';
		};

		const touchstart = e => {
			move = true;
			toggleTransition(false);
			let touchobj = e.changedTouches[0];
			startx = parseInt(touchobj.clientX, 10);
			starty = parseInt(touchobj.clientY, 10);
			if (startx <= 25) move = false;
		};

		const touchmove = e => {
			if (move) {
				let touchobj = e.changedTouches[0];
				const distxRaw = parseInt(touchobj.clientX, 10) - startx;
				const distyRaw = parseInt(touchobj.clientY, 10) - starty;

				let distx = distxRaw < 0 ? distxRaw * -1 : distxRaw;
				let disty = distyRaw < 0 ? distyRaw * -1 : distyRaw;

				if (disty > distx) {
					toggleTransition(true);
					element.style.transform = 'translatex(0)';
					move = false;
				}
				else {
					element.style.transform = 'translatex(' + distxRaw + 'px)';
				}
				if (this.iconsElement) this.iconsElement.style.background = (distxRaw > 0) ? 'rgba(16, 157, 89, 1)' : 'rgba(237, 163, 2, 1)';
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
			timeReadable,
			firstTwoAttachments,
			numberOfAttachments,
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

					<div class={style.attachments}>
						{firstTwoAttachments && firstTwoAttachments.map(attachment => (
							<AttachmentItem key={attachment.id} attachment={attachment} color={colorByGroup} />
						))}
						{(numberOfAttachments > 2) && <div class={style.moreAttachmentsIndicator}><h4>+{numberOfAttachments - 2}<br />more</h4></div>}
					</div>

					<h3 class={(timeLeft === 'overdue') && style.overdue}>
						<i class="material-icons">&#xE7F4;</i>
						{' ' + timeReadable}
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