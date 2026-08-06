import driver from "../config/database.js";

async function seed() {
  const session = driver.session({
    database: "neo4j"
  });

  try {

    console.log("Clearing database...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);


    console.log("Creating skills...");

    await session.run(`
      CREATE (:Skill {name:"React", category:"Frontend"}),
             (:Skill {name:"Node.js", category:"Backend"}),
             (:Skill {name:"Express.js", category:"Backend"}),
             (:Skill {name:"MongoDB", category:"Database"}),
             (:Skill {name:"Graph Databases", category:"Database"}),
             (:Skill {name:"Python", category:"Programming"}),
             (:Skill {name:"Machine Learning", category:"AI"}),
             (:Skill {name:"AWS", category:"Cloud"}),
             (:Skill {name:"Docker", category:"DevOps"}),
             (:Skill {name:"Java", category:"Programming"})
    `);


    console.log("Creating companies...");

    await session.run(`
      CREATE (:Company {name:"Google"}),
             (:Company {name:"Microsoft"}),
             (:Company {name:"Amazon"}),
             (:Company {name:"OpenAI"}),
             (:Company {name:"Netflix"})
    `);


    console.log("Creating people...");

    await session.run(`
      CREATE (:Person {name:"Alice", email:"alice@gmail.com", experience:3}),
             (:Person {name:"Bob", email:"bob@gmail.com", experience:5}),
             (:Person {name:"Charlie", email:"charlie@gmail.com", experience:7}),
             (:Person {name:"David", email:"david@gmail.com", experience:4}),
             (:Person {name:"Emma", email:"emma@gmail.com", experience:6})
    `);



    console.log("Creating skill relationships...");

await session.run(`
  MATCH (alice:Person {name:"Alice"})
  MATCH (react:Skill {name:"React"})
  MATCH (node:Skill {name:"Node.js"})
  MATCH (docker:Skill {name:"Docker"})

  MERGE (alice)-[:HAS_SKILL]->(react)
  MERGE (alice)-[:HAS_SKILL]->(node)
  MERGE (alice)-[:HAS_SKILL]->(docker)
`);


await session.run(`
  MATCH (bob:Person {name:"Bob"})
  MATCH (node:Skill {name:"Node.js"})
  MATCH (express:Skill {name:"Express.js"})
  MATCH (mongo:Skill {name:"MongoDB"})

  MERGE (bob)-[:HAS_SKILL]->(node)
  MERGE (bob)-[:HAS_SKILL]->(express)
  MERGE (bob)-[:HAS_SKILL]->(mongo)
`);


await session.run(`
  MATCH (charlie:Person {name:"Charlie"})
  MATCH (python:Skill {name:"Python"})
  MATCH (ml:Skill {name:"Machine Learning"})
  MATCH (graph:Skill {name:"Graph Databases"})

  MERGE (charlie)-[:HAS_SKILL]->(python)
  MERGE (charlie)-[:HAS_SKILL]->(ml)
  MERGE (charlie)-[:HAS_SKILL]->(graph)
`);


await session.run(`
  MATCH (david:Person {name:"David"})
  MATCH (aws:Skill {name:"AWS"})
  MATCH (docker:Skill {name:"Docker"})
  MATCH (java:Skill {name:"Java"})

  MERGE (david)-[:HAS_SKILL]->(aws)
  MERGE (david)-[:HAS_SKILL]->(docker)
  MERGE (david)-[:HAS_SKILL]->(java)
`);


await session.run(`
  MATCH (emma:Person {name:"Emma"})
  MATCH (react:Skill {name:"React"})
  MATCH (graph:Skill {name:"Graph Databases"})
  MATCH (python:Skill {name:"Python"})

  MERGE (emma)-[:HAS_SKILL]->(react)
  MERGE (emma)-[:HAS_SKILL]->(graph)
  MERGE (emma)-[:HAS_SKILL]->(python)
`);


    console.log("Creating connections...");

    await session.run(`
      MATCH
      (alice:Person {name:"Alice"}),
      (bob:Person {name:"Bob"}),
      (charlie:Person {name:"Charlie"}),
      (david:Person {name:"David"}),
      (emma:Person {name:"Emma"})

      MERGE (alice)-[:CONNECTED_TO]->(bob)
      MERGE (alice)-[:CONNECTED_TO]->(emma)

      MERGE (bob)-[:CONNECTED_TO]->(charlie)
      MERGE (bob)-[:CONNECTED_TO]->(david)

      MERGE (charlie)-[:CONNECTED_TO]->(emma)

      MERGE (emma)-[:CONNECTED_TO]->(david)

      MERGE (david)-[:CONNECTED_TO]->(alice)
    `);

    console.log("Creating company relationships...");

await session.run(`
  MATCH (alice:Person {name:"Alice"})
  MATCH (google:Company {name:"Google"})
  MERGE (alice)-[:WORKS_AT]->(google)
`);


await session.run(`
  MATCH (bob:Person {name:"Bob"})
  MATCH (microsoft:Company {name:"Microsoft"})
  MERGE (bob)-[:WORKS_AT]->(microsoft)
`);


await session.run(`
  MATCH (charlie:Person {name:"Charlie"})
  MATCH (amazon:Company {name:"Amazon"})
  MERGE (charlie)-[:WORKS_AT]->(amazon)
`);


await session.run(`
  MATCH (david:Person {name:"David"})
  MATCH (openai:Company {name:"OpenAI"})
  MERGE (david)-[:WORKS_AT]->(openai)
`);


await session.run(`
  MATCH (emma:Person {name:"Emma"})
  MATCH (netflix:Company {name:"Netflix"})
  MERGE (emma)-[:WORKS_AT]->(netflix)
`);

await session.run(`
CREATE
(:Job {title:"Frontend Developer", company:"Google"}),
(:Job {title:"Backend Developer", company:"Microsoft"}),
(:Job {title:"AI Engineer", company:"OpenAI"}),
(:Job {title:"Cloud Engineer", company:"Amazon"}),
(:Job {title:"Java Developer", company:"Netflix"})
`);

await session.run(`
CREATE
(:Course {name:"Advanced React", provider:"Coursera", level:"Intermediate"}),
(:Course {name:"Node.js Masterclass", provider:"Udemy", level:"Intermediate"}),
(:Course {name:"Machine Learning", provider:"Coursera", level:"Advanced"}),
(:Course {name:"AWS Cloud Practitioner", provider:"AWS", level:"Beginner"}),
(:Course {name:"Java Programming", provider:"Udemy", level:"Beginner"})
`);

await session.run(`
MATCH (react:Skill {name:"React"})
MATCH (node:Skill {name:"Node.js"})
MATCH (java:Skill {name:"Java"})
MATCH (aws:Skill {name:"AWS"})
MATCH (ml:Skill {name:"Machine Learning"})

MATCH (frontend:Job {title:"Frontend Developer"})
MATCH (backend:Job {title:"Backend Developer"})
MATCH (ai:Job {title:"AI Engineer"})
MATCH (cloud:Job {title:"Cloud Engineer"})
MATCH (javaJob:Job {title:"Java Developer"})

MERGE (frontend)-[:REQUIRED_FOR]->(react)
MERGE (backend)-[:REQUIRED_FOR]->(node)
MERGE (ai)-[:REQUIRED_FOR]->(ml)
MERGE (cloud)-[:REQUIRED_FOR]->(aws)
MERGE (javaJob)-[:REQUIRED_FOR]->(java)
`);

await session.run(`
MATCH (react:Skill {name:"React"})
MATCH (node:Skill {name:"Node.js"})
MATCH (aws:Skill {name:"AWS"})
MATCH (ml:Skill {name:"Machine Learning"})
MATCH (java:Skill {name:"Java"})

MATCH (r:Course {name:"Advanced React"})
MATCH (n:Course {name:"Node.js Masterclass"})
MATCH (m:Course {name:"Machine Learning"})
MATCH (a:Course {name:"AWS Cloud Practitioner"})
MATCH (j:Course {name:"Java Programming"})

MERGE (r)-[:TEACHES]->(react)
MERGE (n)-[:TEACHES]->(node)
MERGE (m)-[:TEACHES]->(ml)
MERGE (a)-[:TEACHES]->(aws)
MERGE (j)-[:TEACHES]->(java)
`);

    

    console.log("✅ Database seeded successfully");

  } catch (error) {

    console.error("Seed failed:", error);

  } finally {

    await session.close();
    await driver.close();

  }
}


seed();