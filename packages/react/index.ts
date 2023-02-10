import currentDispatcher, {
	Dispatcher,
	resolveDispatcher
} from './src/currentDispatcher';
import { jsx, jsxDEV, isValidElement as isValidElementFn } from './src/jsx';
// React

export const useState: Dispatcher['useState'] = (initialState: any) => {
	// 获取dispatcher中的useState
	const dispatch = resolveDispatcher();
	return dispatch.useState(initialState);
};

// 内部数据共享层
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
	currentDispatcher
};

export const version = '0.0.0';

// TODO 根据环境区分使用jsxDEV/jsx
// export const createElement = jsxDEV;
export const createElement = jsx;
export const isValidElement = isValidElementFn;
