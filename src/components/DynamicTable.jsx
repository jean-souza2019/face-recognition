import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DynamicTable = ({ headers, data, fieldMap, actions }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        {/* Cabeçalho da Tabela */}
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header.label}</TableCell>
            ))}
            {actions && <TableCell>Ações</TableCell>}
          </TableRow>
        </TableHead>

        {/* Corpo da Tabela */}
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, colIndex) => (
                <TableCell key={colIndex}>
                  {row[header.field] ?? "-"}
                </TableCell>
              ))}
              {actions && <TableCell>{actions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
