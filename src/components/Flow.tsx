import { ReactFlow, Controls, Background, useNodesState, useEdgesState, Edge, Connection } from '@xyflow/react';
import { nodes as initNodes } from '../assets/nodes';
import { edges as initEdges } from '../assets/edges';
import Node from './Node';

import '@xyflow/react/dist/style.css';
import React, { useEffect, useRef } from 'react';
import { useAttributeTableStore } from '../store/attributeTableStore';

const nodeTypes = { textUpdater: Node };

const createNewEdgeFromConnection = (c: Connection): { id: string; source: string; sourceHandle: string; target: string; targetHandle: string } => ({
  id: `${c.sourceHandle}-${c.targetHandle}`,
  source: `${c.source}`,
  sourceHandle: `${c.sourceHandle}`,
  target: `${c.target}`,
  targetHandle: `${c.targetHandle}`,
});

function Flow() {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const attributes = useAttributeTableStore((s) => s.attributes);
  const nodeToAdd = useAttributeTableStore((s) => s.nodeToAdd);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const handleUpload = () => {
    if (!selectedFileRef.current) return;
    selectedFileRef.current.click();
  };

  useEffect(() => {
    if (nodeToAdd) {
      console.log(nodeToAdd);
      const otherNodes = nodes.filter((n) => n.id !== nodeToAdd.nodeId);
      const nodeToChange = nodes.find((n) => n.id === nodeToAdd.nodeId);
      if (!nodeToChange) return;

      const newNode = { ...nodeToChange };

      if (nodeToAdd.sourceId) newNode.data.sourceHandles.push({ id: nodeToAdd.sourceId });
      if (nodeToAdd.targetId) newNode.data.targetHandles.push({ id: nodeToAdd.targetId });

      const newNodes = [...otherNodes, newNode];

      setNodes(newNodes);
      setEdges(edges);
      useAttributeTableStore.setState({ nodeToAdd: null });
    }
  }, [nodeToAdd, nodes, setNodes]);

  const parseFile = () => {
    const files = (document.getElementById('selectFiles') as any).files;
    if (files.length <= 0) {
      return false;
    }

    const fr = new FileReader();

    fr.onload = (e) => {
      const result = JSON.parse(e.target.result as any) as any;
      if (!result.nodes || !result.edges || !result.attributes) return;
      setNodes(result.nodes);
      setEdges(result.edges);
      useAttributeTableStore.setState(() => ({ attributes: result.attributes }));
    };

    fr.readAsText(files.item(0));
  };

  const handleDownload = () => {
    const content = JSON.stringify({ nodes, edges, attributes });

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(content);
    const dlAnchorElem = document.getElementById('downloadJsonElem') as any;
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'scene.json');
    dlAnchorElem.click();
  };

  const handleCsvDownload = () => {
    const pairs = edges.map((e) => [attributes[e.sourceHandle!] ?? '<missing data>', attributes[e.targetHandle!] ?? '<missing data>']);
    const content = pairs.map((a) => a.join(', ')).join('\n');

    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(content);
    const dlAnchorElem = document.getElementById('downloadCsvElem') as any;
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'scene.csv');
    dlAnchorElem.click();
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
        onConnect={(c) => setEdges([...edges, createNewEdgeFromConnection(c) as Edge])}
        onDelete={(e) => console.log(e)}
        style={{ backgroundColor: '#F7F9FB' }}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <a id='downloadJsonElem' style={{ display: 'none' }} />
      <a id='downloadCsvElem' style={{ display: 'none' }} />
      <input ref={selectedFileRef} type='file' id='selectFiles' onChange={parseFile} />
      <button id='import' onClick={handleUpload} style={{ position: 'absolute', left: 10, top: 10, padding: '2px 8px', color: 'white' }}>
        upload
      </button>
      <button onClick={handleDownload} style={{ position: 'absolute', left: 90, top: 10, padding: '2px 8px', color: 'white' }}>
        download
      </button>
      <button onClick={handleCsvDownload} style={{ position: 'absolute', left: 192, top: 10, padding: '2px 8px', color: 'white' }}>
        csv map
      </button>
    </>
  );
}

export default Flow;
