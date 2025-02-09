import { Handle, type NodeProps, Position } from '@xyflow/react';
import { NodeType } from '../types/nodeType';
import { ReactNode } from 'react';
import React from 'react';
import { useAttributeTableStore } from '../store/attributeTableStore';

const inputWidth = 100;

const handleLeft = { transform: 'translate(10px, -7px)', width: inputWidth };
const handleRight = { transform: `translate(-${inputWidth + 5}px, -7px)`, width: inputWidth };
const hanldeStyle = { width: 10, height: 10 };

type inputType = NodeProps<NodeType> & { data: { hasInput?: boolean; hasOutput?: boolean } };

const getNodeWidth = (data: inputType): number => {
  return (
    (data.data.hasInput !== false || data.data.targetHandles.length !== 0 ? inputWidth : 0) +
    50 +
    (data.data.hasOutput !== false || data.data.sourceHandles.length !== 0 ? inputWidth : 0)
  );
};

const updateInput = (id: string, value: string) => useAttributeTableStore.getState().updateAttribute(id, value);

const addNode = (nodeId: string, sourceId?: string, targetId?: string) => useAttributeTableStore.setState({ nodeToAdd: { nodeId, sourceId, targetId } });

const Node = (props: inputType): ReactNode => {
  const attributes = useAttributeTableStore((s) => s.attributes);

  return (
    <div style={{ width: getNodeWidth(props), height: Math.max(props.data.targetHandles.length + 1, props.data.sourceHandles.length + 1) * 15 }}>
      <input
        style={{ transform: 'translateY(-30px)', textAlign: 'center' }}
        value={attributes[props.id] ?? props.id}
        onChange={(v) => updateInput(props.id, v.target.value)}
      />

      {props.data.targetHandles.length !== 0 ? (
        <div className='handles targets'>
          {props.data.targetHandles.map((handle) => (
            <Handle key={handle.id} id={handle.id} type='target' position={Position.Left} style={hanldeStyle} isConnectable>
              <input
                key={handle.id}
                value={attributes[handle.id] ?? handle.id}
                style={{ ...handleLeft, textAlign: 'left' }}
                onChange={(v) => updateInput(handle.id, v.target.value)}
              />
            </Handle>
          ))}
          {props.data.hasInput !== false ? (
            <Handle
              key={'add'}
              id={'add-left'}
              type='target'
              position={Position.Left}
              style={{ color: '#00000000', backgroundColor: '#00000000' }}
              isConnectable={true}
            >
              <button
                onClick={() => addNode(props.id, undefined, `${props.id}-t-${props.data.targetHandles.length}`)}
                style={{ ...handleLeft, transform: `translate(${5}px, -10px)`, width: 70, padding: 1, color: 'white', fontSize: 9 }}
              >
                + Add Item
              </button>
            </Handle>
          ) : null}
        </div>
      ) : null}
      {props.data.sourceHandles.length !== 0 ? (
        <div className='handles sources'>
          {props.data.sourceHandles.map((handle) => (
            <Handle key={handle.id} id={handle.id} type='source' position={Position.Right} style={hanldeStyle} isConnectable>
              <input
                key={handle.id}
                value={attributes[handle.id] ?? handle.id}
                style={{ ...handleRight, textAlign: 'right' }}
                onChange={(v) => updateInput(handle.id, v.target.value)}
              />
            </Handle>
          ))}
          {props.data.hasOutput !== false ? (
            <Handle
              key={'add'}
              id={'add'}
              type='target'
              position={Position.Left}
              style={{ color: '#00000000', backgroundColor: '#00000000' }}
              isConnectable={true}
            >
              <button
                onClick={() => addNode(props.id, `${props.id}-s-${props.data.sourceHandles.length}`)}
                style={{ ...handleRight, transform: `translate(-${70}px, -10px)`, width: 70, padding: 1, color: 'white', fontSize: 9 }}
              >
                + Add Item
              </button>
            </Handle>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Node;
