import { Key, Props, ReactElementType, Ref } from 'shared/ReactTypes';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
import { FunctionComponent, HostComponent, WorkTag } from './worktags';

export class FiberNode {
	type: any;
	stateNode: any;
	tag: WorkTag;
	pendingProps: Props;
	memoizedProps: Props | null;
	memoizedState: any;
	key: Key;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key;
		// HostComponent <div> div dom
		this.stateNode = null;
		// FunctionComponent () => {}
		this.type = null;

		// 指向父fiberNode 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		// 刚开始准备工作props是什么
		this.pendingProps = pendingProps;
		// 工作完props是什么
		this.memoizedProps = null;
		this.memoizedState = null;
		this.updateQueue = null;

		// FiberNode 和 它对应的另外一个FiberNode进行切换。
		// 当前的FiberNode是current, 则alternate指向workingInProgress
		// 当前的FiberNode是workingInProgress, 则alternate指向current
		this.alternate = null;
		// 副作用 标记 Deletion Placement等
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
	}
}

// ReactDOM.createRoot(rootElement).render(<App/>)
// createRoot
export class FiberRootNode {
	// 对应宿主环境的挂载节点 就是rootElement
	container: Container;
	// 指向hostRootFiber
	current: FiberNode;
	// 更新完成以后的hostRootFiber
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.type = current.type;
		wip.stateNode = current.stateNode;
		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;
	return wip;
};

export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;
	if (typeof type === 'string') {
		// <div/> type: 'div'
		fiberTag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的type类型', element);
	}
	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}
