import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiHeart, FiArrowRight, FiUsers, FiCalendar, FiDollarSign, FiPackage } from 'react-icons/fi';

export default function Home() {
  const features = [
    {
      title: 'Customer Management',
      description: 'Manage customer profiles, contact information, and pet ownership records.',
      icon: FiUsers,
      color: 'text-blue-600'
    },
    {
      title: 'Pet Profiles',
      description: 'Comprehensive pet profiles with medical history and vaccination records.',
      icon: FiHeart,
      color: 'text-pink-600'
    },
    {
      title: 'Appointment Scheduling',
      description: 'Schedule and manage appointments with calendar integration.',
      icon: FiCalendar,
      color: 'text-green-600'
    },
    {
      title: 'Sales Tracking',
      description: 'Track sales, revenue, and payment methods with detailed analytics.',
      icon: FiDollarSign,
      color: 'text-yellow-600'
    },
    {
      title: 'Inventory Management',
      description: 'Monitor stock levels, product information, and supplier details.',
      icon: FiPackage,
      color: 'text-purple-600'
    }
  ];

  return (
    <>
      <Head>
        <title>Pet Shop CRM - Customer Relationship Management</title>
        <meta name="description" content="Complete CRM solution for pet shops and veterinary clinics" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <FiHeart className="h-8 w-8 text-pink-500 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">PetShop CRM</h1>
              </div>
              <Link href="/dashboard">
                <a className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                  Access Dashboard
                  <FiArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Pet Shop <span className="text-blue-600">CRM</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive customer relationship management system designed specifically for pet shops, 
              veterinary clinics, and animal care businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <a className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Launch Dashboard
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Link>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
                View Demo
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard Overview</h2>
              <p className="text-gray-600">Get insights into your pet shop's performance at a glance</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">3</h3>
                <p className="text-gray-600">Customers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">4</h3>
                <p className="text-gray-600">Pets</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCalendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">3</h3>
                <p className="text-gray-600">Appointments</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiDollarSign className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">$139</h3>
                <p className="text-gray-600">Revenue</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Streamline your pet shop operations with our comprehensive CRM system.
            </p>
            <Link href="/dashboard">
              <a className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
                Access Full Dashboard
                <FiArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center">
              <FiHeart className="h-6 w-6 text-pink-500 mr-2" />
              <span className="text-gray-600">PetShop CRM - Built with love for pet care businesses</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
