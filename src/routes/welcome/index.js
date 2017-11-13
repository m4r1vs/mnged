import { h, Component } from 'preact';
import { auth, googleAuthProvider, facebookAuthProvider, githubAuthProvider, twitterAuthProvider } from '../../lib/firebase';
import { Link } from 'preact-router/match';

import style from './style';
import TextInput from '../../components/textInput';
import { DefaultButton, SubmitButton } from '../../components/button';

export default class Welcome extends Component {
	
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

	signInWithEmail(e) {

		e.preventDefault();

		const email = this.emailInputElem.value;
		const password = this.pwInputElem.value;

		auth.signInWithEmailAndPassword(email, password).catch((error) => {

			this.setState({ emailIncomplete: true, pwIncomplete: true });
			const errorMessage = error.message;
			this.props.stores.uiStore.showSnackbar(
				'Error during sign in: ' + errorMessage,
				null,
				10000
			);
		});
	}

	inputFocused() {
		this.setState({ emailIncomplete: false, pwIncomplete: false });
	}

	constructor() {
		super();
		this.state = {
			emailIncomplete: false,
			pwIncomplete: false
		};
		this.emailInputElem = null;
		this.pwInputElem = null;
	}

	render() {
		return (
			<section class={style.welcome}>
				<h1>MNGED</h1>
				<form onSubmit={this.signInWithEmail.bind(this)}>
					<TextInput incomplete={this.state.emailIncomplete} color="rgba(255,255,255,.87)" name="E-Mail" inputOnFocus={this.inputFocused.bind(this)} inputRef={el => this.emailInputElem = el} required />
					<TextInput inputType="password" incomplete={this.state.pwIncomplete} color="rgba(255,255,255,.87)" name="Password" inputOnFocus={this.inputFocused.bind(this)} inputRef={el => this.pwInputElem = el}
						required
					/>
					<SubmitButton name="Sign In" style={{
						width: '100%',
						maxWidth: '100%',
						marginTop: '22px',
						height: '48px',
						color: 'rgba(0,0,0,.87)',
						background: '#e7ffbc'
					}}
					/>
					<div class={style.btnWrapper}>
						<DefaultButton onClick={() => this.signIn(facebookAuthProvider)} title="Sign In with Facebook" extraClass={style.thirdPartyButton} style={{ background: '#3b5998', marginLeft: '0' }}>
							<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
								viewBox="0 0 155.139 155.139" style="enable-background:new 0 0 155.139 155.139;" width="24px" height="24px"
							>
								<g>
									<path id="f_1_" d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184   c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452   v20.341H37.29v27.585h23.814v70.761H89.584z" fill="#fff" />
								</g>
							</svg>
						</DefaultButton>
						<DefaultButton onClick={() => this.signIn(googleAuthProvider)} title="Sign In with Google" extraClass={style.thirdPartyButton} style={{ background: '#d62d20' }}>
							<svg enable-background="new 0 0 1024 1024" height="24px" id="Layer_1" version="1.1" viewBox="0 0 1024 1024" width="24px"
								space="preserve" xmlns="http://www.w3.org/2000/svg"
							><g><path clip-rule="evenodd" d="M858.635,127.453c-49.299,49.546-97.781,98.267-146.936,147.663    c-11.119-6.811-22.859-14.209-34.797-21.273c-46.324-27.406-96.166-43.287-150.209-43.631    c-141.813-0.901-260.878,93.787-296.141,231.114c-44.047,171.536,77.662,347.985,249.249,369.973    c84.666,10.848,163.689-3.427,233.406-55.129c43.611-32.343,77.666-90.102,83.33-138.467c-90.164,0-180.213,0-270.984,0    c0-65.989,0-130.913,0-197.032c4.699-0.388,9.633-1.143,14.568-1.149c147.889-0.2,295.779-0.336,443.668-0.448    c15.037-0.012,17.688,1.946,20.238,19.312c22.609,153.943-8.84,294.913-107.959,416.283    c-76.135,93.228-177.279,147.09-296.195,163.61c-141.08,19.603-271.29-10.724-385.26-98.115    C99.733,832.082,33.317,714.739,16.522,570.923c-26.011-222.73,93.896-437.394,298.999-524.667    C508.525-35.869,689.516-7.785,853.74,123.708C855.578,125.179,857.479,126.569,858.635,127.453z" fill="#fff" /></g></svg>
						</DefaultButton>
						<DefaultButton onClick={() => this.signIn(twitterAuthProvider)} title="Sign In with Twitter" extraClass={style.thirdPartyButton} style={{ background: '#1da1f2' }}>
							<svg rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.00006 244.18703" height="24px" width="24px" version="1.1"
								cc="http://creativecommons.org/ns#" dc="http://purl.org/dc/elements/1.1/"
							>
								<g style="" transform="translate(-539.18 -568.86)">
									<path d="m633.9 812.04c112.46 0 173.96-93.168 173.96-173.96 0-2.6463-0.0539-5.2806-0.1726-7.903 11.938-8.6302 22.314-19.4 30.498-31.66-10.955 4.8694-22.744 8.1474-35.111 9.6255 12.623-7.5693 22.314-19.543 26.886-33.817-11.813 7.0031-24.895 12.093-38.824 14.841-11.157-11.884-27.041-19.317-44.629-19.317-33.764 0-61.144 27.381-61.144 61.132 0 4.7978 0.5364 9.4646 1.5854 13.941-50.815-2.5569-95.874-26.886-126.03-63.88-5.2508 9.0354-8.2785 19.531-8.2785 30.73 0 21.212 10.794 39.938 27.208 50.893-10.031-0.30992-19.454-3.0635-27.69-7.6468-0.009 0.25652-0.009 0.50661-0.009 0.78077 0 29.61 21.075 54.332 49.051 59.934-5.1376 1.4006-10.543 2.1516-16.122 2.1516-3.9336 0-7.766-0.38716-11.491-1.1026 7.7838 24.293 30.355 41.971 57.115 42.465-20.926 16.402-47.287 26.171-75.937 26.171-4.929 0-9.7983-0.28036-14.584-0.84634 27.059 17.344 59.189 27.464 93.722 27.464" fill="#fff" />
								</g>
							</svg>
						</DefaultButton>
						<DefaultButton onClick={() => this.signIn(githubAuthProvider)} title="Sign In with GitHub" extraClass={style.thirdPartyButton} style={{ background: '#4e277b' }}>
							<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="24px"
								height="24px" viewBox="0 0 438.549 438.549" style="enable-background:new 0 0 438.549 438.549;"
							>
								<g>
									<path fill="#fff" d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365   c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63   c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996   c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136   c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559   c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559   c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997   c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851   c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136   c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41   c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126   c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817   c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994   c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849   c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24   c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979   c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146   c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995   c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906   C438.536,184.851,428.728,148.168,409.132,114.573z" />
								</g>
							</svg>
						</DefaultButton>
					</div>
					<Link href="/register">Create new account</Link>
				</form>
			</section>
		);
	}
}