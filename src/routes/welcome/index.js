import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Welcome = () => (
	<section class={style.welcome}>
		<center>
			<p>
				Hi there, Welcome to mnged!<br />
				With mnged you can get track of all your tasks,
				schedules and assignments during school.
			</p>
			<Link href="/signin">Get started</Link>
		</center>
	</section>
);

export default Welcome;