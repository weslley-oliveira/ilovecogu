import React, { useState } from 'react';
import { FiCalendar, FiClock, FiPlus, FiFilter, FiUser, FiHeart } from 'react-icons/fi';
import { mockAppointments, mockCustomers, mockPets } from '../../data/mockData';
import { Appointment } from '../../types';

const Appointments = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAppointments = mockAppointments.filter(appointment => {
    if (statusFilter === 'all') return true;
    return appointment.status === statusFilter;
  });

  const getCustomer = (customerId: string) => {
    return mockCustomers.find(customer => customer.id === customerId);
  };

  const getPet = (petId: string) => {
    return mockPets.find(pet => pet.id === petId);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      'no-show': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTodayAppointments = () => {
    const today = new Date().toDateString();
    return filteredAppointments.filter(apt => apt.date.toDateString() === today);
  };

  const getUpcomingAppointments = () => {
    const today = new Date();
    return filteredAppointments.filter(apt => apt.date > today);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="h-4 w-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Calendar
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
            <FiPlus className="mr-2 h-4 w-4" />
            Schedule Appointment
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-6">
          {/* Today's Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FiCalendar className="mr-2 h-5 w-5 text-blue-600" />
                Today's Appointments ({getTodayAppointments().length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {getTodayAppointments().length > 0 ? (
                getTodayAppointments().map((appointment) => {
                  const customer = getCustomer(appointment.customerId);
                  const pet = getPet(appointment.petId);
                  return (
                    <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <FiClock className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{appointment.service}</h4>
                            <p className="text-sm text-gray-500">
                              {customer?.firstName} {customer?.lastName} - {pet?.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {appointment.time} • {appointment.duration} minutes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status.replace('-', ' ')}
                          </span>
                          {appointment.cost && (
                            <span className="text-sm font-medium text-gray-900">${appointment.cost}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No appointments scheduled for today
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {getUpcomingAppointments().length > 0 ? (
                getUpcomingAppointments().map((appointment) => {
                  const customer = getCustomer(appointment.customerId);
                  const pet = getPet(appointment.petId);
                  return (
                    <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <FiCalendar className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{appointment.service}</h4>
                            <p className="text-sm text-gray-500">
                              {customer?.firstName} {customer?.lastName} - {pet?.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {appointment.date.toLocaleDateString()} at {appointment.time} • {appointment.duration} minutes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status.replace('-', ' ')}
                          </span>
                          {appointment.cost && (
                            <span className="text-sm font-medium text-gray-900">${appointment.cost}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No upcoming appointments
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Calendar View
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <FiCalendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
            <p className="text-gray-500">Calendar integration would be implemented here</p>
            <p className="text-sm text-gray-400 mt-2">
              This would show a full calendar interface with appointment scheduling capabilities
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-md p-3">
              <FiCalendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today</p>
              <p className="text-2xl font-semibold text-blue-600">{getTodayAppointments().length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-md p-3">
              <FiClock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-2xl font-semibold text-green-600">{getUpcomingAppointments().length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-md p-3">
              <FiUser className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold text-yellow-600">
                {filteredAppointments.filter(apt => apt.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-md p-3">
              <FiHeart className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-purple-600">
                {filteredAppointments.filter(apt => apt.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;