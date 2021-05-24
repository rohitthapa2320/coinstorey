import React, {useState, useEffect} from 'react';
import {Grid, Paper, TextField, Container, Typography, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import TableData from './Table';

import {fetchFaculties} from '../../components/api/api';

const standards = [
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 11,
    label: '11',
  },
  {
    value: 12,
    label: '12',
  },
  
];

const useStyles= makeStyles((theme) => ({
  root:{
    [theme.breakpoints.up("sm")]:{
        paddingLeft:20
    }
    },
    text:{
        marginLeft:theme.spacing(4),
        paddingTop: theme.spacing(4),
    },
  paper:{
      marginTop: theme.spacing(3)
    },
    input:{
      margin:theme.spacing(4)
    },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  btn:{
      margin:theme.spacing(4),
      paddingLeft: theme.spacing(8),
      paddingTop: theme.spacing(2),
  },
  table:{
    marginTop: theme.spacing(4),
    marginBottom:theme.spacing(8)
  },
  searchBtn:{
    background: '#e36414',
    color: 'white',
    width: 150,
    [theme.breakpoints.down("sm")]:{
      width: 100
    },
    '&:hover':{
    background: '#e36414',
    color: 'white',
    }
  }
}));



const Input = () => {
  const classes= useStyles();

  const [fac, setFac] = useState(['Search Faculty']);
  const [teacher, setTeacher] =useState('');
  const [stT, setStT] = useState(null);
  const [enT, setEnT] =useState(null);
  const [cls, setCls] = useState(null);
  const [user, setUser] = useState({}); 
  const [click,setClick] = useState(false);
  

  useEffect(()=> {
    fetchFaculties()
      .then((res) => setFac(res.data.faculties));
  },[])


  const handleFac =(e) =>{
  e.preventDefault();
  setTeacher(e.target.value);
};
const stTime =(e) =>{
  e.preventDefault();
  setStT(e.target.value);
};
const enTime =(e) =>{
  e.preventDefault();
  setEnT(e.target.value);
};
const handleSt =(e) =>{
  e.preventDefault();
  setCls(e.target.value);
};

const handleClick = () => {
  const data= {instructorName: teacher,
  beginDateTime:stT,
  endDateTime:enT,  
   standard : cls};

   setUser(data);
   setClick(true);
}

  return (
    <div className={classes.root}> 
      <Container>
        <Paper className={classes.paper}>
          <Typography className={classes.text} variant="h4">
            Search for Class
          </Typography>
          <Grid container>
            <Grid item className={classes.input} sm={3}>
              <TextField
                id="standard-select-currency-native"
                select
                label="Select Faculty"
                // value="anc"
                onChange={handleFac}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select Faculty"
              >
                {fac.map((f) => (
                  <option value={f}>
                    {f}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item className={classes.input} sm={3}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="datetime-local"
                    label="Starting Time"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    onChange={stTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </form>
            </Grid>
            <Grid item className={classes.input} sm={3}>
                <form className={classes.container} noValidate>
                  <TextField
                    id="datetime-local"
                    label="Ending Time"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    onChange={enTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </form>
            </Grid>
          <Grid item className={classes.input}>
            <TextField
                id="standard-select-currency-native"
                select
                label="Select Class"
                // value="anc"
                onChange={handleSt}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select your class"
              >
                {standards.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
          </Grid>
          <Grid item className={classes.btn}>
            <Button variant="contained"className={classes.searchBtn}
            onClick={handleClick}>Search</Button>
          </Grid>
          </Grid>
          
        </Paper>
        <div className={classes.table}>
            {
              ((teacher && click) || (stT && enT &&(stT < enT) && click) || (cls && click)) ?
              (<TableData user={user}/>) : (<h1>Please Select Options</h1>)
            }
        </div>
        
      </Container>
    </div>
  )
}

export default Input;
