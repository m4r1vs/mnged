import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { auth } from '../../lib/firebase';

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
	
	componentWillUpdate() {
		// if (this.props.store.user.loggedIn && !this.state.coverPhoto) {
		// 	console.log('user:', this.props.user);
		// 	if (this.props.user.providerData[0].providerId === 'google.com') {
		// 		const googleUid = this.props.user.providerData[0].uid;
		// 		fetch('https://www.googleapis.com/plus/v1/people/' + googleUid + '?fields=cover%2FcoverPhoto%2Furl&key=AIzaSyBBuZrztM5uYu1b0pLZiRI2J60XoDZZvVo').then((response) => response.json()).then((data) => {
		// 			if (typeof data.cover.coverPhoto.url === 'string') this.setState({ coverPhoto: data.cover.coverPhoto.url });
		// 		});
		// 	}
		// }
	}
	
	render() {
		
		const { user } = this.props.store;
		const profilePic = user.photoURL ? user.photoURL : '/assets/imgs/default_header.jpg';
    
		const moreOpened = this.state.moreOpened;
		const toggleMoreVar = {
			className: moreOpened ? style.drawerHeaderMore : ''
		};
    
		const signOut = () => {
			this.closeDrawer();
			auth.signOut();
		};
    
		const styles = {
			profilePic: {
				backgroundImage: 'url(' + profilePic + ')'
			},
			headerPic: {
				backgroundImage: 'url(' + (this.state.coverPhoto ? this.state.coverPhoto : '/assets/imgs/default_header.jpg') + ')'
			}
		};

		return (
			<div>
				<nav ref={(nav) => { this.drawer = nav; }} id="drawer" >

					<div class={style.drawerHeader} style={styles.headerPic} >
            
						<div>
							<div class={style.drawerHeaderProfilePic} style={styles.profilePic} onClick={this.toggleMore.bind(this)} />
							<span class={style.drawerHeaderName} onClick={this.toggleMore.bind(this)}>{user.loggedIn ? user.name : 'Not logged in'}</span><br />
							<span class={style.drawerHeaderMail} onClick={this.toggleMore.bind(this)}>{user.loggedIn ? user.email : 'Not logged in'}</span>
							<i class={'material-icons ' + toggleMoreVar.className} onClick={this.toggleMore.bind(this)}>&#xE5C5;</i>
						</div>
            
					</div>

					<div class={style.drawerContent}>

						<div class={style.drawerSubContent} style={{ display: this.state.moreOpened ? 'none' : 'block' }} >

							<Link activeClassName={style.active} href="/" onClick={this.closeDrawer}><div><span> <i className="material-icons">&#xE871;</i>Dashboard</span></div></Link>
							<Link activeClassName={style.active} href="/calendar" onClick={this.closeDrawer}><div><span> <i className="material-icons">&#xE878;</i>Calendar</span></div></Link>
							<Link activeClassName={style.active} href="/task/253014" onClick={this.closeDrawer}><div><span> <i className="material-icons">&#xE877;</i>Tasks</span></div></Link>
							<Link activeClassName={style.active} href="/exams" onClick={this.closeDrawer}><div><span> <i className="material-icons">&#xE3C9;</i>Exams</span></div></Link>
							<Link activeClassName={style.active} href="/classes" onClick={this.closeDrawer}><div><span> <i className="material-icons">&#xE54B;</i>Classes</span></div></Link>
            
						</div>
						
						<hr />

						<div class={style.drawerSubContent} style={{ display: this.state.moreOpened ? 'block' : 'none' }} >

							<Link activeClassName={style.active} href="/settings" onClick={this.closeDrawer}><div><span> <i className="material-icons">&#xE8B8;</i>Settings</span></div></Link>
							<Link activeClassName={style.active} href="/feedback" onClick={this.closeDrawer}><div><span> <i className="material-icons">&#xE87F;</i>Feedback</span></div></Link>
							<Link activeClassName={style.active} href="/about" onClick={this.closeDrawer}><div><span> <i className="material-icons">&#xE88F;</i>About</span></div></Link>
							<Link href="/" onClick={signOut}><div><span> <i className="material-icons">&#xE8AC;</i>Log Out</span></div></Link>
            
						</div>

					</div>

				</nav>
				<div class={style.drawerBack} onClick={this.closeDrawer} id="drawerback" />
			</div>
		);
	}
}
