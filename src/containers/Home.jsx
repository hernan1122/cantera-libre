import React from 'react';
import Products from '../components/Products';
import initialState from '../initialState';

export function Home() {
  return (
    <Products products={initialState.products} />
  );
}
