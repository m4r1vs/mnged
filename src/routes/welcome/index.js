import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { auth, googleAuthProvider, facebookAuthProvider, githubAuthProvider, twitterAuthProvider } from '../../lib/firebase';

import style from './style';

export default class Welcome extends Component {
  
	/**
   * Sign in the user with a provider
   * @param {provider} provider the provider such as googleAuthProvider
   */
	signInWithProvider(provider) {
		auth.signInWithPopup(provider).then((result) => {
			this.props.stores.uiStore.showSnackbar(
				'Signed in as ' + result.user.email,
				null,
				3500
			);
		}, (error) => {
			if (error.code === 'auth/account-exists-with-different-credential') {
				this.props.stores.uiStore.showSnackbar(
					'An account already exists with the same email address but different sign-in credentials. Sign in usign a provider associated with this email address.',
					'OKAY',
					10000
				);
			}
			else {
				this.props.stores.uiStore.showSnackbar(
					'An error occured during sign in, try it again or contact us. Error: ' + error.code,
					'OKAY',
					10000
				);
			}
		});
	}

	componentDidMount() {
		console.warn('WELCOME COMPONENT DID MOUNT');
	}

	render({ stores }) {
		return (
			<div class={style.welcome}>
			
				<svg class={style.bg} viewBox="0 0 800 600" preserveAspectRatio="xMinYMid slice">
					
					<g class={style.stars}>
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
						<circle />
					</g>

				</svg>

				<div class={style.welcomeCard}>
					<div class={style.rocket} transition="fadeUp" />
        	<h1 transition="fadeUp">
						Welcome to <strong>MNGED</strong>ME!
					</h1>
					<h2 transition="fadeUp">Get sh*t done with the taskmanager from outer space!</h2>
					<button
						transition="fadeUp"
						onClick={() => this.signInWithProvider(googleAuthProvider)}
						class="fadeInSlow inactive"
					>
						SIGN INTO MNGED
					</button>
					<Link href="/register">create account</Link>
				</div>
			</div>
		);
	}
}