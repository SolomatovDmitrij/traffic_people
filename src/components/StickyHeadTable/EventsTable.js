import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SelectEmployee from '../SelectEmployee';
import './EventsTable.css';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '75vh',
    },
});


function EventsTable(props){
    const classes = useStyles();
  
    var  employee_data = props.employee_data;
    const { rows_object } = props;
    const employee = props.employee_for_filter;
    const setEmployee = props.handleChangeEmployee;
    const rows = rows_object
        .map(current => {
            if(employee_data)
            Object.assign(current, employee_data[current.ow_uid])
            return current;
        })
        .filter(x=> (x.FIO) && (employee ==='' || employee === x.FIO)) ;

    return (    
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
        <TableRow>
        {props.columns.map((column) => (
            <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
            >
            {column.label}
            </TableCell>
        ))}
        </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => {
            let row_class = 'table_row';
            if(row.name==='Вход сотрудника') row_class = 'table_row input';
            return (
            <TableRow className={row_class} tabIndex={-1} key={row.id}>
            {props.columns.map((column) => {
                const value = row[column.id];
                return (
                    <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                );
            })}
            </TableRow>
        )}, [])}
        </TableBody>
        </Table>
        </TableContainer>

        <SelectEmployee filter_name='Фильтр по сотруднику' employee={employee} handleChange={setEmployee} employees={[...new Set(rows.map(x=> x.FIO))].sort()}/>
        </Paper>
    )}

export default EventsTable;

