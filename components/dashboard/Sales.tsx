import React, { useState } from 'react';
import { FiDollarSign, FiTrendingUp, FiCreditCard, FiShoppingBag, FiFilter, FiPlus } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockSales, mockCustomers } from '../../data/mockData';

const Sales = () => {
  const [timeFilter, setTimeFilter] = useState('all');

  const getCustomer = (customerId: string) => {
    return mockCustomers.find(customer => customer.id === customerId);
  };

  const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalTransactions = mockSales.length;
  const averageOrderValue = totalRevenue / totalTransactions;

  // Sample chart data for demonstration
  const revenueData = [
    { month: 'Jan', revenue: 4200, transactions: 45 },
    { month: 'Feb', revenue: 3800, transactions: 38 },
    { month: 'Mar', revenue: 5100, transactions: 52 },
    { month: 'Apr', revenue: 4600, transactions: 47 },
    { month: 'May', revenue: 6200, transactions: 58 },
    { month: 'Jun', revenue: 5800, transactions: 55 }
  ];

  const paymentMethodData = [
    { method: 'Credit Card', value: 65, color: '#3B82F6' },
    { method: 'Cash', value: 25, color: '#10B981' },
    { method: 'Debit Card', value: 8, color: '#F59E0B' },
    { method: 'Check', value: 2, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="h-4 w-4 text-gray-500" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
            <FiPlus className="mr-2 h-4 w-4" />
            New Sale
          </button>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-md p-3">
              <FiDollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-green-600">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-md p-3">
              <FiShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-semibold text-blue-600">{totalTransactions}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-md p-3">
              <FiTrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
              <p className="text-2xl font-semibold text-purple-600">${averageOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-md p-3">
              <FiCreditCard className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Payment Methods</p>
              <p className="text-2xl font-semibold text-yellow-600">{paymentMethodData.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`$${value}`, name === 'revenue' ? 'Revenue' : 'Transactions']} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Transactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Transactions']} />
              <Bar dataKey="transactions" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Methods & Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-4">
            {paymentMethodData.map((method) => (
              <div key={method.method} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: method.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{method.method}</span>
                </div>
                <span className="text-sm text-gray-500">{method.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {mockSales.map((sale) => {
              const customer = getCustomer(sale.customerId);
              return (
                <div key={sale.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FiDollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {customer?.firstName} {customer?.lastName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {sale.items.length} item{sale.items.length !== 1 ? 's' : ''} • {sale.paymentMethod}
                        </p>
                        <p className="text-xs text-gray-400">
                          {sale.date.toLocaleDateString()} at {sale.date.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${sale.total.toFixed(2)}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sale.status === 'completed' ? 'bg-green-100 text-green-800' :
                        sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sale.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Sale Items */}
                  <div className="mt-3 ml-14">
                    <div className="bg-gray-50 rounded-md p-3">
                      <h5 className="text-xs font-medium text-gray-700 mb-2">Items:</h5>
                      <div className="space-y-1">
                        {sale.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-xs text-gray-600">
                            <span>{item.quantity}x {item.productName}</span>
                            <span>${item.total.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-xs">
                        <span className="font-medium">Subtotal:</span>
                        <span>${sale.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">Tax:</span>
                        <span>${sale.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Total:</span>
                        <span>${sale.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;