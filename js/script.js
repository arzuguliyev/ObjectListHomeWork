
// form inputs
let username = document.forms['objectForm']['userName'],
 userSurname = document.forms['objectForm']['userSurname'],
 userBirthday = document.forms['objectForm']['userBirthday'],
 userEmail =  document.forms['objectForm']['userEmail'],
 deleteIdValue =  document.getElementById('deleteId');

 console.log()
// object array
let personArray = [];
let personId =0;

// validation inputs 
const letters = /^['a-z']*$/i,
      onlyNumber = /^[0-9]*$/,
      dateFormat = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/,
      emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// validation alert      
const alertForm =  document.getElementById('alertForm');

// Personlist container
let personListContainer = document.getElementById('personListContainer');

// Validation function for input value
function checkInput()
{
  // check empty value
 if(username.value == '' || userSurname.value == '' || userBirthday.value == '' || userEmail.value == '')
 {
   alertForm.innerHTML = 'INPUTS CANNOT BE EMPTY';
   alertForm.classList.remove('d-none');
  
   cleanInput(username);
   cleanInput(userSurname);
   cleanInput(userBirthday);
   cleanInput(userEmail);
   return false;
 }
//  check only letter
 else if(!username.value.match(letters) || !userSurname.value.match(letters))
 {
  alertForm.innerHTML = 'USERNAME AND USERSURNAME SHOULD BE ONLY TEXT';
  alertForm.classList.remove('d-none');
 
  cleanInput(username);
  cleanInput(userSurname);
  cleanInput(userBirthday);
  cleanInput(userEmail);
  return false; 
 }

//  check iso date format
 else if(!userBirthday.value.match(dateFormat))
 {
  alertForm.innerHTML = 'DATE SHOULD BE LIKE THIS: 18-03-1998';
  alertForm.classList.remove('d-none');
 
  cleanInput(username);
  cleanInput(userSurname);
  cleanInput(userBirthday);
  cleanInput(userEmail);
 }
//  check email format
 else if(!userEmail.value.match(emailFormat))
 {
  alertForm.innerHTML = 'EMAIL SHOULD BE LIKE THIS: example@example.com';
  alertForm.classList.remove('d-none');
 
  cleanInput(username);
  cleanInput(userSurname);
  cleanInput(userBirthday);
  cleanInput(userEmail);
 }
 else
 {
  
  // create object
 function Person(id, name, surname, birthday,  email)
 {
   this.id = id;
   this.name = name;
   this.surname = surname;
   this.birthday = birthday;
   this.age = function()
   {
    let birtdayYear =  Number(this.birthday.substr(this.birthday.length - 4));
    let ourDate = new Date();
    let nowYear = ourDate.getFullYear();
    return  Number(nowYear) - birtdayYear;
   }
   this.email = email;
 }

//  increases id value once per object
     personId +=1;
 

 
// create new object and set value
let newPerson = new Person(personId, username.value, userSurname.value, userBirthday.value,  userEmail.value);
// add to array
   personArray.push(newPerson);
   
  //  new list replaced old
  // create ul and set class name
   let newList = document.createElement('UL');
       newList.classList.add('list-group');
       newList.classList.add('mt-3');
      
    personArray.forEach(element =>
      {
        if(personArray.length > 1)
        {
        //  delete old ul
         personListContainer.removeChild(personListContainer.childNodes[0]);
        }
        // create new li and set class name
        let node = document.createElement('LI');
            node.classList.add('list-group-item')
        let textNode = document.createTextNode(element.id + '. ' + element.name + ' ' + element.surname + ' ' + element.age() + ' ' + element.email);
        node.appendChild(textNode);
        // add to ul
        newList.appendChild(node);
        // add to list container
        personListContainer.appendChild(newList);
      });

//  refresh input value     
 cleanInput(username);
 cleanInput(userSurname);
 cleanInput(userBirthday);
 cleanInput(userEmail);
//  hide alert if you had errors
 alertForm.classList.add('d-none');
  return false;
 }

 return false;
}



function deleteId()
{
  let idValue = deleteIdValue.value;
  if(!idValue.match(onlyNumber))
  {
    alertForm.innerHTML = 'You have to use only number for id';
    alertForm.classList.remove('d-none');  
  }
  else if(idValue < 0)
  {
    alertForm.innerHTML = 'ID should be biggest from zero';
    alertForm.classList.remove('d-none'); 
  }
  else if(personArray.length == 0)
  {
    alertForm.innerHTML = 'List is empty! add object and try again';
    alertForm.classList.remove('d-none');
  }

    //Muellim bunu serhe ona gore aliram ki butun elementleri silib yeniden element elave edib yene silmek isteyende
     //value arrayin uzunlugundan boyuk oldugu ucun bu allerti gosterir amma bunsuz problemsiz isleyir ozunuz baxib
     //zehmet olmasa deyersiz mene
  // else if(idValue > personArray.length)
  // {
  //   alertForm.innerHTML = 'BIG VALUE! Max value is ' + personArray.length;
  //   alertForm.classList.remove('d-none'); 
  // }
  else
  {
    personArray.forEach(element =>
      {
        if(idValue == element.id)
        {
    
          let index = personArray.indexOf(element);
          console.log(index);
          // delete object from array
          personArray.splice(index, 1);
          // delete old ul
          personListContainer.innerHTML = '';
           // create ul and set class name
          let newList =  document.createElement('UL');
              newList.classList.add('list-group');
              newList.classList.add('mt-3');
  
              personArray.forEach(item => 
                {
                  let node =  document.createElement('LI');
                      node.classList.add('list-group-item');
                  let textNode = document.createTextNode(item.id + '. ' + item.name + ' ' + item.surname + ' ' + item.age() + ' ' + item.email)
                      node.appendChild(textNode);
                      newList.appendChild(node);
                      personListContainer.appendChild(newList);
                })
        }
        cleanInput(deleteIdValue);
        //  hide alert if you had errors
        alertForm.classList.add('d-none');
    
      });
  }
 
  
}


function sortForId()
{

  personArray.sort(function(a, b){ return a.id - b.id});
  
  let newList = document.createElement('UL');
       newList.classList.add('list-group');
       newList.classList.add('mt-3');
      
    personArray.forEach(element =>
      {
        if(personArray.length > 1)
        {
          personListContainer.removeChild(personListContainer.childNodes[0]);
        }
        let node = document.createElement('LI');
            node.classList.add('list-group-item')
        let textNode = document.createTextNode(element.id + '. ' + element.name + ' ' + element.surname + ' ' + element.age() + ' ' + element.email);
        node.appendChild(textNode);
        newList.appendChild(node);
        personListContainer.appendChild(newList);
      });
      //  hide alert if you had errors
      alertForm.classList.add('d-none');
}
function sortForName()
{
 if(personArray.length > 1)
 {
  personArray.sort(function(a,b)
  {
    let firstElement = a.name.toLowerCase();
    let secondElement = b.name.toLowerCase();
    if(firstElement < secondElement)
    {
      return -1;
    }
    if(firstElement > secondElement)
    {
      return 1;
    }

    return 0;
  })
let newList = document.createElement('UL');
    newList.classList.add('list-group');
    newList.classList.add('mt-3');
   
 personArray.forEach(element =>
   {
     if(personArray.length > 1)
     {
       personListContainer.removeChild(personListContainer.childNodes[0]);
     }
     let node = document.createElement('LI');
         node.classList.add('list-group-item')
     let textNode = document.createTextNode(element.id + '. ' + element.name + ' ' + element.surname + ' ' + element.age() + ' ' + element.email);
     node.appendChild(textNode);
     newList.appendChild(node);
     personListContainer.appendChild(newList);
   });
 }
}


function sortForSurname()
{
  if(personArray.length > 1)
  {
   personArray.sort(function(a,b)
   {
     let firstElement = a.surname.toLowerCase();
     let secondElement = b.surname.toLowerCase();
     if(firstElement < secondElement)
     {
       return -1;
     }
     if(firstElement > secondElement)
     {
       return 1;
     }
 
     return 0;
   })
 let newList = document.createElement('UL');
     newList.classList.add('list-group');
     newList.classList.add('mt-3');
    
  personArray.forEach(element =>
    {
      if(personArray.length > 1)
      {
        personListContainer.removeChild(personListContainer.childNodes[0]);
      }
      let node = document.createElement('LI');
          node.classList.add('list-group-item')
      let textNode = document.createTextNode(element.id + '. ' + element.name + ' ' + element.surname + ' ' + element.age() + ' ' + element.email);
      node.appendChild(textNode);
      newList.appendChild(node);
      personListContainer.appendChild(newList);
    });
  }
   //  hide alert if you had errors
   alertForm.classList.add('d-none');
}







function cleanInput(item){item.value = ''};








