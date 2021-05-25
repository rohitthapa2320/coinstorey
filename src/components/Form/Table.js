import React, {useState, useEffect} from 'react';
import CsvDownloader from 'react-csv-downloader';
import { makeStyles } from '@material-ui/core/styles';
import {fetchTable} from '../../components/api/api';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell, 
  Paper, TablePagination, Checkbox, IconButton,Button,
AppBar, Tabs, Tab} from '@material-ui/core';

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
  const [selected, setSelected] = useState([]);
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);


  useEffect(() => {
    const fetchData = async() => {
        await fetchTable(user).then((res) => {
          setPastData(res.data.classes.past);
          setLiveData(res.data.classes.current);
        })
    }

    fetchData();
  },[user])

  function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {
          numSelected ===0 && <TableCell>Edit</TableCell>
        }
        {columns.map((col) => (
          <TableCell
            key={col.id}
           align={col.align}
          style={{ minWidth: col.minWidth }}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

  const [value,setValue] =useState(0);
  const handleChange= (e,val) => {
      setValue(val);
  }

  let rows=[];
  let datas={};

  if(value ===0)
   {
     rows= pastdata;
     const [instructorName,standard,subject,startTime,endTime]=pastdata;
     datas=[instructorName,standard,subject,startTime,endTime];
   }
  if(value ===1)
   {
     rows= livedata;
     const {instructorName,standard,subject,startTime,endTime}=livedata;
     datas={instructorName,standard,subject,startTime,endTime}
   }

const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  
  
  
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
            value ===0 && 
              (
              <CsvDownloader columns={columns} datas={datas} filename="Report">
              <Button startIcon={<DownloadIcon />} variant="contained" className={classes.dwnBtn}>Download CSV</Button>
            </CsvDownloader>
            )
          }
          {
            value ===1 && (
              <CsvDownloader columns={columns} datas={datas} filename="Report">
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
          <Table stickyHeader aria-label="sticky table" >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={pastdata.length}
            />
            <TableBody>
              {pastdata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      
                      {
                       selected.length === 0  && <TableCell><EditIcon /></TableCell>
                      }
                      <>
                    {row.instructorName}
                  </>
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
          rowsPerPageOptions={[5, 10, 25]}
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
          <Table stickyHeader aria-label="sticky table" >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={livedata.length}
            />
            <TableBody>
              {livedata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      
                      {
                       selected.length === 0  && <TableCell><EditIcon /></TableCell>
                      }
                      <>
                    {row.instructorName}
                  </>
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
          rowsPerPageOptions={[5, 10, 25]}
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