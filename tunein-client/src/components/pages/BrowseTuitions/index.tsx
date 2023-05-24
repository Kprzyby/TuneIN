import ObjectListing from '@components/organisms/ObjectListing';
import { NextPage } from 'next';
import React from 'react';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

const products = [
  { id: 1, name: 'Product A', price: 10.99, category: 'Electronics' },
  { id: 2, name: 'Product B', price: 19.99, category: 'Clothing' },
  { id: 3, name: 'Product C', price: 7.99, category: 'Home & Kitchen' },
];

const tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 3, title: 'Task 3', completed: false },
];

const BrowseTuitions: NextPage = () => (
  <ObjectListing objects={products} />
);

export default BrowseTuitions;
