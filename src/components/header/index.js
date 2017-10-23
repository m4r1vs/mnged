import { h } from 'preact';

import style from './style';

const toggleDarkMode = () => {
	document.body.classList.toggle('nightmode');
	if (localStorage.getItem('nightmode') === 'true') localStorage.setItem('nightmode', 'false');
	else localStorage.setItem('nightmode', 'true');
};

const Header = props => {

	const openDrawer = e => {
		if (typeof window === 'object') {
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
	};

	if (props.nightmode === true) document.body.classList.add('nightmode');

	return (
		<header class={style.header} id="header">

			<div class={style.navbtn} id="navbtn" onClick={openDrawer}>
				<span id="navbtn-span1" />
				<span id="navbtn-span2" />
				<span id="navbtn-span3" />
			</div>

			<h1>{props.title}</h1>

			{!props.action && <i style={{ display: 'block', cursor: 'pointer' }} class={style.moreMenuIcon + ' material-icons'}>&#xE5D4;</i>}
			{props.action && <i onClick={() => props.action()} class="material-icons">{props.actionIcon}</i>}

			<div class={style.moreMenu} id="moreMenu">
				<ul>
					<li onClick={toggleDarkMode}>Toggle darkmode</li>
					<li>option 2</li>
					<li>option 3</li>
				</ul>
			</div>

		</header>
	);
};

export default Header;