import { observable, useStrict, action } from 'mobx';
useStrict();

import TaskStore from './taskStore';
import UiStore from './uiStore';
import UserStore from './userStore';

export class Stores {
	@observable taskStore = new TaskStore()
	@observable uiStore = new UiStore()
	@observable userStore = new UserStore()

	/**
	 * Resets all database-related stores to initial state
	 */
	@action reset() {
		this.taskStore = new TaskStore();
	}

}

export default new Stores();