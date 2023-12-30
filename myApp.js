const mongoose = require("mongoose");
require("dotenv").config();

// 1) Install and Set Up Mongoose
/** CONNECT TO THE MONGODB ATLAS DATABASE USING THE PROVIDED URI **/
/* MONGO_URI=mongodb+srv://Username:Password@ServerOrCluster/DesiredDatabaseName?AdditionalConnectionOptions */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 2) Create a "Person" Model
/** ASSIGN MONGOOSE SCHEMA TO A VARIABLE **/
const Schema = mongoose.Schema;

/** CREATE PERSON SCHEMA **/
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: { type: [String], required: true },
});

/** CREATE PERSON MODEL FROM THE SCHEMA **/
const Person = mongoose.model("Person", personSchema);

// 3) Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Kelly Cristina Moreira",
    age: 19,
    favoriteFoods: ["Strogonoff", "Rice and Beans"],
  });

  person.save((err, data) => (err ? done(null) : done(null, data)));
};

// 4) Create Many Records People with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) =>
    err ? done(err) : done(null, data),
  );
};

// 5) Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) =>
    err ? done(err) : done(null, data),
  );
};

// 6) Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) =>
    err ? done(err) : done(null, data),
  );
};

// 7) Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) =>
    err ? done(err) : done(null, data),
  );
};

// 8) Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    data.save((err, savedData) => done(err, savedData));
  });
};

// 9) Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    (err, data) => (err ? done(err) : done(null, data)),
  );
};

// 10) Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, data) =>
    err ? done(err) : done(null, data),
  );
};

// 11) Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) =>
    err ? done(err) : done(null, data),
  );
};

// 12) Delete Many Documents with model.remove()
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => done(err, data));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
