const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
    }
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateCourse(courseId) {
    /* 
    Approach 1: Query method
    const course = await Course.findById(courseId);
    course.name = "Node.js course";
    course.author.name = "Mosh Hamadani"
    course.save(); 
    
    */

    //Approach 2
    const course = await Course.findByIdAndUpdate(courseId,
        {
            name: 'Updated Course Name',
            author: {
                name: "Updated Author Name"
            }
        }, { new: true });


    //Approach 3 (Depricated, use Approach 2): Extention to Approch 2 

    /*  const course = await Course.update(
         { _id: courseId },
         {
             $set: {
                 'author.name': 'Approch 3'
             }
         },
         { new: true }
     ); */

    console.log(course)
}

createCourse('Node Course', new Author({ name: 'Mosh' }));
//createCourse('Node Course', new Author({ name: 'Nuwa', bio: "Nuwan bio", website: "Nuwa Web" }));
//listCourses()

//updateCourse('61063d6bf5bd86830c81e7b2')