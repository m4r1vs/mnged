import { h, Component } from 'preact';
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
        Welcome to MNGED!
        <button onClick={() => this.signInWithProvider(googleAuthProvider)}> SIGN IN</button>
			</div>
		);
	}
}