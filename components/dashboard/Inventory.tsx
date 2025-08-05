import React, { useState } from 'react';
import { FiPackage, FiPlus, FiEdit, FiAlertTriangle, FiFilter, FiSearch } from 'react-icons/fi';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    const matchesStock = stockFilter === 'all' ||
                        (stockFilter === 'low' && product.stockQuantity <= product.minStockLevel) ||
                        (stockFilter === 'out' && product.stockQuantity === 0) ||
                        (stockFilter === 'in-stock' && product.stockQuantity > product.minStockLevel);
    
    return matchesSearch && matchesCategory && matchesStock && product.isActive;
  });

  const lowStockProducts = mockProducts.filter(product => 
    product.stockQuantity <= product.minStockLevel && product.isActive
  );

  const outOfStockProducts = mockProducts.filter(product => 
    product.stockQuantity === 0 && product.isActive
  );

  const totalValue = mockProducts.reduce((sum, product) => 
    sum + (product.stockQuantity * product.cost), 0
  );

  const categories = ['all', ...new Set(mockProducts.map(product => product.category))];

  const getStockStatus = (product: Product) => {
    if (product.stockQuantity === 0) {
      return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    } else if (product.stockQuantity <= product.minStockLevel) {
      return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      food: '🥘',
      toys: '🎾',
      accessories: '🎀',
      medicine: '💊',
      grooming: '🧴',
      other: '📦'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <FiPlus className="mr-2 h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-md p-3">
              <FiPackage className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-blue-600">{mockProducts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-md p-3">
              <FiPackage className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-2xl font-semibold text-green-600">${totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-md p-3">
              <FiAlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Low Stock</p>
              <p className="text-2xl font-semibold text-yellow-600">{lowStockProducts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-red-500 rounded-md p-3">
              <FiAlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Out of Stock</p>
              <p className="text-2xl font-semibold text-red-600">{outOfStockProducts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiFilter className="h-4 w-4 text-gray-500" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Stock Levels</option>
              <option value="in-stock">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiAlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
          </div>
          <p className="mt-1 text-sm text-yellow-700">
            {lowStockProducts.length} products are running low on stock and need to be restocked.
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product);
          const profitMargin = ((product.price - product.cost) / product.price * 100).toFixed(1);
          
          return (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">{getCategoryIcon(product.category)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiEdit className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">SKU:</span>
                    <span className="text-sm font-medium text-gray-900">{product.sku}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Price:</span>
                    <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Cost:</span>
                    <span className="text-sm font-medium text-gray-900">${product.cost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Margin:</span>
                    <span className="text-sm font-medium text-green-600">{profitMargin}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Stock:</span>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">{product.stockQuantity}</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Min Level:</span>
                    <span className="text-sm font-medium text-gray-900">{product.minStockLevel}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Supplier:</span>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-32" title={product.supplier}>
                      {product.supplier}
                    </span>
                  </div>
                </div>

                {/* Stock Level Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Stock Level</span>
                    <span>{product.stockQuantity}/{product.minStockLevel + 20}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        product.stockQuantity === 0 ? 'bg-red-500' :
                        product.stockQuantity <= product.minStockLevel ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.min((product.stockQuantity / (product.minStockLevel + 20)) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <FiPackage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;