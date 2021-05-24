import React, {useState, useEffect} from 'react';
import CsvDownloader from 'react-csv-downloader';
import { makeStyles } from '@material-ui/core/styles';
import {fetchTable} from '../../components/api/api';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell, 
  Paper, TablePagination, Icon, Checkbox, IconButton,Button,
AppBar, Tabs, Tab} from '@material-ui/core';

import CheckIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetApp';



const columns = [
 { id: 'name', label: 'Faculty', minWidth: 100 },
  { id: 'class', label: 'Class', minWidth: 100 },
  {
    id: 'subject',
    label: 'Subject',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'stTime',
    label: 'Start Time',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'endTime',
    label: 'End Time',
    minWidth: 100,
    align: 'left',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  navBar:{
    background: '#e5fcff',
    color: 'black'
  },
  dltBtn:{
    background: '#e36414',
    color: 'white',
    '&:hover':{
      background: '#e36414',
      color: 'white',
    }
  },
  dwnBtn:{
    border: 'solid 1px #e36414',
    color: '#e36414',
    background: 'white',
    '&:hover':{
      border: 'solid 1px #e36414',
      color: '#e36414',
      background: 'white'
    }
  }
});

const TableData = ({user}) => {
  const classes = useStyles();
  
  const [pastdata, setPastData] = useState([]);
  const [livedata, setLiveData] = useState([]);
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);


  const [edit, setEdit] = useState(true);
  // const [checked, setChecked] = useState(false);
  useEffect(() => {
    const fetchData = async() => {
        await fetchTable(user).then((res) => {
          setPastData(res.data.classes.past);
          setLiveData(res.data.classes.current);
        })
    }

    fetchData();
  },[user])

  

  const [value,setValue] =useState(0);
  const handleChange= (e,val) => {
      setValue(val);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const handleCheck = (e) => {
    setEdit(!edit);

  }
  
  
    return (
      <div>
       <AppBar position='static' className={classes.navBar}>
        <Tabs value={value} onChange={handleChange}>
            <Tab label="Past Classes"/>
            <Tab label="Live Classes"/>
        </Tabs>         
      </AppBar>
      
    <Paper>
        <IconButton>
          <Button startIcon={<DeleteIcon />} variant="contained" className={classes.dltBtn}>Delete</Button>
        </IconButton>
        <IconButton>
          {
            value ===0 && (
              <CsvDownloader columns={columns} datas={pastdata} filename="Report">
              <Button startIcon={<DownloadIcon />} variant="contained" className={classes.dwnBtn}>Download CSV</Button>
            </CsvDownloader>
            )
          }
          {
            value ===1 && (
              <CsvDownloader columns={columns} datas={livedata} filename="Report">
              <Button startIcon={<DownloadIcon />} variant="contained" className={classes.dwnBtn}>Download CSV</Button>
            </CsvDownloader>
            )
          }
        
        </IconButton>
    </Paper>
    {
      value === 0 &&  (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                  <Icon>
                      <CheckIcon />
                  </Icon>  
              </TableCell>
              
                {
                  edit && (
                    <TableCell align='left' style={{width: 20}}>
                        Edit
                  </TableCell>
                  )
                }
              
              {columns.map((column) => (
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
            {pastdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Checkbox  checked={!edit} onChange={handleCheck}/>
                  </TableCell>
                  {
                    edit && (
                      <TableCell>
                        <EditIcon />
                      </TableCell>
                    )
                  }
                  <TableCell>
                    {row.instructorName}
                  </TableCell>
                  <TableCell>{row.standard}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.endTime}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pastdata.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>)
    } 
    {
      value === 1 &&  (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                  <Icon>
                      <CheckIcon />
                  </Icon>  
              </TableCell>
              
                <TableCell align='left' style={{width: 20}}>
                    Edit
              </TableCell>
              
              {columns.map((column) => (
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
            {livedata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Checkbox  />
                  </TableCell>
                  <TableCell><EditIcon /> </TableCell>
                  <TableCell>
                    {row.instructorName}
                  </TableCell>
                  <TableCell>{row.standard}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.endTime}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={livedata.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>)
    }
    </div>
    
   
  );
}

export default TableData;