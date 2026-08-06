import axios from "axios";


const api =
axios.create({

baseURL:
"https://career-graph.onrender.com/api"

});


export default api;