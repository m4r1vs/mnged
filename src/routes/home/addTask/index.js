import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import { route } from 'preact-router';
import { firestore, auth } from '../../../lib/firebase';

import RadioInput from '../../../components/radioInput';

import style from './style';

@observer
export default class AddTask extends Component {

	createTask(e) {
		e.preventDefault();
    
		if (!this.inputTask.value) {
			this.props.stores.uiStore.showSnackbar(`Please don't submit an empty Task`, null, 4500);
			return false;
		}
    
		firestore
			.collection('user-data')
			.doc(auth.currentUser.uid)
			.collection('tasks')
			.add({
				title: this.inputTask.value,
				due: this.state.dueDate ? this.state.dueDate : null,
				created: new Date(),
				group: this.state.selectedGroupColor || null
			})
			.then(task => {
				this.inputTask.value = '';
				this.setState({ selectedGroupColor: null });
				this.contractForm();
				this.props.stores.uiStore.showSnackbar(`Task successfully created!`, 'SHOW', 4500, () => route('/task/' + task.id));
			})
			.catch(err => {
				console.error(err);
				this.props.stores.uiStore.showSnackbar(`Error creating Task. See console for technical information`, null, 4500);
			});
	}
	
	expandForm() {
		this.colorIndicatorElement.classList.add(style.active);
		this.moreActions.style.height = '100%';
		this.moreActions.style.transform = 'scaley(1)';
		this.formElement.style.minHeight = '84px';
		this.formElement.style.height = 'auto';
	}
	
	contractForm() {
		this.colorIndicatorElement.classList.remove(style.active);
		this.moreActions.style.height = '0px';
		this.moreActions.style.transform = 'scaley(0)';
		this.formElement.style.minHeight = '56px';
		this.formElement.style.height = '56px';
	}
	
	submitOnEnter(e) {
		if ((e && e.keyCode === 13) || e === 0) {
			this.createTask(e);
		}

		this.inputTask.style.height = this.inputTask.scrollHeight + 'px';

		if (this.inputTask.value !== '') this.expandForm();
		else this.contractForm();
	}

	addGroup(e) {
		e.preventDefault();

		this.props.stores.uiStore.openDialog('Add to a Group', (
			<form>
				<RadioInput eventHandlerChange={this.setSelectedGroup} eventHandlerKeyUp={this.closeDialogOnEnter} value="No group" id="1" group="group" />
				{this.groups.map(group => (
					<RadioInput eventHandlerChange={this.setSelectedGroup} eventHandlerKeyUp={this.closeDialogOnEnter} value={group.name} id={group.id} group="group" />
				))}
			</form>
		));
	}

	setDueDate(e) {
		e.preventDefault();
		if (!this.state.dueDate) this.props.stores.uiStore.datePicker.open(dueDate => this.setState({ dueDate }));
		else this.setState({ dueDate: null });
	}

	setSelectedGroup(e) {
		this.setState({ selectedGroupColor: e.target.value });
	}

	closeDialogOnEnter(e) {
		if ((e && e.keyCode === 13) || e === 0) {
			this.props.stores.uiStore.closeDialog();
		}
	}
	
	constructor() {
		super();

		this.state = null;

		this.groups = [
			{
				id: 'orange',
				name: 'Shopping'
			},
			{
				id: 'red',
				name: 'Web Development'
			},
			{
				id: 'purple',
				name: 'School'
			},
			{
				id: 'blue',
				name: 'Familiy'
			}
		];
		
		this.createTask = this.createTask.bind(this);
		this.expandForm = this.expandForm.bind(this);
		this.contractForm = this.contractForm.bind(this);
		this.addGroup = this.addGroup.bind(this);
		this.setDueDate = this.setDueDate.bind(this);
		this.setSelectedGroup = this.setSelectedGroup.bind(this);
		this.submitOnEnter = this.submitOnEnter.bind(this);
		this.closeDialogOnEnter = this.closeDialogOnEnter.bind(this);
	}
	
	componentDidMount() {
		this.inputTask.style.maxWidth = (this.formElement.clientWidth - 32) + 'px';
		this.inputTask.style.minWidth = (this.formElement.clientWidth - 32) + 'px';

		window.addEventListener('resize', () => {
			this.inputTask.style.maxWidth = (this.formElement.clientWidth - 32) + 'px';
			this.inputTask.style.minWidth = (this.formElement.clientWidth - 32) + 'px';
		});
	}

	render() {

		return (
			<form id="taskInputForm" class={style.addTask + ' card box-shadow-lvl-2'} ref={el => this.formElement = el} onSubmit={this.createTask} autocomplete="off">
				<div ref={el => this.colorIndicatorElement = el} class={style.colorIndicator} style={{ background: this.state.selectedGroupColor || '#78909c' }} />
				
				<textarea ref={el => this.inputTask = el} onKeyUp={this.submitOnEnter} type="text" name="task"
					placeholder="I want to.." autocomplete="off"
				/>

				<div ref={el => this.moreActions = el} class={style.moreActions}>

					<button title="Add to group" onClick={this.addGroup}><i class="material-icons">&#xE2CC;</i></button>
					<button title="Remind me" onClick={this.setDueDate}><i class="material-icons">{this.state.dueDate ? 'notifications_active' : 'notifications_none'}</i></button>
					
					<input style={{ float: 'right' }} type="submit" value="Create" />
					<span>{this.state.dueDate && this.state.dueDate.toLocaleDateString()}</span>
				</div>
			</form>
		);
	}
}