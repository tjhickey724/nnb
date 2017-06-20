Template.addperson.helpers({
  chorelist: function() {
       console.log("in chorelist");
       return ['wash dishes','walk dogs','drive to school',
        'take out garbage','pay bills','clean bathroom']
      },

})

Template.showpeople.helpers({
  peoplelist: function() {return People.find()},

})

Template.addperson.events({
  'click button'(elt,instance) {
    const name = instance.$('#name').val();
    const year = instance.$('#birthyear').val();
    const birthyear = parseInt(year);
    // here we read all the checked chores from the inputs
    choreinputs = instance.$("#chorelist input");
    chores = [];
    choreinputs.each(function(a,b){
      if (b.checked) { chores.push(b.value);}
    });

    //console.log(chores);
    instance.$('#name').val("");
    instance.$('#birthyear').val("");

    var chore =
      { name:name,
        birthyear:birthyear,
        chores:chores,
        owner:Meteor.userId()
      };
    Meteor.call('chore.insert',chore,
      (err,res) => {
           console.log('got the answer');
           console.dir([err,res]);
          }
    );
    //People.insert(chore);
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
      Meteor.call('chore.remove',this.person);
      /*
      if (Meteor.userId()==this.person.owner){
        People.remove(this.person._id);
      }
      */
    }
})
