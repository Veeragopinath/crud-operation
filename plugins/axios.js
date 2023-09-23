export default function ({ $axios }) {
 
  const url = 'http://localhost:3001';


  $axios.defaults.baseURL = url;
}