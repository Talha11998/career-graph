export const getPersonProfile = `

MATCH (p:Person {name:$name})

OPTIONAL MATCH 
(p)-[:HAS_SKILL]->(s:Skill)


OPTIONAL MATCH
(p)-[:CONNECTED_TO]->(friend:Person)


RETURN

p,

collect(DISTINCT s) AS skills,

collect(DISTINCT friend) AS friends

`;


export const recommendJobs = `

MATCH

(p:Person {name:$name})
-[:HAS_SKILL]->(skill)

<-[:REQUIRED_FOR]-
(job:Job)


RETURN 
job,
count(skill) AS matchingSkills

ORDER BY matchingSkills DESC

LIMIT 5

`;


export const recommendCourses = `

MATCH

(p:Person {name:$name})
-[:HAS_SKILL]->(skill)

<-[:TEACHES]-
(course:Course)


RETURN DISTINCT course

LIMIT 5

`;