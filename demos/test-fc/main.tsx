import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
	return (
		<div>
			<Child />
		</div>
	);
};

function Child() {
	return <span>App Child</span>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
