import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


Template.addperson.onCreated(function addpersonOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.showBorder= new ReactiveVar(false);
});

Template.addperson.helpers({
  chorelist: function() {
       console.log("in chorelist");
       return ['wash dishes','walk dogs','drive to school',
        'take out garbage','pay bills','clean bathroom']
      },

  counter() {
       return Template.instance().counter.get();
       },

  borderCSS() {
       if (Template.instance().showBorder.get())
         return "showBorder";
       else {
         return "";
       }
  }
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

    //We can clear the text fields by uncommenting these lines
    //instance.$('#name').val("");
    //instance.$('#birthyear').val("");

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

      instance.counter.set(instance.counter.get() + 1);
  },


  'change #jsShowBorder'(event, instance) {
    console.dir(this);
    console.dir(event);
    console.dir(instance);
    console.dir(event.currentTarget.checked);
    instance.showBorder.set(event.currentTarget.checked);
    console.log(instance.showBorder.get());
  }

})


Template.showpeople.helpers({
  peoplelist() {return People.find()},
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
