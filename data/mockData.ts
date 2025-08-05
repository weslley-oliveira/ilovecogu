import { Customer, Pet, Appointment, Sale, Product, DashboardStats } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Oak Street',
      city: 'Petville',
      state: 'CA',
      zipCode: '90210'
    },
    dateJoined: new Date('2023-01-15'),
    totalSpent: 1250.75,
    notes: 'Regular customer, prefers morning appointments'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@email.com',
    phone: '(555) 987-6543',
    address: {
      street: '456 Pine Avenue',
      city: 'Petville',
      state: 'CA',
      zipCode: '90211'
    },
    dateJoined: new Date('2023-03-22'),
    totalSpent: 875.50,
    notes: 'Has two cats, very concerned about their health'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 456-7890',
    address: {
      street: '789 Maple Drive',
      city: 'Petville',
      state: 'CA',
      zipCode: '90212'
    },
    dateJoined: new Date('2022-11-08'),
    totalSpent: 2150.25,
    notes: 'Dog trainer, very knowledgeable about pet care'
  }
];

export const mockPets: Pet[] = [
  {
    id: '1',
    ownerId: '1',
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 65,
    color: 'Golden',
    gender: 'male',
    dateOfBirth: new Date('2021-05-15'),
    microchipId: 'MC123456789',
    medicalHistory: [],
    vaccinations: [],
    notes: 'Very friendly, loves treats'
  },
  {
    id: '2',
    ownerId: '2',
    name: 'Luna',
    species: 'cat',
    breed: 'Siamese',
    age: 2,
    weight: 8,
    color: 'Seal Point',
    gender: 'female',
    dateOfBirth: new Date('2022-03-10'),
    microchipId: 'MC987654321',
    medicalHistory: [],
    vaccinations: [],
    notes: 'Indoor cat, somewhat shy'
  },
  {
    id: '3',
    ownerId: '2',
    name: 'Shadow',
    species: 'cat',
    breed: 'Maine Coon',
    age: 4,
    weight: 12,
    color: 'Black',
    gender: 'male',
    dateOfBirth: new Date('2020-08-22'),
    microchipId: 'MC456789123',
    medicalHistory: [],
    vaccinations: [],
    notes: 'Large cat, very gentle'
  },
  {
    id: '4',
    ownerId: '3',
    name: 'Bella',
    species: 'dog',
    breed: 'Border Collie',
    age: 5,
    weight: 45,
    color: 'Black and White',
    gender: 'female',
    dateOfBirth: new Date('2019-02-14'),
    microchipId: 'MC789123456',
    medicalHistory: [],
    vaccinations: [],
    notes: 'High energy, needs regular exercise'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerId: '1',
    petId: '1',
    date: new Date(),
    time: '10:00 AM',
    service: 'Annual Checkup',
    duration: 60,
    status: 'scheduled',
    notes: 'Annual wellness exam and vaccinations',
    cost: 150,
    veterinarian: 'Dr. Smith'
  },
  {
    id: '2',
    customerId: '2',
    petId: '2',
    date: new Date(Date.now() + 86400000), // Tomorrow
    time: '2:00 PM',
    service: 'Grooming',
    duration: 90,
    status: 'scheduled',
    notes: 'Full grooming service',
    cost: 75
  },
  {
    id: '3',
    customerId: '3',
    petId: '4',
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    time: '9:00 AM',
    service: 'Dental Cleaning',
    duration: 120,
    status: 'scheduled',
    notes: 'Routine dental cleaning under anesthesia',
    cost: 300,
    veterinarian: 'Dr. Johnson'
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    customerId: '1',
    date: new Date(),
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Premium Dog Food - 30lb',
        quantity: 1,
        unitPrice: 65.99,
        total: 65.99
      },
      {
        id: '2',
        productId: '2',
        productName: 'Dog Leash',
        quantity: 1,
        unitPrice: 24.99,
        total: 24.99
      }
    ],
    subtotal: 90.98,
    tax: 7.28,
    total: 98.26,
    paymentMethod: 'credit',
    status: 'completed'
  },
  {
    id: '2',
    customerId: '2',
    date: new Date(Date.now() - 86400000), // Yesterday
    items: [
      {
        id: '3',
        productId: '3',
        productName: 'Cat Litter - 20lb',
        quantity: 2,
        unitPrice: 18.99,
        total: 37.98
      }
    ],
    subtotal: 37.98,
    tax: 3.04,
    total: 41.02,
    paymentMethod: 'cash',
    status: 'completed'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Dog Food - 30lb',
    category: 'food',
    brand: 'NutriPet',
    description: 'High-quality dry dog food for adult dogs',
    price: 65.99,
    cost: 42.50,
    stockQuantity: 25,
    minStockLevel: 10,
    supplier: 'Pet Nutrition Co.',
    sku: 'NP-DF-30',
    isActive: true
  },
  {
    id: '2',
    name: 'Dog Leash',
    category: 'accessories',
    brand: 'WalkSafe',
    description: 'Durable nylon dog leash, 6 feet',
    price: 24.99,
    cost: 12.50,
    stockQuantity: 15,
    minStockLevel: 5,
    supplier: 'Pet Gear Inc.',
    sku: 'WS-DL-6',
    isActive: true
  },
  {
    id: '3',
    name: 'Cat Litter - 20lb',
    category: 'accessories',
    brand: 'CleanPaws',
    description: 'Clumping clay cat litter',
    price: 18.99,
    cost: 10.25,
    stockQuantity: 8,
    minStockLevel: 12,
    supplier: 'Litter Solutions LLC',
    sku: 'CP-CL-20',
    isActive: true
  },
  {
    id: '4',
    name: 'Pet Shampoo',
    category: 'grooming',
    brand: 'SoftCoat',
    description: 'Gentle hypoallergenic pet shampoo',
    price: 16.99,
    cost: 8.75,
    stockQuantity: 3,
    minStockLevel: 8,
    supplier: 'Grooming Supplies Co.',
    sku: 'SC-PS-16',
    isActive: true
  },
  {
    id: '5',
    name: 'Interactive Cat Toy',
    category: 'toys',
    brand: 'PlayTime',
    description: 'Motion-activated cat toy with feathers',
    price: 29.99,
    cost: 15.00,
    stockQuantity: 20,
    minStockLevel: 5,
    supplier: 'Pet Fun Industries',
    sku: 'PT-ICT-29',
    isActive: true
  }
];

export const mockDashboardStats: DashboardStats = {
  totalCustomers: mockCustomers.length,
  totalPets: mockPets.length,
  todayAppointments: mockAppointments.filter(apt => 
    apt.date.toDateString() === new Date().toDateString()
  ).length,
  monthlyRevenue: mockSales.reduce((total, sale) => total + sale.total, 0),
  lowStockItems: mockProducts.filter(product => 
    product.stockQuantity <= product.minStockLevel
  ).length,
  recentSales: mockSales.slice(0, 5),
  upcomingAppointments: mockAppointments.slice(0, 5)
};