// Table.jsx
import React from 'react';

function TableBody({ characterData }) {
  if (characterData === null) {
    return <caption>Data Unavailable</caption>;
  }

  return (
    <tbody>
      {characterData.map((character, index) => (
        <tr key={index}>
          <td>{character.name}</td>
          <td>{character.email}</td>
          {/* Add more columns as needed */}
        </tr>
      ))}
    </tbody>
  );
}

function Table({ characterData }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <TableBody characterData={characterData} />
    </table>
  );
}

export default Table;
