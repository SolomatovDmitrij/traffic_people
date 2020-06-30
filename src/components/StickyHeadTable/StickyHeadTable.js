import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleSelect from '../SimpleSelect';
import './StickyHeadTable.css';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '75vh',
    },
});


function StickyHeadTable(props){
    const classes = useStyles();
  
    const {value_present, rows_object, handleClickEmployee} = props;
    const [unit, setUnit] = React.useState('');
    const rows = Object.values(rows_object).filter(x=> x.FIO && x.present === value_present)
        .filter(x=> unit ==='' || unit === x.unit);

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
        {rows.map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.guid}>
            {props.columns.map((column) => {
                const value = row[column.id];
            let row_class = '';
            if(column.id==='FIO') row_class = 'row_class';
             return (
                    <TableCell className={row_class} onClick={e => handleClickEmployee(value, column.id)} key={column.id} align={column.align}>
                    {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                );
            })}
            </TableRow>
        ), [])}
        </TableBody>
        </Table>
        </TableContainer>

        <SimpleSelect filter_name='Фильтр по подразделению' unit={unit} handleChange={setUnit} units={[...new Set(rows.map(x=>x.unit))]}/>
        </Paper>
    )}

export default StickyHeadTable;

