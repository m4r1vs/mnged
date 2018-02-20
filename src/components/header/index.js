import { h, Component } from 'preact';
import { observer } from 'preact-mobx';
import style from './style';

@observer
export default class Header extends Component {

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

	scrollToTop() {
		let scrollDuration = 512,
			cosParameter = document.body.scrollTop / 2,
			scrollCount = 0,
			oldTimestamp = performance.now();

		const step = newTimestamp => {
			scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
			if (scrollCount >= Math.PI) document.body.scrollTo(0, 0);
			if (document.body.scrollTop === 0) return;
			document.body.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
			oldTimestamp = newTimestamp;
			window.requestAnimationFrame(step);
		};

		window.requestAnimationFrame(step);
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

				<i class={'material-icons ' + style.mngedIcon}>school</i>

				<h1 onClick={this.scrollToTop}>{subPage ? subPage.headerTitle : 'Managed Me!'}</h1>

				{subPage && <i onClick={() => subPage.headerAction()} class={'material-icons ' + style.actionsIcon}>{subPage.headerActionIcon}</i>}

			</header>
		);
	}
}