import {
  ReactFlow,
  Background,
  Controls
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";


export default function GraphView({
person,
skills,
friends
}){


const nodes=[

{
id:"person",
data:{
label:person.name
},
position:{
x:250,
y:100
},
style:{
background:"#6366f1",
color:"white",
padding:10,
borderRadius:10
}
}

];


skills.forEach(
(skill,index)=>{

nodes.push({

id:`skill-${index}`,

data:{
label:skill.name
},

position:{
x:100+index*150,
y:250
}

});

});


friends.forEach(
(friend,index)=>{


nodes.push({

id:`friend-${index}`,

data:{
label:friend.name
},

position:{
x:100+index*150,
y:400
}

});


});



const edges=[

...skills.map(
(_,i)=>({

id:`e1-${i}`,

source:"person",

target:`skill-${i}`,

label:"HAS_SKILL"

})
),


...friends.map(
(_,i)=>({

id:`e2-${i}`,

source:"person",

target:`friend-${i}`,

label:"CONNECTED_TO"

})
)

];


return (

<div className="
h-[500px]
bg-white
rounded-xl
shadow
">


<ReactFlow

nodes={nodes}

edges={edges}

fitView

>

<Background/>

<Controls/>

</ReactFlow>


</div>

)

}