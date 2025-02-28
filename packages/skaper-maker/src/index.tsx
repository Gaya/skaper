import { render } from 'preact';

import './style.css';

export function App() {
	return (
		<div>
			<h1>Skaper Template Maker</h1>
		</div>
	);
}

render(<App />, document.getElementById('app'));
