const db = require('../db/connectDB')

const addTaskToDatabase = async(task,careerId)=>{
    try{
        for(let i=0;i<task.length;i++){
            await db('career_tasks').insert({
                career_id: careerId,
                task: task[i]
              });
        }



    }catch(err){
        console.log(err);
        throw err
    }
}

const deleteTasksFromDatabase = async(careerId)=>{
    try{
        const result = await db('career_tasks').where({'career_id':careerId}).del();
        if(!result){
            throw new Error(`No tasks found for career_id ${careerId}`);
        }
    }catch(err){
        console.log(err)
    }
}


const addAdminCareerField=async(req,res)=>{
    try{
        const {CareerField} = req.body;
        const result =await db('career_fields').insert({
            field_name: CareerField
        })

        if(!result ||result.length === 0) {
            return res.status(404).json({ error: "No career fields found" });
        }
        console.log("Career Field Added:", result);
        res.status(200).json("New Career Field Received");
    }catch(error){
        console.error("Error fetching career fields:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const fetchAdminCareerField = async (req, res) => {
    try {
        const careerFields = await db('career_fields')
        .select('*');
        if(!careerFields || careerFields.length === 0) {
            return res.status(404).json({ error: "No career fields found" });
        }
        res.status(200).json(careerFields);
    } catch (error) {
        console.error("Error fetching career fields:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const fetchAdminCareersForField=async (req, res) => {
    try{
        const {SelectedField} = req.body;
        console.log("SelectedField:",SelectedField);
        const result = await db('career_table')
        .select('*')
        .where({'field_id':Number(SelectedField)});

        if(!result || result.length === 0) {
            return res.status(404).json({ error: "No career fields found" });
        }

        res.status(200).json(result);
    }catch (error) {
        console.error("Error fetching career fields:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteAdminCareerField = async (req, res) => {
    try{
        const {CareerField} = req.body;
        console.log("CareerField to delete:", CareerField);
        const result = await db('career_fields')
        .where({'id':CareerField})
        .del();

        if (result === 0) {
            return res.status(404).json({ error: "No career fields found" });
        }

        res.status(200).json("Career Field Deleted Successfully");
    }catch (error) {
        console.error("Error fetching career fields:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const IdentifyIntelligence = (value) => {
        switch (value) {
            case 'Logical-Mathematical': return 1;
            case 'Linguistic': return 2;
            case 'Spatial': return 3;
            case 'Musical': return 4;
            case 'Bodily-Kinesthetic': return 5;
            case 'Interpersonal': return 6;
            case 'Intrapersonal': return 7;
            case 'Naturalistic': return 8;
            case 'Existential': return 9;
            default: return 'Unknown';
        }
};                       



const addAdminCareer = async (req, res) => {
    try{
        console.log(req.body);
        const result = await db('career_table').insert({
            career_id: req.body.NewCareerId,
            career:req.body.NewCareer,
            field_id:req.body.SelectedField,
            linguistic:req.body.LinguisticScore,
            logical:req.body.LogicalScore,
            spatial:req.body.SpatialScore,
            non_iq_intelligence1:IdentifyIntelligence(req.body.SelectedNonIq01),
            non_iq_intelligence2:IdentifyIntelligence(req.body.SelectedNonIq02),
            non_iq_intelligence3:IdentifyIntelligence(req.body.SelectedNonIq03),
            non_iq_intelligence4:IdentifyIntelligence(req.body.SelectedNonIq04),
            specialization_1:req.body.CourseSpecialization01,
            specialization_2:req.body.CourseSpecialization02,
            specialization_3:req.body.CourseSpecialization03,
            specialization_4:req.body.CourseSpecialization04,
        })

        if (Array.isArray(req.body.task) && req.body.task.length > 0) {
            const formattedTasks = req.body.task.map(t => ({
                career_id: req.body.NewCareerId,
                task: t
            }));

            await db('career_tasks').insert(formattedTasks);
        }

        if(!result || result.length === 0) {
            return res.status(404).json({ error: "No career added" });
        }

        res.status(200).json({msg: "Career Added Succesfully" });

    }catch(error){
        console.error("Error adding career:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const updateAdminTaskofCareers = async (tasks) => {
    if (!Array.isArray(tasks) || tasks.length === 0) {
        throw new Error("No tasks provided.");
    }

    const careerId = tasks[0].career_id;

    try {
        // 1. Get current tasks from the database
        const existingTasks = await db('career_tasks')
            .where({ career_id: careerId })
            .select('task_id');

        const existingTaskIds = existingTasks.map(t => t.task_id);

        // 2. Get incoming task IDs (those that are not null or undefined)
        const incomingTaskIds = tasks
            .filter(t => t.task_id !== null && t.task_id !== undefined)
            .map(t => t.task_id);

        // 3. Delete removed tasks
        const taskIdsToDelete = existingTaskIds.filter(id => !incomingTaskIds.includes(id));
        if (taskIdsToDelete.length > 0) {
            await db('career_tasks')
                .whereIn('task_id', taskIdsToDelete)
                .del();
        }

        // 4. Upsert tasks
        for (const task of tasks) {
            if (task.task_id) {
                // UPDATE existing task
                await db('career_tasks')
                    .where({ task_id: task.task_id })
                    .update({ task: task.task });
            } else {
                // INSERT new task
                await db('career_tasks').insert({
                    career_id: task.career_id,
                    task: task.task
                });
            }
        }

        return { success: true, message: "Career tasks updated successfully" };

    } catch (err) {
        console.error("Error updating career tasks:", err);
        return { success: false, error: "Failed to update tasks", details: err };
    }
};


const deleteAllAdminCareerTasks = async (id) => {
    try {
        const result = await db('career_tasks')
            .where('career_id', id)
            .del();

        if (result === 0) {
            return { success: false, error: "No tasks found to delete" };
        }

        return { success: true, message: "Career tasks deleted successfully" };

    } catch (err) {
        console.error("Error deleting career tasks:", err);
        return { success: false, error: "Failed to delete tasks", details: err };
    }
};


const UpdateAdminCareer = async (req, res) => {
    try {
        console.log('received', req.body);

        const {
            CareerId,
            OldCareerId,
            CareerName,
            SelectedField,
            CareerLinguistic,
            CareerLogical,
            CareerSpatial,
            Non_Iq_Intelligence1,
            Non_Iq_Intelligence2,
            Non_Iq_Intelligence3,
            Non_Iq_Intelligence4,
            CourseSpecialization01Id,
            CourseSpecialization02Id,
            CourseSpecialization03Id,
            CourseSpecialization04Id,
            task
        } = req.body;

        // If CareerId changed (PK changed), delete old record and insert new
        if (CareerId !== OldCareerId) {
            // 1. Delete tasks linked to old career ID
            await db('career_tasks').where({ career_id: OldCareerId }).update({career_id:CareerId});

            // 2. Delete old career record
            await db('career_table').where({ career_id: OldCareerId }).del();

            // 3. Insert new career
            await db('career_table').insert({
                career_id: CareerId,
                career: CareerName,
                field_id: SelectedField,
                linguistic: CareerLinguistic,
                logical: CareerLogical,
                spatial: CareerSpatial,
                non_iq_intelligence1: IdentifyIntelligence(Non_Iq_Intelligence1),
                non_iq_intelligence2: IdentifyIntelligence(Non_Iq_Intelligence2),
                non_iq_intelligence3: IdentifyIntelligence(Non_Iq_Intelligence3),
                non_iq_intelligence4: IdentifyIntelligence(Non_Iq_Intelligence4),
                specialization_1: CourseSpecialization01Id,
                specialization_2: CourseSpecialization02Id,
                specialization_3: CourseSpecialization03Id,
                specialization_4: CourseSpecialization04Id
            });

        } else {
            // If ID didn't change, update normally
            const result = await db('career_table')
                .where({ career_id: CareerId })
                .update({
                    career: CareerName,
                    field_id: SelectedField,
                    linguistic: CareerLinguistic,
                    logical: CareerLogical,
                    spatial: CareerSpatial,
                    non_iq_intelligence1: IdentifyIntelligence(Non_Iq_Intelligence1),
                    non_iq_intelligence2: IdentifyIntelligence(Non_Iq_Intelligence2),
                    non_iq_intelligence3: IdentifyIntelligence(Non_Iq_Intelligence3),
                    non_iq_intelligence4: IdentifyIntelligence(Non_Iq_Intelligence4),
                    specialization_1: CourseSpecialization01Id,
                    specialization_2: CourseSpecialization02Id,
                    specialization_3: CourseSpecialization03Id,
                    specialization_4: CourseSpecialization04Id
                });

            if (!result || result === 0) {
                return res.status(404).json({ error: "No career found to update" });
            }
        }

        // Update or replace tasks (upsert logic)
        if (Array.isArray(task) && task.length > 0) {
            const taskResult = await updateAdminTaskofCareers(
                task.map(t => ({
                    ...t,
                    career_id: CareerId
                }))
            );

            if (taskResult.success !== true) {
                return res.status(500).json({ error: "Error updating tasks", details: taskResult.error });
            }
        }

        res.status(200).json({ msg: "Career updated successfully" });

    } catch (error) {
        console.error("Error updating career:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const fetchAdminCareerDetails=async(req,res)=>{
    try{
        const {SelectedCareerId} =req.body
        console.log("Fetching career details for CareerId:",SelectedCareerId);
        const result = await db('career_table')
        .select('*')
        .where({'career_id':SelectedCareerId});

        if(!result || result.length === 0) {
            return res.status(404).json({ error: "No career details found" });
        }

        const specialization_names = await db('specializations')
            .select('id','name')
            .where(function () {
                this.where('id', result[0].specialization_1)
                    .orWhere('id', result[0].specialization_2)
                    .orWhere('id', result[0].specialization_3)
                    .orWhere('id', result[0].specialization_4);
            });

        if(!specialization_names || specialization_names.length === 0) {
            throw new Error('No specializations found for the course');
        }

        res.status(200).json({result:result[0],specializations:specialization_names});

    }catch(error){
        console.error("Error fetching career details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const deleteAdminCareer=async(req,res)=>{
    try{
        const {CareerId} = req.body
        console.log(req.body)

        const result = await db('career_table')
                        .where('career_id',CareerId)
                        .del()
        
        if (result === 0) {
            return res.status(404).json({ error: "No career fields found" });
        }

        const taskdelete = await deleteAllAdminCareerTasks(CareerId)

        if(taskdelete.success !== true){
             return res.status(404).json({ error: "Error when Updating tasks" });
        }

        res.status(200).json("Career Field Deleted Successfully");                

    }catch(err){
        console.error("Error Deleting career details:", err);
        res.status(500).json({ error: "Internal server error" });    }
}


module.exports={addTaskToDatabase,
                deleteTasksFromDatabase,
                addAdminCareerField,
                fetchAdminCareerField,
                fetchAdminCareersForField,
                deleteAdminCareerField,
                addAdminCareer,
                UpdateAdminCareer,
                fetchAdminCareerDetails,
                 deleteAdminCareer
}