'use client';

import { useState } from 'react';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Search,
  Plus,
  Edit,
  Trash2,
  ShoppingCart,
  Users,
  Archive,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  supplier: string;
  lastUpdated: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop Pro 15"', sku: 'LAP-001', category: 'Electronics', quantity: 45, price: 1299.99, status: 'In Stock', supplier: 'Tech Suppliers Inc', lastUpdated: '2025-11-04' },
    { id: 2, name: 'Wireless Mouse', sku: 'MOU-002', category: 'Accessories', quantity: 8, price: 29.99, status: 'Low Stock', supplier: 'Gadget World', lastUpdated: '2025-11-03' },
    { id: 3, name: 'USB-C Cable', sku: 'CAB-003', category: 'Accessories', quantity: 0, price: 12.99, status: 'Out of Stock', supplier: 'Cable Co', lastUpdated: '2025-11-01' },
    { id: 4, name: 'Mechanical Keyboard', sku: 'KEY-004', category: 'Accessories', quantity: 32, price: 89.99, status: 'In Stock', supplier: 'Tech Suppliers Inc', lastUpdated: '2025-11-04' },
    { id: 5, name: '27" Monitor', sku: 'MON-005', category: 'Electronics', quantity: 15, price: 349.99, status: 'In Stock', supplier: 'Display Masters', lastUpdated: '2025-11-05' },
    { id: 6, name: 'Desk Lamp', sku: 'LAM-006', category: 'Furniture', quantity: 5, price: 45.00, status: 'Low Stock', supplier: 'Office Goods', lastUpdated: '2025-11-02' },
  ]);

  const stats = [
    { title: 'Total Products', value: '1,247', change: '+12%', icon: Package, color: 'bg-blue-500' },
    { title: 'Low Stock Items', value: '23', change: '-5%', icon: AlertTriangle, color: 'bg-yellow-500' },
    { title: 'Total Revenue', value: '$847K', change: '+18%', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Orders Today', value: '156', change: '+8%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const salesData = [
    { month: 'Jan', sales: 45000, orders: 234 },
    { month: 'Feb', sales: 52000, orders: 267 },
    { month: 'Mar', sales: 48000, orders: 245 },
    { month: 'Apr', sales: 61000, orders: 312 },
    { month: 'May', sales: 55000, orders: 289 },
    { month: 'Jun', sales: 67000, orders: 334 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 42 },
    { name: 'Accessories', value: 28 },
    { name: 'Furniture', value: 18 },
    { name: 'Others', value: 12 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['overview', 'products', 'analytics', 'suppliers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-4 text-sm font-medium border-b-2 transition capitalize ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Sales Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Category Distribution</h3>
                  <Archive className="w-5 h-5 text-gray-400" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Trend */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Orders Trend</h3>
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products by name, SKU, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                  Filter
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${product.quantity < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                            {product.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.supplier}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-blue-600 hover:text-blue-900 transition">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 transition">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Average Order Value</h4>
                <p className="text-3xl font-bold text-gray-900">$542.50</p>
                <p className="text-sm text-green-600 mt-2">+12.5% vs last month</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Conversion Rate</h4>
                <p className="text-3xl font-bold text-gray-900">3.2%</p>
                <p className="text-sm text-green-600 mt-2">+0.4% vs last month</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Stock Turnover</h4>
                <p className="text-3xl font-bold text-gray-900">8.3x</p>
                <p className="text-sm text-red-600 mt-2">-0.2x vs last month</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suppliers' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Supplier Management</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['Tech Suppliers Inc', 'Gadget World', 'Cable Co', 'Display Masters', 'Office Goods'].map((supplier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{supplier}</h4>
                        <p className="text-sm text-gray-500">Active since 2024 • {Math.floor(Math.random() * 50) + 10} products</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        View Details
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
