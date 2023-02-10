import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

console.log(import.meta.hot);

const App = () => {
	const [num, setNum] = useState(100);
	window.setNum = setNum;
	return (
		<div>
			{num}
			{/* <Child /> */}
		</div>
	);
};

function Child() {
	return <span>App Child</span>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
