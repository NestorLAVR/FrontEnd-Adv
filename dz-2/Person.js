var Person = function(firstAndLast) {
    // Only change code below this line
    var fullName = firstAndLast;
    // Complete the method below and implement the others similarly
    this.getFullName = function() {
      return fullName;
    };
    this.setFullName = function (full) {
      fullName = full;
    };
    this.getFirstName = function(){
      return fullName.split(' ')[0];
    };
    this.getLastName = function(){
      return fullName.split(' ')[1];
    };
    this.setLastName = function(lastName){
      fullName = fullName.split(' ')[0] + ' ' + lastName
    }
    this.setFirstName = function(firstName){
      fullName = firstName + ' ' + fullName.split(' ')[1]
    }
};

var bob = new Person('Bob Ross');
console.log(Object.keys(bob).length);
console.log(bob instanceof Person)
console.log(bob.firstName);
console.log(bob.lastName);
console.log(bob.getFullName());
bob.setFirstName("Haskell");
console.log(bob.getFullName());
bob.setLastName("Curry")
console.log(bob.getFullName());
bob.setFullName("Haskell Curry")
console.log(bob.getFullName());
console.log(bob.getFirstName());
console.log(bob.getLastName());
