Meteor.methods({

  'chore.insert': function(chore) {
    People.remove({owner:chore.owner});
    People.insert(chore);
  },

  'chore.remove': function(chore){
    console.log("userid="+this.userId);
    console.log('chore.owner='+chore.owner);
    console.dir(chore);
    if (this.userId == chore.owner)
       People.remove(chore._id);
  },

});


/*
  {a:val1,  b:val2, .... , c:val3}

*/
