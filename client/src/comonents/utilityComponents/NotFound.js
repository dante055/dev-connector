import React from 'react';

const NotFound = () => {
  return (
    <section className='container'>
      <h1 className='large text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Page not found!
      </h1>
      <p className='lead'>Sorry, this page does not exist...</p>
    </section>
  );
};

export default NotFound;
