
Template.quiz2.onCreated(function() {
 Meteor.subscribe('bios');
});


 Template.quiz2.helpers({
   bios() {return Bios.find();}
 })

 Template.quiz2.events({
   'click button'(event,instance){
     name=instance.$('#name').val();
     gender = instance.$('#gender').val();
     bio = instance.$('#bio').val();
     agree = instance.$('#agree').is(":checked");
     owner = Meteor.userId();
     createdAt = new Date();
     doc = {name,gender,bio,owner,createdAt};
     if (agree) {
       Meteor.call('quiz2.insertBio',doc);
     } else {
       alert('you must check the box to insert your bio');
     }
   },


 })


 Template.biorow.events({
     'click span'(elt,instance) {
       Meteor.call('quiz2.bioremove',this.bio);
       /*
       if (Meteor.userId()==this.person.owner){
         People.remove(this.person._id);
       }
       */
     }
 })
