import { h } from 'preact';

import style from './style';

const TaskItem = props => {

	const {
		title,
		done,
		timeLeft,
		numberOfAttachments,
		colorByGroup
	} = props.task;

	return (
		<div class={style.wrapper}>

			<div class={style.hoverRecievers + ' ' + style.leftReciever} />
			<div class={style.hoverRecievers + ' ' + style.rightReciever} />

			<div class={style.taskitem + ' card box-shadow-lvl-1 ' + (done && style.done)}>

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

			<div class={style.icons}>
				<i class="material-icons">&#xE876;</i>
				<i class="material-icons">&#xE3C9;</i>
			</div>
		</div>
	);
};

export default TaskItem;