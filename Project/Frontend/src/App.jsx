import { useState, useRef } from 'react';
import { Play, Save, Trash2, Plus, Settings, Clock, Zap, GitBranch, Database, Mail, Code, CheckCircle, XCircle, Loader } from 'lucide-react';

// Node Templates
const NODE_TEMPLATES = [
  { type: 'trigger', label: 'Schedule Trigger', icon: Clock, color: 'bg-blue-500' },
  { type: 'trigger', label: 'API Trigger', icon: Zap, color: 'bg-purple-500' },
  { type: 'action', label: 'API Call', icon: Database, color: 'bg-green-500' },
  { type: 'action', label: 'Send Email', icon: Mail, color: 'bg-orange-500' },
  { type: 'action', label: 'Run Script', icon: Code, color: 'bg-yellow-500' },
  { type: 'condition', label: 'If/Else', icon: GitBranch, color: 'bg-pink-500' }
];

// Workflow Node Component
const WorkflowNode = ({ node, isSelected, onSelect, onDelete, onUpdate }) => {
  const IconComponent = node.icon;
  
  return (
    <div
      className={`absolute cursor-move rounded-lg shadow-lg border-2 transition-all z-10 ${
        isSelected ? 'border-blue-500 scale-105' : 'border-gray-300'
      }`}
      style={{ left: node.x, top: node.y }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
    >
      <div className={`${node.color} text-white px-4 py-2 rounded-t-md flex items-center gap-2`}>
        <IconComponent size={16} />
        <span className="font-medium text-sm">{node.label}</span>
      </div>
      <div className="bg-white px-4 py-3 rounded-b-md min-w-[200px]">
        <input
          type="text"
          value={node.name || ''}
          onChange={(e) => onUpdate(node.id, { name: e.target.value })}
          placeholder="Node name..."
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
            className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-gray-500 hover:bg-gray-50 p-1 rounded transition-colors"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white-500 rounded-full border-2 border-white"></div>
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
  );
};

export default function WorkflowAutomationBuilder() {
  const [workflows, setWorkflows] = useState([
    { id: '1', name: 'Email Notification Workflow', status: 'active', lastRun: '2 hours ago' },
    { id: '2', name: 'Data Processing Pipeline', status: 'draft', lastRun: 'Never' }
  ]);
  const [currentWorkflow, setCurrentWorkflow] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [view, setView] = useState('list');
  const [draggingNode, setDraggingNode] = useState(null);
  const canvasRef = useRef(null);

  const createNewWorkflow = () => {
    const newWorkflow = {
      id: Date.now().toString(),
      name: 'New Workflow',
      status: 'draft',
      lastRun: 'Never'
    };
    setWorkflows([...workflows, newWorkflow]);
    setCurrentWorkflow(newWorkflow);
    setNodes([]);
    setView('designer');
  };

  const saveWorkflow = () => {
    const workflowData = {
      id: currentWorkflow.id,
      name: currentWorkflow.name,
      nodes: nodes,
      version: '1.0',
      createdAt: new Date().toISOString()
    };
    console.log('Saving workflow:', workflowData);
    alert('Workflow saved successfully!');
  };

  const addNode = (template, x, y) => {
    const newNode = {
      id: Date.now().toString(),
      type: template.type,
      label: template.label,
      icon: template.icon,
      color: template.color,
      x: x || 100,
      y: y || 100,
      name: '',
      config: {}
    };
    setNodes([...nodes, newNode]);
  };

  const updateNode = (nodeId, updates) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
  };

  const deleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    if (selectedNode === nodeId) setSelectedNode(null);
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();
    if (draggingNode) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 100;
      const y = e.clientY - rect.top - 50;
      addNode(draggingNode, x, y);
      setDraggingNode(null);
    }
  };

  const executionStats = {
    total: 156,
    successful: 142,
    failed: 8,
    running: 6
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Workflow Automation Builder</h1>
                <p className="text-sm text-gray-600">Design, deploy, and monitor workflows</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('list')}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  view === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Workflows
              </button>
              <button
                onClick={() => setView('monitor')}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  view === 'monitor' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monitor
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 min-h-0">
        {/* Workflow List View */}
        {view === 'list' && (
          <div className="max-w-6xl mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Workflows</h2>
                <p className="text-gray-600">Create and manage automated workflows</p>
              </div>
              <button
                onClick={createNewWorkflow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
              >
                <Plus size={20} />
                Create Workflow
              </button>
            </div>

            <div className="space-y-4">
              {workflows.map(workflow => (
                <div key={workflow.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{workflow.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${workflow.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          {workflow.status === 'active' ? 'Active' : 'Draft'}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={14} />
                          Last run: {workflow.lastRun}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setCurrentWorkflow(workflow);
                          setView('designer');
                        }}
                        className="bg-white-50 hover:bg-blue-100 text-white-600 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button className="bg-green-50 hover:bg-green-100 text-green-600 p-2 rounded-lg transition-colors">
                        <Play size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflow Designer View */}
        {view === 'designer' && currentWorkflow && (
          <div className="flex h-full min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">Workflow Nodes</h3>
                <p className="text-xs text-gray-600 mb-4">Drag to canvas</p>
                <div className="space-y-2">
                  {NODE_TEMPLATES.map((template, idx) => {
                    const Icon = template.icon;
                    return (
                      <div
                        key={idx}
                        draggable
                        onDragStart={() => setDraggingNode(template)}
                        onDragEnd={() => setDraggingNode(null)}
                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-move transition-colors border border-gray-200"
                      >
                        <div className={`${template.color} p-2 rounded-lg`}>
                          <Icon className="text-white" size={16} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{template.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Toolbar */}
              <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200 flex-shrink-0">
                <input
                  type="text"
                  value={currentWorkflow.name}
                  onChange={(e) => setCurrentWorkflow({ ...currentWorkflow, name: e.target.value })}
                  className="text-lg font-semibold border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1 text-gray-900"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveWorkflow}
                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
                    <Play size={16} />
                    Run
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div
                ref={canvasRef}
                className="flex-1 bg-slate-50 relative overflow-auto"
                style={{
                  backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleCanvasDrop}
                onClick={() => setSelectedNode(null)}
              >
                {nodes.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white rounded-xl shadow-lg p-10 border border-gray-200">
                      <GitBranch size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Start Building Your Workflow</h3>
                      <p className="text-gray-600">Drag and drop nodes from the left panel</p>
                    </div>
                  </div>
                ) : (
                  nodes.map(node => (
                    <WorkflowNode
                      key={node.id}
                      node={node}
                      isSelected={selectedNode === node.id}
                      onSelect={setSelectedNode}
                      onDelete={deleteNode}
                      onUpdate={updateNode}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Monitor View */}
        {view === 'monitor' && (
          <div className="max-w-7xl mx-auto p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Workflow Monitoring</h2>
              <p className="text-gray-600">Track execution history and performance</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Total Executions</span>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Zap className="text-white-600" size={18} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{executionStats.total}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Successful</span>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="text-green-600" size={18} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600">{executionStats.successful}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Failed</span>
                  <div className="bg-red-100 p-2 rounded-lg">
                    <XCircle className="text-red-600" size={18} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-red-600">{executionStats.failed}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Running</span>
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Loader className="text-yellow-600" size={18} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-600">{executionStats.running}</div>
              </div>
            </div>

            {/* Recent Executions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="font-bold text-gray-900">Recent Executions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <CheckCircle className="text-green-600" size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Email Notification Workflow</div>
                        <div className="text-sm text-gray-500">{i} hour{i > 1 ? 's' : ''} ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Duration: 2.{i}s</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Success</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}