// src/components/DataTable.js
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

const DataTable = ({ opportunities }) => {
  return (
    <Table variant="striped" colorScheme="teal">
      <TableCaption>Opportunity Data</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Close Date</Th>
          <Th>Amount</Th>
          <Th>Stage</Th>
        </Tr>
      </Thead>
      <Tbody>
        {opportunities.map(opportunity => (
          <Tr key={opportunity.Id}>
            <Td>{opportunity.Name}</Td>
            <Td>{opportunity.CloseDate}</Td>
            <Td>{opportunity.Amount}</Td>
            <Td>{opportunity.StageName}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DataTable;
