import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StickyHeadTable from '../StickyHeadTable/StickyHeadTable';
import EventsTable from '../StickyHeadTable/EventsTable';
import './SimpleTabs.css';
import {data} from '../../fix-data';

const columns_absent = [
    { id: 'last_event_date', label: 'Последнее время ухода', minWidth: 170 },
    { id: 'FIO', label: 'ФИО', minWidth: 150 },
    { id: 'post', label: 'Должность', minWidth: 170 },
    { id: 'unit', label: 'Подразделение', minWidth: 170 },
];

const columns_present = [
    { id: 'first_event_date', label: 'Первое время прихода', minWidth: 160 },
    { id: 'FIO', label: 'ФИО', minWidth: 150 },
    { id: 'post', label: 'Должность', minWidth: 170 },
    { id: 'unit', label: 'Подразделение', minWidth: 170 },
];

const columns_events = [
    {id: 'date', label: 'Дата события', minWidth: 130},
    {id: 'name', label: 'Событие', minWidth: 150 },
    {id: 'FIO', label: 'Сотрудник', minWidth: 150},
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
//    const [data, setData] = React.useState({present:{}, absent:{}});
    const [update_data, setUpdateData] = React.useState(false);
    const [currentEmployee, setCurrentEmployee] = React.useState('');
/*    
    React.useEffect(() => {
        //get data from backend
        fetch('http://mail.nskavd.ru:51424')
//        fetch('http://192.168.0.210:3004')
            .then((response) => { return response.json();})
            .then((tabl) => setData(tabl));
    }, [update_data])
*/
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setUpdateData(!update_data);
    };

    const handlePickEmployee = (newValue) => {
        setCurrentEmployee(newValue);
    };

    const handleClickEmployee = (clickEmployee, column_name) => {
        if(column_name === 'FIO'){
            setCurrentEmployee(clickEmployee);
            setValue(2);
        }
    };

    return (
        <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: '#e77817'}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Сейчас в аппарате" {...a11yProps(0)} />
        <Tab label="Отсутствуют в аппарате" {...a11yProps(1)} />
        <Tab label="Входы и выходы" {...a11yProps(2)} />
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <StickyHeadTable handleClickEmployee={handleClickEmployee} rows_object={data.present} columns={columns_present} value_present={true} />
        </TabPanel>
        <TabPanel value={value} index={1}>
        <StickyHeadTable handleClickEmployee={handleClickEmployee} rows_object={data.present} columns={columns_absent} value_present={false} />
        </TabPanel>
        <TabPanel value={value} index={2}>
        <EventsTable employee_for_filter={currentEmployee} handleChangeEmployee={handlePickEmployee} rows_object={data.events} columns={columns_events} employee_data={data.present} />
        </TabPanel>
        </div>
    );
}
