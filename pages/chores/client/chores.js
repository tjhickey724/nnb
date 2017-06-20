Template.addperson.helpers({
  chorelist() {
       console.log("in chorelist");
       return ['wash dishes','walk dogs','drive to school',
        'take out garbage','pay bills','clean bathroom']},
})

Template.showpeople.helpers({
  peoplelist() {return People.find()},
})

Template.addperson.events({
  'click button'(elt,instance) {
    const name = instance.$('#name').val();
    const year = instance.$('#birthyear').val();
    const birthyear = parseInt(year);
    //console.log('adding '+name);
    // here we read all the checked chores from the inputs
    choreinputs = instance.$("#chorelist input");
    chores = [];
    choreinputs.each(function(a,b){
      if (b.checked) { chores.push(b.value);}
    });

    //console.log(chores);
    instance.$('#name').val("");
    instance.$('#birthyear').val("");

    // here we remove all other entries for that person
    persons = People.find({owner:Meteor.userId()}).fetch();
    //console.dir(persons);
    persons.forEach(function(person){
        People.remove(person._id);
    })

    People.insert({name:name,birthyear:birthyear,chores:chores,owner:Meteor.userId()});
    //People.insert({name,birthyear})
  }
})

Template.personrow.helpers({
  owner() {return (Meteor.userId()==this.person.owner)}
})
Template.personrow.events({
    'click span'(elt,instance) {
      console.dir(this);
      console.log(this);
      console.log(this.person._id);
      if (Meteor.userId()==this.person.owner){
        People.remove(this.person._id);
      }
    }
})
