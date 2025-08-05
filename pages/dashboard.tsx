import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from '../components/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import Customers from '../components/dashboard/Customers';
import Pets from '../components/dashboard/Pets';
import Appointments from '../components/dashboard/Appointments';
import Sales from '../components/dashboard/Sales';
import Inventory from '../components/dashboard/Inventory';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'customers':
        return <Customers />;
      case 'pets':
        return <Pets />;
      case 'appointments':
        return <Appointments />;
      case 'sales':
        return <Sales />;
      case 'inventory':
        return <Inventory />;
      default:
        return <Overview />;
    }
  };

  return (
    <>
      <Head>
        <title>Pet Shop CRM Dashboard</title>
        <meta name="description" content="Pet Shop Customer Relationship Management Dashboard" />
      </Head>
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </DashboardLayout>
    </>
  );
};

export default Dashboard;