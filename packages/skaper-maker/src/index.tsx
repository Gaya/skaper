import { render } from 'preact';

import Skaper from "./components/Skaper/Skaper";

import './style.css';

export function App() {
	return (
		<Skaper />
	);
}

render(<App />, document.getElementById('app'));
