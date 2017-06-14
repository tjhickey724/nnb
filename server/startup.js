import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  People.remove({});  // clear the database
  People.insert({name:'Tim',chores:['dishes','dogs','drive'],
  birthyear:1955,color:'red'});
  People.insert({name:'Caitlin',birthyear:1995,
      chores:['garbage','bills'], color:'blue'});
});
