import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import style from './style';

@observer
export default class Header extends Component {

	toggleDarkMode() {
		if (typeof window !== 'undefined') {
			document.body.classList.toggle('nightmode');
			if (localStorage.getItem('nightmode') === 'true') localStorage.setItem('nightmode', 'false');
			else localStorage.setItem('nightmode', 'true');
		}
	}

	openDrawer(e) {
		if (typeof window !== 'undefined') {
			if (e.path[0].id === 'navbtn-arrow' || e.path[1].id === 'navbtn-arrow') window.history.back();
			else {
				document.body.style.overflow = 'hidden';

				const drawer = document.getElementById('drawer');
				const greyback = document.getElementById('drawerback');

				greyback.style.display = 'block';

				drawer.style.transition = 'margin-left .16s cubic-bezier(0.0, 0.0, 0.2, 1)';
				greyback.style.transition = 'opacity .16s linear';

				drawer.style.opacity = '1';
				greyback.style.opacity = '1';

				drawer.style.marginLeft = '0px';
			}
		}
	}

	componentDidMount() {
		if (this.props.nightmode === true) document.body.classList.add('nightmode');
	}

	render({ stores }) {

		const { subPage } = stores.uiStore;
		
		return (
			<header class={style.header} id={subPage ? 'header-big' : 'header'} style={{ backgroundColor: subPage ? (subPage.headerColor || '') : '' }}>

				<div class={style.navbtn} id={subPage ? 'navbtn-arrow' : 'navbtn'} onClick={this.openDrawer}>
					<span id="navbtn-span1" />
					<span id="navbtn-span2" />
					<span id="navbtn-span3" />
				</div>

				<h1>{subPage ? subPage.headerTitle : 'Managed Me!'}</h1>

				{!subPage && <i style={{ display: 'block', cursor: 'pointer' }} class={style.moreMenuIcon + ' material-icons'}>&#xE5D4;</i>}
				{subPage && <i onClick={() => subPage.headerAction()} class="material-icons">{subPage.headerActionIcon}</i>}

				<div class={style.moreMenu} id="moreMenu">
					<ul>
						<li onClick={this.toggleDarkMode}>Toggle darkmode</li>
						<li>option 2</li>
						<li>option 3</li>
					</ul>
				</div>

			</header>
		);
	}
}