import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit, FiPhone, FiMail, FiMapPin, FiUser } from 'react-icons/fi';
import { mockCustomers, mockPets } from '../../data/mockData';
import { Customer } from '../../types';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerPets = (customerId: string) => {
    return mockPets.filter(pet => pet.ownerId === customerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FiPlus className="mr-2 h-4 w-4" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Customer List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedCustomer?.id === customer.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                    <p className="text-xs text-gray-400">
                      {getCustomerPets(customer.id).length} pet(s)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Details */}
        <div className="lg:col-span-2">
          {selectedCustomer ? (
            <div className="bg-white rounded-lg shadow">
              {/* Customer Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <FiUser className="h-8 w-8 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedCustomer.firstName} {selectedCustomer.lastName}
                      </h2>
                      <p className="text-gray-500">Customer since {selectedCustomer.dateJoined.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200 transition-colors">
                    <FiEdit className="mr-2 h-4 w-4" />
                    Edit
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <FiMail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{selectedCustomer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{selectedCustomer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 md:col-span-2">
                      <FiMapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-900">
                          {selectedCustomer.address.street}, {selectedCustomer.address.city}, {selectedCustomer.address.state} {selectedCustomer.address.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-600 font-medium">Total Spent</p>
                      <p className="text-2xl font-bold text-blue-900">${selectedCustomer.totalSpent.toFixed(2)}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-600 font-medium">Number of Pets</p>
                      <p className="text-2xl font-bold text-green-900">{getCustomerPets(selectedCustomer.id).length}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-purple-600 font-medium">Customer Since</p>
                      <p className="text-xl font-bold text-purple-900">
                        {Math.ceil((new Date().getTime() - selectedCustomer.dateJoined.getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer's Pets */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pets</h3>
                  {getCustomerPets(selectedCustomer.id).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getCustomerPets(selectedCustomer.id).map((pet) => (
                        <div key={pet.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                              <span className="text-pink-600 text-lg">🐾</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{pet.name}</h4>
                              <p className="text-sm text-gray-500">{pet.breed} • {pet.age} years old</p>
                              <p className="text-xs text-gray-400 capitalize">{pet.species} • {pet.gender}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No pets registered for this customer.</p>
                  )}
                </div>

                {/* Notes */}
                {selectedCustomer.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedCustomer.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <FiUser className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Customer</h3>
              <p className="text-gray-500">Choose a customer from the list to view their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;