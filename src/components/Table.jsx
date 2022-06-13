import React from "react";
import { useTable } from "react-table";

export default function Table({
  columns,
  data,
  onClick,
  onCheck,
  selectedRows,
}) {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  return (
    <table
      className="table table-dark table-striped table-hover"
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            <th></th>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          let checkInputValue = selectedRows.includes(row.cells[0].value);
          return (
            <tr onClick={() => onClick(row.original.id)} {...row.getRowProps()}>
              <td>
                {/**
                 * input checkbox element for selecting rows.
                 *selected rows comes from parent component so logic can be applied to data inside parent not component.
                 *I as a developer assume that first element in row.cells is the primary key for the row.
                 */}
                <div class="form-check" onClick={(e) => e.stopPropagation()}>
                  <input
                    checked={checkInputValue}
                    onChange={(e) => onCheck(row.original.id, e.target.checked)}
                    class="form-check-input"
                    type="checkbox"
                    value={checkInputValue}
                    id="flexCheckDefault"
                  />
                </div>
              </td>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
