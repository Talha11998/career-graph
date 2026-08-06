# Career Graph – Skill-Based Career Recommendation System

A full-stack web application that recommends **jobs** and **learning courses** using a **Neo4j graph database**. The application visualizes professional relationships and skill connections, allowing users to explore career opportunities through graph-based queries.

---

# Use Case

Modern professional networks are highly connected.

A person possesses multiple skills, works at a company, knows other professionals, qualifies for multiple jobs, and can learn from many courses. Representing these relationships in a relational database requires several joins, making recommendation queries increasingly complex.

This application demonstrates how a **graph database** can naturally model these interconnected entities and efficiently answer recommendation queries.

Example use cases include:

* Career recommendation platforms
* Professional networking applications
* Learning management systems
* Employee skill analysis
* Internal company talent discovery

---

# Why a Graph Database?

Traditional relational databases store data in tables and require multiple JOIN operations to traverse relationships.

Neo4j stores data as **nodes** and **relationships**, making relationship-based queries much faster and easier to understand.

Advantages of using Neo4j include:

* Efficient relationship traversal
* Faster recommendation queries
* Natural representation of social networks
* Flexible schema for adding new entity types
* Simpler Cypher queries compared to complex SQL joins

Example:

Instead of joining several tables, Neo4j directly traverses:

```text
Person → Skill → Job
```

or

```text
Person → Skill → Course
```

using graph relationships.

---

# Data Model Diagram

```text
                        +-------------+
                        |   Company   |
                        +-------------+
                              ^
                              |
                         WORKS_AT
                              |
+-----------+   HAS_SKILL   +-----------+   CONNECTED_TO   +-----------+
|  Person   |-------------->|   Skill   |<---------------->|  Person   |
+-----------+               +-----------+                  +-----------+
                                 ^
                                 |
                      REQUIRED_FOR|TEACHES
                                 |
                     +------------+------------+
                     |                         |
               +-----------+             +-----------+
               |    Job    |             |  Course   |
               +-----------+             +-----------+
```

---

# Technology Stack

## Frontend

* React
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js

## Database

* Neo4j

---

# Project Architecture

```text
React Frontend
       │
       │ REST API
       ▼
Express Backend
       │
Neo4j JavaScript Driver
       │
       ▼
 Neo4j Graph Database
```

---

# Setting Up the Project

## 1. Clone Repository

```bash
git clone https://github.com/your-username/career-graph.git
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 3. Create a Neo4j (CognoDB) Instance

1. Sign in to your CognoDB account.
2. Create a new Neo4j database instance.
3. Copy the database connection details:

   * Bolt URI
   * Username
   * Password
4. Create a `.env` file inside the backend folder.

```env
NEO4J_URI=bolt://<your-instance>
NEO4J_USERNAME=<username>
NEO4J_PASSWORD=<password>
```

---

## 4. Seed the Database

```bash
npm run fullseed
```

This creates:

* Person nodes
* Skill nodes
* Company nodes
* Job nodes
* Course nodes
* Relationships among all entities

---

## 5. Start Backend

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

## 6. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Main Queries Explained

## 1. Get Person Profile

Returns the selected person's profile, skills, and professional connections.

```cypher
MATCH (p:Person {name:$name})
OPTIONAL MATCH (p)-[:HAS_SKILL]->(s:Skill)
OPTIONAL MATCH (p)-[:CONNECTED_TO]->(friend:Person)
RETURN p,
collect(DISTINCT s),
collect(DISTINCT friend)
```

---

## 2. Job Recommendation

Finds jobs whose required skills match the user's skills.

```cypher
MATCH
(p:Person {name:$name})-[:HAS_SKILL]->(skill)
<-[:REQUIRED_FOR]-(job:Job)

RETURN job,
count(skill) AS matchingSkills

ORDER BY matchingSkills DESC
```

The more matching skills a user has, the higher the job ranks.

---

## 3. Course Recommendation

Recommends courses that teach the user's skills.

```cypher
MATCH
(p:Person {name:$name})-[:HAS_SKILL]->(skill)
<-[:TEACHES]-(course:Course)

RETURN DISTINCT course
```

---

# REST API

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| GET    | `/api/person/name/:name`    | Get profile            |
| GET    | `/api/person/jobs/:name`    | Job recommendations    |
| GET    | `/api/person/courses/:name` | Course recommendations |

---

# User Interface

## Dashboard

*Insert screenshot here.*

```
## Dashboard

![Dashboard](screenshots/dashboard.png)
```


*Insert screenshot here.*

```
## Network Graph

![Network Graph](screenshots/network-graph.png)```

---


*Insert screenshot here.*

```
## Job Recommendations

![Jobs](screenshots/jobs.png)```

---

*Insert screenshot here.*

```
## Course Recommendations

![Courses](screenshots/courses.png)```

---

# Future Improvements

* Authentication and authorization
* Resume upload and parsing
* AI-powered career recommendations
* Skill gap analysis
* Graph filtering and search
* Deployment with Docker
* CI/CD integration

---

# Author

**Talha Khaja**

MERN Stack Developer

**Technologies:** React, Node.js, Express.js, Neo4j, JavaScript, REST APIs
