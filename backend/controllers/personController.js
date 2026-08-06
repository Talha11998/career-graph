import driver from "../config/database.js";

import {
    getPersonProfile,
    recommendJobs,
    recommendCourses
} from "../queries/personQueries.js";


export async function profile(req,res){

    const session = driver.session();

    try{

        const result = await session.run(
            getPersonProfile,
            {
                name:req.params.name
            }
        );


        if(result.records.length === 0){

            return res.status(404).json({
                message:"Person not found"
            });

        }


        const record = result.records[0];


        const person =
            record.get("p").properties;


        const skills =
            record.get("skills")
            .filter(skill => skill !== null)
            .map(skill => skill.properties);


        const friends =
            record.get("friends")
            .filter(friend => friend !== null)
            .map(friend => friend.properties);



        res.json({

            person,

            skills,

            friends

        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({

            error:"Database error"

        });

    }
    finally{

        await session.close();

    }

}


export async function jobs(req,res){

    const session=driver.session();

    try{

        const result =
        await session.run(
            recommendJobs,
            {
                name:req.params.name
            }
        );


        res.json(
            result.records.map(r=>({

                job:
                r.get("job").properties,

                score:
                r.get("matchingSkills").toNumber()

            }))
        );


    }
    catch(err){

        res.status(500)
        .json({
            error:"Could not fetch jobs"
        });

    }
    finally{

        await session.close();

    }

}



export async function courses(req,res){

    const session=driver.session();

    try{

        const result=
        await session.run(
            recommendCourses,
            {
                name:req.params.name
            }
        );


        res.json(
            result.records.map(
                r=>r.get("course").properties
            )
        );

    }
    finally{

        await session.close();

    }

}