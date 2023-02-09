import React from 'react';
import ReactDom from 'react-dom';

const jsx = (
	<div>
		<span>big-react</span>
	</div>
);

const root = document.querySelector('#root');
ReactDom.createRoot(root).render(jsx);

console.log('React', React);
console.log('jsx', jsx);
console.log('ReactDom', ReactDom);

// const react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = {};
// const _jsxFileName = {};

// const jsx = (0, react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
// 	'div',
// 	{
// 		children: [
// 			'hello',
// 			/*#__PURE__*/ (0,
// 			react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(
// 				'span',
// 				{
// 					children: 'big-react'
// 				},
// 				void 0,
// 				false,
// 				{
// 					fileName: _jsxFileName,
// 					lineNumber: 4,
// 					columnNumber: 8
// 				},
// 				undefined
// 			)
// 		]
// 	},
// 	void 0,
// 	true,
// 	{
// 		fileName: _jsxFileName,
// 		lineNumber: 3,
// 		columnNumber: 2
// 	},
// 	undefined
// );
