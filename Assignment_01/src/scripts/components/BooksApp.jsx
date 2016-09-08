import React from 'react';
import BooksSearchFilter from '../containers/BooksSearchFilter';
import BooksLevelFilter from '../containers/BooksLevelFilter';
import BooksVisibleShelf from '../containers/BooksVisibleShelf';

const BooksApp = () => (
  <div className="BooksApp">
    <BooksSearchFilter />
    <BooksLevelFilter />
    <BooksVisibleShelf />
  </div>
);

export default BooksApp;
