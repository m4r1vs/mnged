import { h } from 'preact';
import style from './style';

const About = () => (
	<div class={style.about + ' fadeIn'}>
		<section>
			<h4 style={{ border: 'none' }}>How it's made</h4>
			<p>
        These sort of Web applications are called Progressive Web Apps (PWA).
        PWA's stand out because they are fast and always work,
        even with no connection to the internet.
			</p>
			<p>
        As the UI provider I decided to go with <a href="https://preactjs.com">Preact</a>, a lightweight 3kb fork of React.
        For storing the state I use <a href="https://mobx.js.org/getting-started.html">MobX</a>, it's a simple but powerful state management solution.
        And finally as the database I went with <a href="https://firebase.google.com/">Firebase</a>, a mostly free hosting and database provided by Google.
        The nice thing about firebase is that it comes with a nice JavaScript libary which enables Authentication and live-updates when the database changes.
			</p>
			<hr />
			<h4>Links</h4>
			<ul>
				<li>GitHub: <a href="https://github.com/m4r1vs/mnged">m4r1vs/mnged</a></li>
				<li>My Homepage: <a href="https://maniyt.de">https://maniyt.de/</a></li>
				<li>My Twitter: <a href="https://twitter.com/MariusNiveri">@MariusNiveri</a></li>
				<li>E-Mail me: <a href="mailto:marius.niveri@gmail.com">marius.niveri@gmail.com</a></li>
			</ul>
		</section>
	</div>
);

export default About;