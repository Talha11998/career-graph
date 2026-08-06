import driver from "../config/database.js";


const session=driver.session();


const query=`

CREATE
(:Skill {name:"React"}),
(:Skill {name:"Node"}),
(:Skill {name:"Docker"}),

(:Person {
name:"Alice",
email:"alice@example.com"
}),

(:Person {
name:"Bob",
email:"bob@example.com"
}),

(:Job {
title:"Frontend Engineer"
}),

(:Job {
title:"Backend Engineer"
})

`;


await session.run(query);



await session.run(`

MATCH

(alice:Person{name:"Alice"}),
(react:Skill{name:"React"}),
(node:Skill{name:"Node"})

CREATE

(alice)-[:HAS_SKILL]->(react),
(alice)-[:HAS_SKILL]->(node)


`);



await session.run(`

MATCH

(skill:Skill{name:"Node"}),
(job:Job{title:"Backend Engineer"})

CREATE

(skill)-[:REQUIRED_FOR]->(job)

`);



console.log("Database seeded");


await session.close();

process.exit();