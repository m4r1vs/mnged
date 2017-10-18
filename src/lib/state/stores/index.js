import { observable } from 'mobx';

import TaskStore from './taskStore';
import ClassesStore from './classesStore';
import UiStore from './uiStore';
import UserStore from './userStore';

export class Stores {
	@observable taskStore = new TaskStore()
	@observable classesStore = new ClassesStore()
	@observable uiStore = new UiStore()
	@observable userStore = new UserStore()
}

export default new Stores();