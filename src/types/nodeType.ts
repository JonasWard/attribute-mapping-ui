import type { Node } from '@xyflow/react';

export type NodeData = {
  label: string;
  sourceHandles: { id: string }[];
  targetHandles: { id: string }[];
};

export type NodeType = Node<NodeData>;
