import { h } from 'preact';
import style from './style';

import Card from '../../components/card';

const About = () => (
	<div class={style.about + ' fadeIn'}>
		<Card>
			<h2>General</h2>
			<p>
        This project started as a project for my High School's IT class and after I handed it in I asked myself why not continue working on MNGED since I always
				struggled finding a good task manager for myself that isn't too feature rich like evernote and listens to their users <a href="https://issuetracker.google.com/issues/36760910">unlike Google Keep</a>.
				So this is what I came up with. MNGED is still under heavy development but it won't hopefully take that long until v1.0 hopefully. So stay tuned for updates and <a href="/feedback">report</a> any issues and ideas to me
			</p>
			<hr />
			<h2>Security</h2>
			<p>
        MNGED uses <a href="https://firebase.google.com/">Firebase</a> for authentication and as a database. Firesbase is developed and maintained
				by Google. The authentication is build by the same team that also build Google Sign In and is responsible for other security at Google.
				But that also means that Google has access to our database which you may or may not care about.
			</p>
			<hr />
			<h2 class="border">How it's made</h2>
			<p>
        These sort of Web applications are called Progressive Web Apps (PWA).
        PWA's stand out because they are fast and always work,
        even with no connection to the internet.
			</p>
			<p>
        As the UI provider I decided to go with <a href="https://preactjs.com">Preact</a>, a lightweight 3kb fork of React.
        For storing the state I use <a href="https://mobx.js.org/getting-started.html">MobX</a>, it's a simple but powerful state management solution.
        And finally as the database I went with <a href="https://firebase.google.com/">Firebase</a>, a mostly free hosting and database provided by Google.
        The nice thing about firebase is that it comes with a nice JavaScript library which enables Authentication and live-updates when the database changes.
			</p>
			<hr />
			<h2 class="border">Links</h2>
			<ul>
				<li>GitHub: <a href="https://github.com/m4r1vs/mnged">m4r1vs/mnged</a></li>
				<li>My Homepage: <a href="https://maniyt.de">https://maniyt.de/</a></li>
				<li>My Twitter: <a href="https://twitter.com/MariusNiveri">@MariusNiveri</a></li>
				<li>E-Mail me: <a href="mailto:marius.niveri@gmail.com">marius.niveri@gmail.com</a></li>
			</ul>
		</Card>
	</div>
);

export default About;