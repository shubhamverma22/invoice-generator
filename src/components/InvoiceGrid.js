import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function InvoiceGrid({ invoices }) {
  return (
    <TableContainer component={Paper} title="Invoices">
      <Table aria-label="Invoice table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Discount %</TableCell>
            <TableCell align="center">Discount</TableCell>
            <TableCell align="center">Tax %</TableCell>
            <TableCell align="center">Tax</TableCell>
            <TableCell align="center">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow key={`invoice-${index}`}>
              <TableCell align="center">{invoice.qty}</TableCell>
              <TableCell align="center">{invoice.price}</TableCell>
              <TableCell align="center">{invoice.discountPercentage}</TableCell>
              <TableCell align="center">{invoice.discountAmount}</TableCell>
              <TableCell align="center">{invoice.taxPercentage}</TableCell>
              <TableCell align="center">{invoice.taxAmount}</TableCell>
              <TableCell align="center">{invoice.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvoiceGrid;
