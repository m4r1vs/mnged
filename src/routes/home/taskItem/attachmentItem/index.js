import { h } from 'preact';

import style from './style';


const AttachmentItem = props => {
	const {
		type,
		title,
		content,
		created
	} = props.attachment;
  
	const { color } = props;
  
	return (
		<div title={title} class={style.attachmentItem} style={{ backgroundColor: color, backgroundImage: type === 'image' ? ('url(' + content + ')') : null }}>
			{(type === 'note') && (<h4>{title}</h4>)}
			{(type === 'note') && (<p title={content}>{content}</p>)}
		</div>
	);
};

export default AttachmentItem;