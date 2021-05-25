import axios from 'axios';

const url = 'https://studypodapi.askiitians.com/admin/dashboard/classes/getFaculties';

const uri = 'https://studypodapi.askiitians.com/admin/dashboard/classes/filterClasses';

export const fetchFaculties= async() => {
  return await axios.get(url);
}

export const fetchTable= async(user) => {
  return await axios.post(uri,user);
}