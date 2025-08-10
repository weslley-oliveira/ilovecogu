import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit, FiHeart, FiFileText, FiCalendar } from 'react-icons/fi';
import { mockPets, mockCustomers } from '../../data/mockData';
import { Pet } from '../../types';

const Pets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [activeTab, setActiveTab] = useState('profile');

  const filteredPets = mockPets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOwner = (ownerId: string) => {
    return mockCustomers.find(customer => customer.id === ownerId);
  };

  const getSpeciesEmoji = (species: string) => {
    const emojiMap: { [key: string]: string } = {
      dog: '🐕',
      cat: '🐱',
      bird: '🐦',
      fish: '🐠',
      reptile: '🦎',
      'small-animal': '🐹',
      other: '🐾'
    };
    return emojiMap[species] || '🐾';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pet Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FiPlus className="mr-2 h-4 w-4" />
          Add Pet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pet List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search pets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Pet List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredPets.map((pet) => {
              const owner = getOwner(pet.ownerId);
              return (
                <div
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedPet?.id === pet.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getSpeciesEmoji(pet.species)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{pet.name}</p>
                      <p className="text-sm text-gray-500 truncate">{pet.breed}</p>
                      <p className="text-xs text-gray-400">
                        Owner: {owner?.firstName} {owner?.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pet Details */}
        <div className="lg:col-span-2">
          {selectedPet ? (
            <div className="bg-white rounded-lg shadow">
              {/* Pet Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">{getSpeciesEmoji(selectedPet.species)}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPet.name}</h2>
                      <p className="text-gray-500">
                        {selectedPet.breed} • {selectedPet.age} years old
                      </p>
                      <p className="text-sm text-gray-400 capitalize">
                        {selectedPet.species} • {selectedPet.gender}
                      </p>
                    </div>
                  </div>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200 transition-colors">
                    <FiEdit className="mr-2 h-4 w-4" />
                    Edit
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  {[
                    { id: 'profile', label: 'Profile', icon: FiHeart },
                    { id: 'medical', label: 'Medical Records', icon: FiFileText },
                    { id: 'vaccines', label: 'Vaccinations', icon: FiCalendar }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Species</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedPet.species}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Breed</p>
                          <p className="font-medium text-gray-900">{selectedPet.breed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Age</p>
                          <p className="font-medium text-gray-900">{selectedPet.age} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Weight</p>
                          <p className="font-medium text-gray-900">{selectedPet.weight} lbs</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Color</p>
                          <p className="font-medium text-gray-900">{selectedPet.color}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Gender</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedPet.gender}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium text-gray-900">{selectedPet.dateOfBirth.toLocaleDateString()}</p>
                        </div>
                        {selectedPet.microchipId && (
                          <div>
                            <p className="text-sm text-gray-500">Microchip ID</p>
                            <p className="font-medium text-gray-900">{selectedPet.microchipId}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Owner Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h3>
                      {(() => {
                        const owner = getOwner(selectedPet.ownerId);
                        return owner ? (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="font-medium text-gray-900">
                              {owner.firstName} {owner.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{owner.email}</p>
                            <p className="text-sm text-gray-500">{owner.phone}</p>
                          </div>
                        ) : (
                          <p className="text-gray-500">Owner information not found</p>
                        );
                      })()}
                    </div>

                    {/* Notes */}
                    {selectedPet.notes && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">{selectedPet.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Medical Records Tab */}
                {activeTab === 'medical' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                        <FiPlus className="mr-2 h-4 w-4" />
                        Add Record
                      </button>
                    </div>
                    {selectedPet.medicalHistory.length > 0 ? (
                      <div className="space-y-4">
                        {selectedPet.medicalHistory.map((record) => (
                          <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{record.diagnosis}</h4>
                              <span className="text-sm text-gray-500">{record.date.toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{record.treatment}</p>
                            <div className="text-sm text-gray-500">
                              <p>Veterinarian: {record.veterinarian}</p>
                              <p>Cost: ${record.cost.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FiFileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No Medical Records</h4>
                        <p className="text-gray-500">No medical records have been added for this pet yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Vaccinations Tab */}
                {activeTab === 'vaccines' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Vaccination Records</h3>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                        <FiPlus className="mr-2 h-4 w-4" />
                        Add Vaccination
                      </button>
                    </div>
                    {selectedPet.vaccinations.length > 0 ? (
                      <div className="space-y-4">
                        {selectedPet.vaccinations.map((vaccination) => (
                          <div key={vaccination.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{vaccination.vaccineName}</h4>
                              <span className="text-sm text-gray-500">
                                {vaccination.dateAdministered.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              <p>Veterinarian: {vaccination.veterinarian}</p>
                              <p>Next Due: {vaccination.nextDueDate.toLocaleDateString()}</p>
                              {vaccination.batchNumber && (
                                <p>Batch Number: {vaccination.batchNumber}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No Vaccination Records</h4>
                        <p className="text-gray-500">No vaccination records have been added for this pet yet.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <FiHeart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Pet</h3>
              <p className="text-gray-500">Choose a pet from the list to view their profile and medical records</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pets;