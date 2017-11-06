import { h, Component } from 'preact';
import { auth, googleAuthProvider, facebookAuthProvider, githubAuthProvider, twitterAuthProvider } from '../../lib/firebase';
import { observer } from 'preact-mobx';
import { route } from 'preact-router';
import style from './style';

import TextInput from '../../components/textInput';
import { DefaultButton } from '../../components/button';
import Card from '../../components/card';

@observer
export default class SignIn extends Component {

	signIn(provider) {
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

	signUpWithEmail(e) {

		e.preventDefault();

		this.signUpEmail.setAttribute('incomplete', 'false');
		this.signUpPassword.setAttribute('incomplete', 'false');
		this.signUpPasswordRepeated.setAttribute('incomplete', 'false');

		const email = this.signUpEmail.value;
		const password = this.signUpPassword.value;
		const repeatedPassword = this.signUpPasswordRepeated.value;

		if (password === repeatedPassword) {
			auth.createUserWithEmailAndPassword(email, password).catch((error) => {

				if (error.code === 'auth/email-already-in-use') {
					this.signUpEmail.setAttribute('incomplete', 'true');
					this.props.stores.uiStore.showSnackbar(
						'The provided email address is already in use by another account',
						'SIGN IN',
						10000,
						() => this.setState({ signInMethod: 'emailSignIn' })
					);
					return;
				}
				if (error.code === 'auth/invalid-email') this.signUpEmail.setAttribute('incomplete', 'true');
				if (error.code === 'auth/weak-password') this.signUpPassword.setAttribute('incomplete', 'true');

				const errorMessage = error.message;
				this.props.stores.uiStore.showSnackbar(
					'Error during sign up: ' + errorMessage,
					null,
					10000,
					() => route('/feedback')
				);

			});
		}
		else {
			this.signUpPassword.setAttribute('incomplete', 'true');
			this.signUpPasswordRepeated.setAttribute('incomplete', 'true');
			this.props.stores.uiStore.showSnackbar(
				'Your passwords must match',
				null,
				5000
			);
		}

	}

	signInWithEmail(e) {

		e.preventDefault();

		const email = this.signInEmail.value;
		const password = this.signInPassword.value;

		auth.signInWithEmailAndPassword(email, password).catch((error) => {
			
			const errorMessage = error.message;
			this.props.stores.uiStore.showSnackbar(
				'Error during sign in: ' + errorMessage,
				null,
				10000,
				() => route('/feedback')
			);
		});
	}

	render() {

		return (
			<section class={style.signin}>
				<Card class={style.card + ' fadeIn'}>
					<h2>Sign In</h2>
					<p>
						Hi, welcome back! Please use one of the following providers to sign in to MNGED. Or use you E-Mail and password to continue:
					</p>

					<center>

						<form onSubmit={this.signInWithEmail.bind(this)}>
							<TextInput name="E-Mail" inputRef={(input) => this.signInEmail = input} required />
							<TextInput inputType="password" name="Password" inputRef={(input) => this.signInPassword = input} required />
							<DefaultButton onClick={this.signInWithEmail.bind(this)} name="Sign in" style={{
								float: 'right',
								margin: '16px 0 8px 16px'
							}}
							/>
						</form>
						
						<hr data-content="OR" />

						<button tabIndex={1} style={{ background: '#d62d20' }} class={style.continueWith} onClick={() => this.signIn(googleAuthProvider)} >
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#fff" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#fff" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#fff" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#fff" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /><path fill="none" d="M0 0h48v48H0z" /></g></svg>
							<span>Sign in with Google</span>
						</button><br />
						<button tabIndex={1} style={{ background: '#3b5998' }} class={style.continueWith} onClick={() => this.signIn(facebookAuthProvider)} >
							<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
								viewBox="0 0 155.139 155.139" style="enable-background:new 0 0 155.139 155.139;" width="24px" height="24px"
							>
								<g>
									<path id="f_1_" d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184   c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452   v20.341H37.29v27.585h23.814v70.761H89.584z" fill="#fff" />
								</g>
							</svg>
							<span>Sign in with Facebook</span>
						</button><br />
						<button tabIndex={1} style={{ background: '#1da1f2' }} class={style.continueWith} onClick={() => this.signIn(twitterAuthProvider)} >
							<svg rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.00006 244.18703" height="24px" width="24px" version="1.1"
								cc="http://creativecommons.org/ns#" dc="http://purl.org/dc/elements/1.1/"
							>
								<g style="" transform="translate(-539.18 -568.86)">
									<path d="m633.9 812.04c112.46 0 173.96-93.168 173.96-173.96 0-2.6463-0.0539-5.2806-0.1726-7.903 11.938-8.6302 22.314-19.4 30.498-31.66-10.955 4.8694-22.744 8.1474-35.111 9.6255 12.623-7.5693 22.314-19.543 26.886-33.817-11.813 7.0031-24.895 12.093-38.824 14.841-11.157-11.884-27.041-19.317-44.629-19.317-33.764 0-61.144 27.381-61.144 61.132 0 4.7978 0.5364 9.4646 1.5854 13.941-50.815-2.5569-95.874-26.886-126.03-63.88-5.2508 9.0354-8.2785 19.531-8.2785 30.73 0 21.212 10.794 39.938 27.208 50.893-10.031-0.30992-19.454-3.0635-27.69-7.6468-0.009 0.25652-0.009 0.50661-0.009 0.78077 0 29.61 21.075 54.332 49.051 59.934-5.1376 1.4006-10.543 2.1516-16.122 2.1516-3.9336 0-7.766-0.38716-11.491-1.1026 7.7838 24.293 30.355 41.971 57.115 42.465-20.926 16.402-47.287 26.171-75.937 26.171-4.929 0-9.7983-0.28036-14.584-0.84634 27.059 17.344 59.189 27.464 93.722 27.464" fill="#fff" />
								</g>
							</svg>
							<span>Sign in with Twitter</span>
						</button><br />
						<button tabIndex={1} style={{ background: '#24292e' }} class={style.continueWith} onClick={() => this.signIn(githubAuthProvider)} >
							<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="24px"
								height="24px" viewBox="0 0 438.549 438.549" style="enable-background:new 0 0 438.549 438.549;"
							>
								<g>
									<path fill="#fff" d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365   c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63   c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996   c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136   c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559   c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559   c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997   c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851   c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136   c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41   c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126   c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817   c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994   c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849   c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24   c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979   c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146   c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995   c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906   C438.536,184.851,428.728,148.168,409.132,114.573z" />
								</g>
							</svg>
							<span>Sign in with GitHub</span>
						</button>

					</center>
				</Card>
			</section>
		);
	}
}
