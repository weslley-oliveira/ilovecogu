import React from 'react';
import { FiUsers, FiHeart, FiCalendar, FiDollarSign, FiPackage, FiTrendingUp } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockDashboardStats, mockSales, mockAppointments, mockCustomers, mockProducts } from '../../data/mockData';

const Overview = () => {
  const stats = [
    {
      title: 'Total Customers',
      value: mockDashboardStats.totalCustomers,
      icon: FiUsers,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Pets',
      value: mockDashboardStats.totalPets,
      icon: FiHeart,
      color: 'bg-pink-500',
      textColor: 'text-pink-600'
    },
    {
      title: 'Today\'s Appointments',
      value: mockDashboardStats.todayAppointments,
      icon: FiCalendar,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: `$${mockDashboardStats.monthlyRevenue.toFixed(2)}`,
      icon: FiDollarSign,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Low Stock Items',
      value: mockDashboardStats.lowStockItems,
      icon: FiPackage,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  // Sample chart data
  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 5500 }
  ];

  const petSpeciesData = [
    { name: 'Dogs', value: 2, color: '#8884d8' },
    { name: 'Cats', value: 2, color: '#82ca9d' },
    { name: 'Other', value: 0, color: '#ffc658' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiTrendingUp className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className={`text-2xl font-semibold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pet Species Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pet Species Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={petSpeciesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {petSpeciesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
          </div>
          <div className="p-6">
            {mockSales.slice(0, 3).map((sale) => {
              const customer = mockCustomers.find(c => c.id === sale.customerId);
              return (
                <div key={sale.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">
                      {customer?.firstName} {customer?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {sale.items.map(item => item.productName).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${sale.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{sale.date.toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
          </div>
          <div className="p-6">
            {mockAppointments.slice(0, 3).map((appointment) => {
              const customer = mockCustomers.find(c => c.id === appointment.customerId);
              return (
                <div key={appointment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">
                      {customer?.firstName} {customer?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{appointment.time}</p>
                    <p className="text-sm text-gray-500">{appointment.date.toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {mockDashboardStats.lowStockItems > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiPackage className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-sm font-medium text-red-800">Low Stock Alert</h3>
          </div>
          <p className="mt-1 text-sm text-red-700">
            {mockDashboardStats.lowStockItems} items are running low on stock. 
            <span className="font-medium cursor-pointer hover:underline ml-1">View inventory</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Overview;