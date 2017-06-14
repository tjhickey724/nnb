Template.showpeople.helpers({
  peoplelist() {return People.find()},
})

Template.addperson.events({
  'click button'(elt,instance) {
    const name = instance.$('#name').val();
    const year = instance.$('#birthyear').val();
    const birthyear = parseInt(year);
    console.log('adding '+name);
    instance.$('#name').val("");
    instance.$('#birthyear').val("");
    People.insert({name:name,birthyear:birthyear});
    //People.insert({name,birthyear})
  }
})

Template.personrow.events({
    'click span'(elt,instance) {
      console.dir(this);
      console.log(this);
      console.log(this.person._id);
      People.remove(this.person._id);
    }
})
