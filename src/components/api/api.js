import axios from 'axios';

const url = 'http://13.235.115.31:3000/admin/dashboard/classes/getFaculties';

const uri = 'http://13.235.115.31:3000/admin/dashboard/classes/filterClasses';

export const fetchFaculties= async() => {
  return await axios.get(url);
}

export const fetchTable= async(user) => {
  return await axios.post(uri,user);
}