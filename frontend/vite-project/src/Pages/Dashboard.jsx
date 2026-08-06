import {
useState
}
from "react";


import api from "../api/api";

import JobCard from "../components/JobCard";

import CourseCard from "../components/CourseCard";

import Loader
from "../components/Loader";


import ErrorBox
from "../components/ErrorBox";


import SkillCard
from "../components/SkillCard";


import GraphView
from "../components/GraphView";



export default function Dashboard(){


const [name,setName]=useState("Alice");

const [data,setData]=useState(null);

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");

const [jobs, setJobs] = useState([]);

const [courses, setCourses] = useState([]);

async function search() {
  try {
    setLoading(true);
    setError("");

    const [profileRes, jobsRes, coursesRes] = await Promise.all([
      api.get(`/person/name/${name}`),
      api.get(`/person/jobs/${name}`),
      api.get(`/person/courses/${name}`)
    ]);

    setData(profileRes.data);
    setJobs(jobsRes.data);
    setCourses(coursesRes.data);

  } catch (err) {
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);

  setError(err.response?.data?.error || err.response?.data?.message || err.message);
}  
  finally {
    setLoading(false);
  }
}


return (

<div className="
p-8
space-y-6
">


<div className="
bg-white
p-6
rounded-xl
shadow
">


<h2 className="
text-xl
font-semibold
mb-4
">

Explore Career Network

</h2>



<div className="
flex gap-3
">


<input

className="
border
rounded-lg
px-4
py-2
flex-1
"

value={name}

onChange={
e=>setName(e.target.value)
}

/>


<button

onClick={search}

className="
bg-indigo-600
text-white
px-6
rounded-lg
"

>

Search

</button>


</div>

</div>



{
loading &&
<Loader/>
}


{
error &&
<ErrorBox message={error}/>
}



{
data &&

<>


<div className="
grid md:grid-cols-3
gap-5
">


<div className="
bg-white
p-5
rounded-xl
shadow
">

<h3 className="font-bold">

{data.person.name}

</h3>

<p>

{data.person.email}

</p>

</div>



<div className="
bg-white
p-5
rounded-xl
shadow
">

<h3 className="font-bold mb-3">

Skills

</h3>


<div className="
flex flex-wrap gap-2
">

{

data.skills.map(
(skill)=>

<SkillCard

key={skill.name}

skill={skill}

/>

)

}

</div>


</div>



<div className="
bg-white
p-5
rounded-xl
shadow
">


<h3 className="font-bold">

Connections

</h3>


{

data.friends.length===0 ?

<p className="text-gray-400">

No connections found

</p>

:

data.friends.map(
friend=>(

<p key={friend.name}>

👤 {friend.name}

</p>

)

)

}


</div>


</div>




<h2 className="
text-xl
font-bold
">

Network Graph

</h2>


<GraphView

person={data.person}

skills={data.skills}

friends={data.friends}

/>


</>

}

<h2 className="text-xl font-bold mt-8 mb-4">
  Recommended Jobs
</h2>

{
jobs.length === 0 ?

<p className="text-gray-400">
No jobs found
</p>

:

<div className="grid md:grid-cols-2 gap-4">

{
jobs.map((job, index) => (

<JobCard
key={index}
job={job}
/>

))
}

</div>

}

<h2 className="text-xl font-bold mt-8 mb-4">
Recommended Courses
</h2>

{
courses.length === 0 ?

<p className="text-gray-400">
No courses found
</p>

:

<div className="grid md:grid-cols-2 gap-4">

{
courses.map((course, index) => (

<CourseCard
key={index}
course={course}
/>

))
}

</div>

}
</div>

)

}