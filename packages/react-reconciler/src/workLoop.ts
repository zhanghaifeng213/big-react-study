import { beginWork } from './beginWork';

import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
	workInProgress = fiber;
}

function renderRoot(root: FiberNode) {
	// 初始化 让我们当前 workInProgress 指向我们需要遍历的第一个FiberNode
	prepareFreshStack(root);
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.warn('workLoop发生错误', e);
			workInProgress = null;
		}
	} while (true);
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	// next 可能是 fiber 的子 fiber 也可能是 null
	const next = beginWork(fiber);
	fiber.memoizeProps = fiber.pendingProps;
	if (next === null) {
		completeWork(fiber);
	} else {
		workInProgress = next;
	}
}

// 如果没有子节点， 遍历兄弟节点
function comleteUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
