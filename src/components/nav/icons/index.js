import { h } from 'preact';
import style from './style';

export const TasksIcon = props => (
	<svg class={style.icon} viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Tasks</title>
		<desc>A color styled icon from Orion Library.</desc>
		<circle class="applyHoverEffect" data-name="layer1"
			cx="28" cy="36" r="26" fill="#5ade9c"
		/>
		<path class="applyHoverEffect" data-name="opacity" d="M31.467 58.533A25.999 25.999 0 0 1 11.43 15.964 26 26 0 1 0 48.036 52.57a25.89 25.89 0 0 1-16.57 5.964z"
			fill="#000028" opacity=".15"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-linejoin="miter" stroke-width="2" d="M15.74 30l12 14 34-42"
		/>
		<path data-name="stroke" d="M53.443 32A26.002 26.002 0 1 1 27.75 10a25.914 25.914 0 0 1 10 1.993"
			fill="none" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter"
			stroke-width="2"
		/>
	</svg>
);

export const ExamsIcon = () => (

	<svg class={style.icon} viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Edit</title>
		<desc>A color styled icon from Orion Library.</desc>
		<path class="applyHoverEffect" data-name="layer5"
			fill="#fff" d="M33 40.6h17l11.4 16H2.6l11.4-16h11.7"
		/>
		<path class="applyHoverEffect" data-name="layer4" fill="#fbaa51" d="M38.3 38.3l16.6-16.6-8-8-16.6 16.5" />
		<path class="applyHoverEffect" data-name="layer3" fill="#f27e7c" d="M54.9 21.7l6.3-6.3-8.1-8-6.2 6.3" />
		<path class="applyHoverEffect" data-name="layer2" fill="#fddab3" d="M27.9 42.9l10.4-4.6-8-8.1-4.6 10.4 2.2 2.3z" />
		<path class="applyHoverEffect" data-name="layer1" fill="#2e4369" d="M27.9 42.9l-2.2-2.3-1.8 4 4-1.7z" />
		<path class="applyHoverEffect" data-name="opacity" fill="#000028" opacity=".15" d="M23.9 44.6h29l-2.9-4H33l-9.1 4z" />
		<path class="applyHoverEffect" data-name="opacity" fill="#000028" opacity=".2" d="M35.7 35.7l2.6 2.6 16.6-16.6-2.6-2.6-16.6 16.6z" />
		<path class="applyHoverEffect" data-name="opacity" fill="#000028" opacity=".2" d="M38.3 38.3l-2.6-2.6-8.5 6.4.7.8 10.4-4.6z" />
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-linejoin="miter" stroke-width="2" d="M38.3 38.3l16.6-16.6-8-8-16.6 16.5m-6.4 14.4l14.4-6.3-8-8.1-6.4 14.4z"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-linejoin="miter" stroke-width="2" d="M54.9 21.7l6.3-6.3-8.1-8-6.2 6.3M33 40.6h17l11.4 16H2.6l11.4-16h11.7"
		/>
	</svg>
);

export const DashboardIcon = () => (

	<svg class={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>List Layout</title>
		<desc>A color styled icon from Orion Library.</desc>
		<path class="applyHoverEffect" data-name="layer2"
			fill="#c3e2fa" d="M26 2h36v12H26z"
		/>
		<path class="applyHoverEffect" data-name="layer1" fill="#aad6f8" d="M2 2h12v12H2zm0 24h12v12H2z" />
		<path class="applyHoverEffect" data-name="layer2" fill="#c3e2fa" d="M26 26h36v12H26zm0 24h36v12H26z" />
		<path class="applyHoverEffect" data-name="layer1" fill="#aad6f8" d="M2 50h12v12H2z" />
		<path class="applyHoverEffect" data-name="opacity" fill="#000064" opacity=".12" d="M62 35H30v-9h-4v12h36v-3zM14 11H6V2H2v12h12v-3zm48 0H30V2h-4v12h36v-3zM14 35H6v-9H2v12h12v-3zM6 59v-9H2v12h12v-3H6zm24 0v-9h-4v12h36v-3H30z" />
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-miterlimit="10" stroke-width="2" d="M26 2h36v12H26zM2 2h12v12H2zm0 24h12v12H2zm24 0h36v12H26zm0 24h36v12H26zM2 50h12v12H2z"
			stroke-linejoin="miter"
		/>
	</svg>
);

export const NotesIcon = () => (

	<svg class={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Notes</title>
		<desc>A color styled icon from Orion Library.</desc>
		<path class="applyHoverEffect" data-name="layer3"
			fill="#b3d9ff" d="M18 2h36v60H18z"
		/>
		<path class="applyHoverEffect" data-name="layer2" d="M11 2a3 3 0 0 0-3 3v54a3 3 0 0 0 3 3h7V2z"
			fill="#8fa9d8"
		/>
		<path class="applyHoverEffect" data-name="layer1" fill="#eaf7ff" d="M28 14h16v8H28z" />
		<path class="applyHoverEffect" data-name="opacity" d="M11 2a3 3 0 0 0-3 3v54a3 3 0 0 0 3 3h3V2z"
			fill="#000064" opacity=".15"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="round"
			stroke-miterlimit="10" stroke-width="2" d="M18 2v60m36 0H11a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h43z"
			stroke-linejoin="miter"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="round"
			stroke-miterlimit="10" stroke-width="2" d="M28 14h16v8H28z" stroke-linejoin="miter"
		/>
	</svg>
);

export const CafeteriaIcon = () => (

	<svg class={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Restaurant</title>
		<desc>A color styled icon from Orion Library.</desc>
		<path class="applyHoverEffect" data-name="layer1"
			d="M52.5 15.6c0-5.5-3.6-13.7-8-13.7s-8 8.1-8 13.7 2.5 8.1 6 9l-1 33.5c0 3.2 1.9 4 3 4s3.2-.6 3-4l-1-33.5c3.4-.9 6-4.3 6-9zm-28-13.4h-12l-1 20c0 3.2 2.1 5.2 5 5.8v32.2a2 2 0 0 0 4 0V28c2.9-.6 5-2.6 5-5.8z"
			fill="#bacae8"
		/>
		<path class="applyHoverEffect" data-name="opacity" d="M44.5 1.9A5 5 0 0 0 41 3.7h.5c4.4 0 8 8.1 8 13.7a9.8 9.8 0 0 1-3 7.4c3.4-1 6-4.4 6-9s-3.6-13.9-8-13.9z"
			fill="#101129" opacity=".25"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-linejoin="miter" stroke-width="2" d="M16.5 17.1v-15m36 13.4c0-5.5-3.6-13.7-8-13.7s-8 8.1-8 13.7 2.5 8.1 6 9l-1 33.5c0 3.2 1.9 4 3 4s3.2-.6 3-4l-1-33.5c3.4-.9 6-4.4 6-9zm-32-13.4v15m4-15h-12l-1 20c0 3.2 2.1 5.2 5 5.8v32.2a2 2 0 1 0 4 0V27.9c2.9-.6 5-2.6 5-5.8z"
		/>
	</svg>
);

export const ClassesIcon = () => (

	<svg class={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Student</title>
		<desc>A color styled icon from Orion Library.</desc>
		<path class="applyHoverEffect" data-name="layer1"
			fill="#64738f" d="M60 5.9l-28-4-28 4 14 3v7l14 2 14-2v-7l14-3z"
		/>
		<path class="applyHoverEffect" data-name="layer2" d="M32 62.1l16-11.2c-9.1-2-9-5.1-9-7v-2.7h-.3a17.3 17.3 0 0 0 6.1-9.4c3 0 3.7-4.3 3.7-5.2S49 22 46 21.9v-6l-14 2-14-2v6c-3 0-3 4.1-3 5s.4 5 3.4 5a15.3 15.3 0 0 0 5.9 9.1H24v2.9c0 1.8.5 4.5-8 6.6z"
			fill="#e8d4d4"
		/>
		<path class="applyHoverEffect" data-name="layer1" d="M32 61.9h30s0-8.4-12.4-10.8l-1.6-.2zm-30 0h30L16 50.4l-2.4.5C2 53.1 2 61.9 2 61.9z"
			fill="#64738f"
		/>
		<path class="applyHoverEffect" data-name="opacity" d="M16 55.9c3-1 9-6 10-10 6 3 8 0 10-4-14 3-14-13-14-17s1-12 1-12l9 1.8 14-1.8v-4l-14 2-14-2v13c-3 0-3 4.1-3 5s.4 5 3.4 5a15.3 15.3 0 0 0 5.9 9.1H24v2.9c0 1.8.5 4.5-7.9 6.5H16l-2.4.5C2 53.1 2 61.9 2 61.9h7.1c.6-3.3 4.2-5.1 6.9-6z"
			fill="#000064" opacity=".15"
		/>
		<path data-name="stroke" d="M24 41v2.9c0 2 .6 4.9-10.4 7S2 61.9 2 61.9h60s0-8.6-12.4-11c-10.7-2.1-10.6-5-10.6-7v-2.7"
			fill="none" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter"
			stroke-width="2"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-linejoin="miter" stroke-width="2" d="M16 50.4l16 11.5 16-11.3m-10.4-8.4a17.2 17.2 0 0 0 7.2-10.3c3 0 3.7-4.3 3.7-5.3S49 22 46 21.9v-6m-28 0v6c-3 0-3 4.1-3 5s.4 5 3.4 5a15.9 15.9 0 0 0 7.2 10.3M32 11.9l-28-6 28-4 28 4-28 6z"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-linejoin="miter" stroke-width="2" d="M18 8.9v7l14 2 14-2v-7M6 6.3v23.6"
		/>
	</svg>
);

export const SettingsIcon = () => (

	<svg class={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Horizontal Mixer</title>
		<desc>A color styled icon from Orion Library.</desc>
		<path class="applyHoverEffect" data-name="layer2"
			fill="#bacae9" d="M2 2h60v60H2z"
		/>
		<circle class="applyHoverEffect" data-name="layer1" cx="48" cy="48" r="5" fill="#dde5f4" />
		<circle class="applyHoverEffect" data-name="layer1" cx="16" cy="16" r="5" fill="#dde5f4" />
		<circle class="applyHoverEffect" data-name="layer1" cx="32" cy="32" r="5" fill="#dde5f4" />
		<path class="applyHoverEffect" data-name="opacity" d="M48 53a4.94 4.94 0 0 1-1.688-.313 4.989 4.989 0 1 0 6.376-6.374A4.955 4.955 0 0 1 48 53zM16 21a4.965 4.965 0 0 1-1.688-.313 4.989 4.989 0 1 0 6.376-6.375A4.955 4.955 0 0 1 16 21zm16 16a4.965 4.965 0 0 1-1.688-.313 4.989 4.989 0 1 0 6.375-6.374A4.955 4.955 0 0 1 32 37z"
			opacity=".2"
		/>
		<circle data-name="stroke" cx="48" cy="48" r="5" fill="none" stroke="#000000"
			stroke-linecap="butt" stroke-linejoin="miter" stroke-width="2"
		/>
		<circle data-name="stroke" cx="16" cy="16" r="5" fill="none"
			stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="2"
		/>
		<circle data-name="stroke" cx="32" cy="32" r="5" fill="none"
			stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="2"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-linejoin="miter" stroke-width="2" d="M14 48h29m-6-16h13m-36 0h13m-6-16h29M2 2h60v60H2z"
		/>
	</svg>
);

export const FeedbackIcon = () => (

	<svg class={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Important Chat</title>
		<desc>A color styled icon from Orion Library.</desc>
		<path class="applyHoverEffect" data-name="layer2"
			d="M5 58l18.8-6.9a37.1 37.1 0 0 0 8.2.9c16.6 0 30-10.7 30-24S48.6 4 32 4 2 14.7 2 28c0 6.7 3.5 12.8 9.1 17.2z"
			fill="#ffdf9f"
		/>
		<path class="applyHoverEffect" data-name="opacity" d="M38 47C21.4 47 8 35.8 8 22a21.6 21.6 0 0 1 3.3-11.3C5.6 15 2 21.2 2 28s3.5 12.8 9.1 17.2L5 58l18.8-6.9a37 37 0 0 0 8.2.9c10.3 0 19.5-4.2 24.9-10.6A33.7 33.7 0 0 1 38 47z"
			fill="#000064" opacity=".14"
		/>
		<path class="applyHoverEffect" data-name="opacity" d="M43 23c12 4 11.7-.7 10.4-3.8a17.6 17.6 0 0 0-2.8-3.9c-5.6-5.4-11.8-5.2-15.7-3.5S31 19 43 23z"
			fill="#fff" opacity=".4"
		/>
		<path class="applyHoverEffect" data-name="layer1" d="M34 32a2 2 0 0 1-2 2 2.2 2.2 0 0 1-2-2l-1-15a2.8 2.8 0 0 1 3-3 2.7 2.7 0 0 1 3 3z"
			fill="#8ca0c8"
		/>
		<circle class="applyHoverEffect" data-name="layer1" cx="32" cy="41" r="2" fill="#8ca0c8" />
		<path data-name="stroke" d="M5 58l18.8-6.9a37.1 37.1 0 0 0 8.2.9c16.6 0 30-10.7 30-24S48.6 4 32 4 2 14.7 2 28c0 6.7 3.5 12.8 9.1 17.2z"
			fill="none" stroke="#000000" stroke-linecap="butt" stroke-miterlimit="10"
			stroke-width="2" stroke-linejoin="miter"
		/>
		<path data-name="stroke" d="M34 32a2 2 0 0 1-4 0l-1-15a2.7 2.7 0 0 1 3-3 2.7 2.7 0 0 1 3 3z"
			fill="none" stroke="#000000" stroke-linecap="butt" stroke-miterlimit="10"
			stroke-width="2" stroke-linejoin="miter"
		/>
		<circle data-name="stroke" cx="32" cy="41" r="2" fill="none" stroke="#000000"
			stroke-linecap="butt" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"
		/>
	</svg>
);

export const AboutIcon = () => (

	<svg class={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Info Help</title>
		<desc>A color styled icon from Orion Library.</desc>
		<circle class="applyHoverEffect" data-name="layer1"
			cx="32" cy="32" r="30" fill="#49bcff"
		/>
		<path class="applyHoverEffect" data-name="opacity" d="M36 58A30 30 0 0 1 12.882 8.881 30 30 0 1 0 55.118 51.12 29.883 29.883 0 0 1 36 58z"
			fill="#000028" opacity=".15"
		/>
		<circle data-name="stroke" cx="32" cy="32" r="30" fill="none" stroke="#000000"
			stroke-linecap="butt" stroke-linejoin="miter" stroke-width="2"
		/>
		<path data-name="stroke" fill="none" stroke="#000000" stroke-linecap="butt"
			stroke-linejoin="miter" stroke-width="2" d="M28 26h4v22m-4 .008h8"
		/>
		<circle data-name="stroke" cx="31" cy="19" r="2" fill="none" stroke="#000000"
			stroke-linecap="butt" stroke-linejoin="miter" stroke-width="2"
		/>
	</svg>
);

export const LogoutIcon = () => (

	<svg class={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
		aria-describedby="desc" role="img"
	>
		<title>Log Out</title>
		<desc>A color styled icon from Orion Library.</desc>
		<path class="applyHoverEffect" data-name="layer1"
			d="M45.513 6.62a3 3 0 0 0-3.006 5.192 21 21 0 1 1-21.006-.004 3 3 0 0 0-3.006-5.192 27 27 0 1 0 27.018.004z"
			fill="#bacae9"
		/>
		<path class="applyHoverEffect" data-name="layer1" d="M32 31a3 3 0 0 0 3-3V4a3 3 0 0 0-6 0v24a3 3 0 0 0 3 3z"
			fill="#bacae9"
		/>
		<path data-name="stroke" d="M45.513 6.62a3 3 0 0 0-3.006 5.192 21 21 0 1 1-21.006-.004 3 3 0 0 0-3.006-5.192 27 27 0 1 0 27.018.004z"
			fill="none" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter"
			stroke-width="2"
		/>
		<path data-name="stroke" d="M32 31a3 3 0 0 0 3-3V4a3 3 0 0 0-6 0v24a3 3 0 0 0 3 3z"
			fill="none" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter"
			stroke-width="2"
		/>
	</svg>
);