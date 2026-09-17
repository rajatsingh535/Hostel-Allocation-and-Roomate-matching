'use client';

import { useState } from 'react';

// Mock asset inventory data
const ASSET_CATEGORIES = {
  'furniture': {
    name: 'Furniture',
    icon: '🪑',
    items: [
      { id: 'F001', name: 'Study Table', location: 'BH1-A101', condition: 'good', assignedTo: 'Rajat Singh', lastChecked: '2024-01-15' },
      { id: 'F002', name: 'Chair', location: 'BH1-A101', condition: 'excellent', assignedTo: 'Rajat Singh', lastChecked: '2024-01-15' },
      { id: 'F003', name: 'Wardrobe', location: 'BH1-A102', condition: 'fair', assignedTo: null, lastChecked: '2024-01-10' },
      { id: 'F004', name: 'Bed Frame', location: 'BH1-A102', condition: 'good', assignedTo: null, lastChecked: '2024-01-10' },
      { id: 'F005', name: 'Study Table', location: 'BH1-A103', condition: 'poor', assignedTo: 'Arjun Kumar', lastChecked: '2024-01-12' }
    ]
  },
  'electronics': {
    name: 'Electronics',
    icon: '💡',
    items: [
      { id: 'E001', name: 'Ceiling Fan', location: 'BH1-A101', condition: 'excellent', assignedTo: null, lastChecked: '2024-01-14' },
      { id: 'E002', name: 'LED Light', location: 'BH1-A101', condition: 'good', assignedTo: null, lastChecked: '2024-01-14' },
      { id: 'E003', name: 'AC Unit', location: 'BH1-A102', condition: 'fair', assignedTo: null, lastChecked: '2024-01-08' },
      { id: 'E004', name: 'Power Socket', location: 'BH1-A103', condition: 'poor', assignedTo: null, lastChecked: '2024-01-05' }
    ]
  },
  'bedding': {
    name: 'Bedding & Linens',
    icon: '🛏️',
    items: [
      { id: 'B001', name: 'Mattress', location: 'BH1-A101-B1', condition: 'good', assignedTo: 'Rajat Singh', lastChecked: '2024-01-16' },
      { id: 'B002', name: 'Pillow', location: 'BH1-A101-B1', condition: 'excellent', assignedTo: 'Rajat Singh', lastChecked: '2024-01-16' },
      { id: 'B003', name: 'Bed Sheet', location: 'BH1-A101-B1', condition: 'good', assignedTo: 'Rajat Singh', lastChecked: '2024-01-16' },
      { id: 'B004', name: 'Mattress', location: 'BH1-A102-B1', condition: 'fair', assignedTo: null, lastChecked: '2024-01-09' }
    ]
  },
  'maintenance': {
    name: 'Maintenance Equipment',
    icon: '🔧',
    items: [
      { id: 'M001', name: 'Fire Extinguisher', location: 'BH1-A-Floor1', condition: 'excellent', assignedTo: null, lastChecked: '2024-01-20' },
      { id: 'M002', name: 'First Aid Kit', location: 'BH1-A-Floor1', condition: 'good', assignedTo: null, lastChecked: '2024-01-18' },
      { id: 'M003', name: 'Cleaning Supplies', location: 'BH1-Storage', condition: 'good', assignedTo: null, lastChecked: '2024-01-17' }
    ]
  }
};

const CONDITION_STATUS = {
  'excellent': { color: 'bg-green-100 text-green-800', priority: 'low' },
  'good': { color: 'bg-blue-100 text-blue-800', priority: 'low' },
  'fair': { color: 'bg-yellow-100 text-yellow-800', priority: 'medium' },
  'poor': { color: 'bg-red-100 text-red-800', priority: 'high' },
  'damaged': { color: 'bg-gray-100 text-gray-800', priority: 'critical' }
};

const MAINTENANCE_ISSUES = [
  {
    id: 'ISSUE-001',
    assetId: 'F005',
    assetName: 'Study Table',
    location: 'BH1-A103',
    reportedBy: 'Arjun Kumar',
    issue: 'Table leg is wobbly and needs repair',
    priority: 'medium',
    status: 'open',
    reportedDate: '2024-01-18',
    assignedTo: 'Maintenance Team A'
  },
  {
    id: 'ISSUE-002',
    assetId: 'E003',
    assetName: 'AC Unit',
    location: 'BH1-A102',
    reportedBy: 'System Check',
    issue: 'AC not cooling properly, may need gas refill',
    priority: 'high',
    status: 'in_progress',
    reportedDate: '2024-01-17',
    assignedTo: 'HVAC Specialist'
  },
  {
    id: 'ISSUE-003',
    assetId: 'E004',
    assetName: 'Power Socket',
    location: 'BH1-A103',
    reportedBy: 'Safety Inspection',
    issue: 'Electrical socket showing signs of damage',
    priority: 'critical',
    status: 'open',
    reportedDate: '2024-01-19',
    assignedTo: null
  }
];

export default function AssetsPage() {
  const [selectedCategory, setSelectedCategory] = useState('furniture');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [showIssues, setShowIssues] = useState(false);
  const [newIssue, setNewIssue] = useState({
    assetId: '',
    description: '',
    priority: 'medium'
  });

  // Get asset statistics
  const getAssetStats = () => {
    const allAssets = Object.values(ASSET_CATEGORIES).flatMap(cat => cat.items);
    return {
      total: allAssets.length,
      excellent: allAssets.filter(item => item.condition === 'excellent').length,
      good: allAssets.filter(item => item.condition === 'good').length,
      fair: allAssets.filter(item => item.condition === 'fair').length,
      poor: allAssets.filter(item => item.condition === 'poor').length,
      damaged: allAssets.filter(item => item.condition === 'damaged').length,
      assigned: allAssets.filter(item => item.assignedTo).length,
      available: allAssets.filter(item => !item.assignedTo).length,
      issues: MAINTENANCE_ISSUES.filter(issue => issue.status !== 'resolved').length
    };
  };

  const stats = getAssetStats();
  const currentCategory = ASSET_CATEGORIES[selectedCategory];

  // Filter assets based on search and condition
  const filteredAssets = currentCategory.items.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (asset.assignedTo && asset.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCondition = filterCondition === 'all' || asset.condition === filterCondition;
    
    return matchesSearch && matchesCondition;
  });

  const reportMaintenanceIssue = () => {
    console.log('Reporting maintenance issue:', newIssue);
    alert('Maintenance issue reported successfully!');
    setShowMaintenanceModal(false);
    setNewIssue({ assetId: '', description: '', priority: 'medium' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lpu-navy mb-2">Asset & Inventory Management</h1>
            <p className="text-gray-600">
              Track hostel furniture, electronics, and maintenance equipment
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Module 6:</span>
            <span>Hostel Inventory</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { label: 'Total Assets', value: stats.total, color: 'bg-blue-50 border-blue-200 text-blue-900' },
          { label: 'Excellent', value: stats.excellent, color: 'bg-green-50 border-green-200 text-green-900' },
          { label: 'Good', value: stats.good, color: 'bg-blue-50 border-blue-200 text-blue-900' },
          { label: 'Fair', value: stats.fair, color: 'bg-yellow-50 border-yellow-200 text-yellow-900' },
          { label: 'Poor', value: stats.poor, color: 'bg-red-50 border-red-200 text-red-900' },
          { label: 'Assigned', value: stats.assigned, color: 'bg-purple-50 border-purple-200 text-purple-900' },
          { label: 'Available', value: stats.available, color: 'bg-gray-50 border-gray-200 text-gray-900' },
          { label: 'Issues', value: stats.issues, color: 'bg-orange-50 border-orange-200 text-orange-900' }
        ].map((stat, index) => (
          <div key={index} className={`border-2 rounded-xl p-3 ${stat.color}`}>
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex flex-wrap gap-2">
          {Object.entries(ASSET_CATEGORIES).map(([categoryId, category]) => (
            <button
              key={categoryId}
              onClick={() => setSelectedCategory(categoryId)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                selectedCategory === categoryId
                  ? 'bg-lpu-gold text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedCategory === categoryId ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
              }`}>
                {category.items.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setShowIssues(!showIssues)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            showIssues 
              ? 'bg-lpu-navy text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {showIssues ? 'Hide' : 'Show'} Maintenance Issues ({stats.issues})
        </button>
        <button
          onClick={() => setShowMaintenanceModal(true)}
          className="px-4 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          Report Issue
        </button>
      </div>

      {/* Maintenance Issues Panel */}
      {showIssues && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Active Maintenance Issues</h2>
          <div className="space-y-4">
            {MAINTENANCE_ISSUES.filter(issue => issue.status !== 'resolved').map((issue) => (
              <div key={issue.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{issue.assetName}</span>
                      <span className="text-sm text-gray-600">({issue.assetId})</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        issue.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {issue.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{issue.location}</p>
                    <p className="text-sm text-gray-800">{issue.issue}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Reported: {new Date(issue.reportedDate).toLocaleDateString()}</p>
                    <p>By: {issue.reportedBy}</p>
                    {issue.assignedTo && <p>Assigned: {issue.assignedTo}</p>}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    issue.status === 'open' ? 'bg-red-100 text-red-800' :
                    issue.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.status.replace('_', ' ').charAt(0).toUpperCase() + issue.status.replace('_', ' ').slice(1)}
                  </span>
                  <button className="px-3 py-1 bg-lpu-navy text-white text-xs rounded hover:bg-lpu-gold transition-colors">
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Assets
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Asset name, location, or assignee..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Condition Filter
            </label>
            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">All Conditions</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCondition('all');
              }}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>

        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {currentCategory.name} ({filteredAssets.length} items)
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Checked
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssets.map((asset) => {
                const conditionConfig = CONDITION_STATUS[asset.condition];
                
                return (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{asset.name}</p>
                        <p className="text-sm text-gray-600">ID: {asset.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {asset.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${conditionConfig.color}`}>
                        {asset.condition.charAt(0).toUpperCase() + asset.condition.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {asset.assignedTo || 'Not assigned'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(asset.lastChecked).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedAsset(asset)}
                          className="text-xs bg-lpu-navy text-white px-3 py-1 rounded hover:bg-lpu-gold transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setNewIssue({ ...newIssue, assetId: asset.id });
                            setShowMaintenanceModal(true);
                          }}
                          className="text-xs bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors"
                        >
                          Report Issue
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedAsset.name}</h2>
                <p className="text-gray-600">Asset ID: {selectedAsset.id}</p>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Asset Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Location:</span> {selectedAsset.location}</div>
                  <div><span className="text-gray-600">Condition:</span> {selectedAsset.condition}</div>
                  <div><span className="text-gray-600">Last Checked:</span> {new Date(selectedAsset.lastChecked).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Assignment Status</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Assigned To:</span> {selectedAsset.assignedTo || 'Not assigned'}</div>
                  <div><span className="text-gray-600">Status:</span> {selectedAsset.assignedTo ? 'In Use' : 'Available'}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedAsset(null)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setNewIssue({ ...newIssue, assetId: selectedAsset.id });
                  setSelectedAsset(null);
                  setShowMaintenanceModal(true);
                }}
                className="flex-1 px-4 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white font-semibold rounded-lg transition-colors"
              >
                Report Issue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Maintenance Issue Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Report Maintenance Issue
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asset ID
                </label>
                <input
                  type="text"
                  value={newIssue.assetId}
                  onChange={(e) => setNewIssue({ ...newIssue, assetId: e.target.value })}
                  placeholder="Asset ID (e.g., F001)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Description
                </label>
                <textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  value={newIssue.priority}
                  onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={reportMaintenanceIssue}
                disabled={!newIssue.assetId || !newIssue.description}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors ${
                  newIssue.assetId && newIssue.description
                    ? 'bg-lpu-gold hover:bg-lpu-gold/90 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Report Issue
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}