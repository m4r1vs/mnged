import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import { auth } from '../../lib/firebase';

import { TasksIcon, NotesIcon, ProjectsIcon, SettingsIcon, FeedbackIcon, AboutIcon, LogoutIcon, DonationIcon } from './icons';

import { observer } from 'preact-mobx';
import style from './style';

@observer
export default class Nav extends Component {
  
	toggleMore() {
		this.setState({ moreOpened: !this.state.moreOpened });
	}
  
	closeDrawer() {
		if (typeof window === 'object') {
			window.closeDrawer();
		}
	}
  
	constructor() {
		super();

		this.state = {
			moreOpened: false
		};
	}

	componentDidMount() {
		if (typeof window === 'object') {

			document.querySelectorAll('.applyHoverEffect').forEach((element) => {
				const hoverColor = element.getAttribute('fill'); // get the fill color

				// set it as a custom property inline
				if (hoverColor) element.style.setProperty('--hover-color', hoverColor);
			});
			
			const panel = document.getElementById('main_component');
			const drawer = this.drawer;
			const greyback = document.getElementById('drawerback');

			let drawerwidth = drawer.offsetWidth;
			let startx = 0;
			let distgrey = 0;
			let open = false;
			let opened = false;
			let greybackstartx = 0;
      
			const drawerTransition = (state, bezier) => {
				if (state) {
					if (bezier === 'in') {
						drawer.style.transition = 'margin-left .225s cubic-bezier(0.0, 0.0, 0.2, 1), opacity .225s cubic-bezier(1,0,1,0)';
					}
					else if (bezier === 'out') {
						drawer.style.transition = 'margin-left .195s cubic-bezier(0.4, 0.0, 0.6, 1), opacity .195s cubic-bezier(1,0,1,0)';
					}
					greyback.style.transition = 'opacity .225s linear';
				}
				else {
					drawer.style.transition = 'none';
					greyback.style.transition = 'none';
				}
			};
      
			const drawerClosing = () => {
				document.body.style.overflow = 'auto';
				opened = false;
				drawer.style.marginLeft = '-' + drawerwidth + 'px';
				drawer.style.opacity = '0';
				greyback.style.opacity = '0';
				setTimeout(() => {
					greyback.style.display = 'none';
				}, 225);
			};
      
			const drawerOpening = () => {
				document.body.style.overflow = 'hidden';
				opened = true;
				drawer.style.marginLeft = '0px';
				drawer.style.opacity = '1';
				greyback.style.opacity = '1';
				greyback.style.display = 'block';
			};
      
			window.closeDrawer = bool => {
				if (!bool) {
					drawerTransition(true, 'out');
				}
				else {
					drawerTransition(false, false);
				}
				drawerwidth = drawer.offsetWidth;
				drawerClosing();
			};

			window.addEventListener('resize', (e) => {
				window.closeDrawer(true);
			});
      
			panel.addEventListener('touchstart', (e) => {
				let touchobj = e.changedTouches[0];
				
				drawerTransition(false, false);
				
				startx = parseInt(touchobj.clientX, 10);
				if (startx < 25 && document.getElementById('navbtn')) {
					this.setState({ opened: true });
					drawer.style.opacity = '1';
					greyback.style.opacity = '0';
					greyback.style.display = 'block';
					open = true;
				}
				else {
					open = false;
				}
			}, {
				passive: true
			});
      
			panel.addEventListener('touchmove', (e) => {
				let touchobj = e.changedTouches[0];
				let dist = parseInt(touchobj.clientX, 10) - startx;
				if (open) {
					document.body.style.overflow = 'hidden';
					drawerwidth = drawer.offsetWidth;
					
					if (dist <= drawerwidth) {
						drawer.style.marginLeft = dist - drawerwidth + 'px';
						greyback.style.opacity = dist / drawerwidth;
					}
				}
			}, {
				passive: true
			});
      
			panel.addEventListener('touchend', (e) => {
				drawerTransition(true, 'in');
				let touchobj = e.changedTouches[0]; // Der erste Finger der den Bildschirm berührt wird gezählt
				if (open) {
					if (touchobj.clientX > 95) {
						greyback.style.opacity = '1';
						drawer.style.marginLeft = '0px';
					}
					else {
						drawerClosing();
					}
				}
			}, {
				passive: true
			});
      
			greyback.addEventListener('touchstart', (e) => {
				drawerTransition(false, false);
				let touchobj = e.changedTouches[0]; // Der erste Finger der den Bildschirm berührt wird gezählt
				greybackstartx = parseInt(touchobj.clientX, 10);
			}, {
				passive: true
			});
			
			greyback.addEventListener('touchmove', (e) => {
				let touchobj = e.changedTouches[0];
				distgrey = parseInt(touchobj.clientX, 10) - greybackstartx;
				if (distgrey < 0) {
					drawerwidth = drawer.offsetWidth;
					
					drawer.style.marginLeft = distgrey + 'px';
					greyback.style.opacity = 1 - (Math.abs(distgrey / drawerwidth));
				}
			}, {
				passive: true
			});
			
			greyback.addEventListener('touchend', () => {
				drawerwidth = drawer.offsetWidth;
				
				if (distgrey > -80) {
					drawerTransition(true, 'in');
					drawerOpening();
				}
				else {
					drawerTransition(true, 'out');
					drawerClosing();
				}
			}, {
				passive: true
			});
		}
	}
	
	render() {
		
		const { user } = this.props.stores.userStore;
		const profilePic = user ? user.photoURL : '/assets/imgs/default_profile_picture.png';
		const headerURL = user ? user.headerURL : '/assets/imgs/default_header.jpg';
    
		const moreOpened = this.state.moreOpened;
		const toggleMoreVar = {
			className: moreOpened ? style.drawerHeaderMore : ''
		};
    
		const signOut = () => {
			this.closeDrawer();
			auth.signOut().then(() => {
				this.props.stores.uiStore.showSnackbar(
					'Signed out successfully',
					null,
					5000
				);
			}).catch((e) => {
				console.error(e);
				this.props.stores.uiStore.showSnackbar(
					'An error occured during sign out',
					'REPORT',
					10000,
					() => route('/feedback')
				);
			});
		};
    
		const styles = {
			profilePic: {
				backgroundImage: 'url(' + profilePic + ')'
			},
			headerPic: {
				backgroundImage: 'url(' + headerURL + ')'
			}
		};

		return (
			<div>
				<nav class={style.nav} ref={(nav) => { this.drawer = nav; }} id="drawer" >

					<div class={style.drawerHeader} style={styles.headerPic} >
            
						<div>
							<div class={style.drawerHeaderProfilePic} style={styles.profilePic} onClick={this.toggleMore.bind(this)} />
							<span class={style.drawerHeaderName} onClick={this.toggleMore.bind(this)}>{user ? user.name : 'Not logged in'}</span><br />
							<span class={style.drawerHeaderMail} onClick={this.toggleMore.bind(this)}>{user ? user.email : 'Not logged in'}</span>
							<i class={'material-icons ' + toggleMoreVar.className} onClick={this.toggleMore.bind(this)}>&#xE5C5;</i>
						</div>
            
					</div>

					<div class={style.drawerContent}>

						<div class={style.drawerSubContent} style={{ display: this.state.moreOpened ? 'none' : 'block' }} >

							<Link activeClassName="active" href="/" onClick={this.closeDrawer}><div><span> <TasksIcon />Tasks</span></div></Link>
							<Link activeClassName="active" href="/projects" onClick={this.closeDrawer}><div><span> <ProjectsIcon />Projects</span></div></Link>
							<Link activeClassName="active" href="/settings" onClick={this.closeDrawer}><div><span> <SettingsIcon />Settings</span></div></Link>
							<Link activeClassName="active" href="/about" onClick={this.closeDrawer}><div><span> <AboutIcon />About</span></div></Link>

						</div>
						
						<hr />

						<div class={style.drawerSubContent} style={{ display: this.state.moreOpened ? 'block' : 'none' }} >

							<Link activeClassName="active" href="/feedback" onClick={this.closeDrawer}><div><span> <FeedbackIcon />Feedback</span></div></Link>
							<Link activeClassName="active" href="/donate" onClick={this.closeDrawer}><div><span> <DonationIcon />Donate</span></div></Link>
							<Link href="/" onClick={signOut}><div><span> <LogoutIcon />Log Out</span></div></Link>
            
						</div>

					</div>

				</nav>
				<div class={style.drawerBack} onClick={this.closeDrawer} id="drawerback" />
			</div>
		);
	}
}
