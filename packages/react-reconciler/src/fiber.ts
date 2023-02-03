import { Key, Props, Ref } from 'shared/ReactTypes';
import { Flags, NoFlags } from './fiberFlags';
import { WorkTag } from './worktags';

export class FiberNode {
	type: any;
	stateNode: any;
	tag: WorkTag;
	pendingProps: Props;
	memoizeProps: Props | null;
	key: Key;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	alternate: FiberNode | null;
	flags: Flags;
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
		this.memoizeProps = null;
		// FiberNode 和 它对应的另外一个FiberNode进行切换。
		// 当前的FiberNode是current, 则alternate指向workingInProgress
		// 当前的FiberNode是workingInProgress, 则alternate指向current
		this.alternate = null;
		// 副作用 标记 Deletion Placement等
		this.flags = NoFlags;
	}
}
