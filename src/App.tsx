import './App.css';
import Flow from './components/Flow';
import { ReactFlowProvider } from '@xyflow/react';

const App = () => (
  <div className='h-svh w-svw m-0 p-0'>
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  </div>
);

export default App;
