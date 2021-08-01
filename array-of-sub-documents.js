const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function addAuthorToCourse(courseId) {
    const course = await Course.findById(courseId);
    course.authors.push(new Author({
        name: 'Smith'
    }));
    course.save();
}

async function removeAuthor(courseId, authorId) {

    const course = await Course.findById(courseId);
    let author = course.authors.id(authorId)
    author.remove();
    course.save();
}
//removeAuthor("610648d2f6be3731143082fe", '610648d2f6be3731143082fd')

/* createCourse('Node Course', [
    new Author({ name: 'Mosh' }),
    new Author({ name: 'John' }),
    new Author({ name: 'Amy' })
]); */
//addAuthorToCourse('610648d2f6be3731143082fe');