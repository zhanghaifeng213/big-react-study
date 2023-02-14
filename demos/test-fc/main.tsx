import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

console.log(import.meta.hot);

const App = () => {
	const [num, setNum] = useState(100);
	return <div onClickCapture={() => setNum(num + 1)}>{num}</div>;
};

function Child() {
	return <span>App Child</span>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
