//Access the elements using a querySelector.
const showButton=document.querySelector(".showBtn");
const table=document.querySelector(".table");
var modBody=document.querySelector(".modal-body");
var modTitle=document.querySelector("#userModalLabel");
const modal=document.querySelector("#userModal");

//All the (console.log)s in this project are used to test the accuracy of the code
console.log(showButton);
console.log(modal);

//Add event listeners
//When the user clicks on the showButton-the main button on the page, call the getUsersInfo function.
showButton.addEventListener("click", getUsersInfo);

//Create the headers array for the table with infos that I chose independently.
const headers=['id', 'name','username', 'email', 'address', 'company', 'more infos'];

//Create an async promise-based function. Await is used to pause the code on that line
//until de promise fulffils then return the resulting value.
async function getUsersInfo(){
    const url="https://jsonplaceholder.typicode.com/users";
    var response=await fetch(url);
    var data=await response.json();
    console.log(data);
        
        //These were used to check the accuracy
        //console.log(data.length);
        //console.log(data[0].address);
        //console.log(data[0].name);
        //console.log(data[0].address.street);

    //Access the elements using a querySelector
    const tableHead=table.querySelector("thead");
    const tableBody=table.querySelector("tbody");

    //Clear the table
    tableHead.innerHTML="<tr></tr>";
    tableBody.innerHTML=" ";

    //Populate the headers. 
    //For every header specified in the headers array, create a th,
    //set text content and finally append it to the row.
    for(const headerText of headers){
        const headerElement=document.createElement('th');
        headerElement.textContent=headerText;
        tableHead.querySelector('tr').appendChild(headerElement);
    }

    //Populate the rows
    //For every user (data.length is the maximum number of users) create a table row.
    for(i=0; i<data.length; i++){
        const rowElement=document.createElement('tr');
        //I added 1 to the existing rowElement id because I needed the user to match the id of the row
        //that it was on. Result: User 1 is on the row 1.
        rowElement.id=i+1;
        
    for(j=0; j<headers.length;j++){
        //For every header (headers.length is the maximum number of columns/headers) create a table data.
            const cellElement=document.createElement('td');

        //I used switch statement to perform diffrent actions based on different conditions.
        switch (j){

            //Case 0 means that the code applies only for the first column.
            case 0:
                //Populate the cells with ids and append them to rows.
                cellElement.innerText=data[i].id;
                rowElement.appendChild(cellElement);
                break;
                
            case 1:
                cellElement.innerText=data[i].name;
                rowElement.appendChild(cellElement);
                break;

            case 2:
                cellElement.innerText=data[i].username;
                rowElement.appendChild(cellElement);
                break;

            case 3:
                cellElement.innerText=data[i].email;
                rowElement.appendChild(cellElement);
                break;

            case 4:
                cellElement.innerText=data[i].address.city;
                rowElement.appendChild(cellElement);
                break;

            case 5:
                cellElement.innerText=data[i].company.name;
                rowElement.appendChild(cellElement);
                break;

            case 6:
                //Case 6 means that the code applies only for the last column("More info").
                //Every cell from the last column will have the id of the row they are placed on.
                //First cell will have the id:1 because it's placed of the first row.
                cellElement.id=rowElement.id;

                //Create a trigger button that will show in every cell of the last column.
                var popUpButton=document.createElement("button");
                popUpButton.innerHTML=`<button type="button" class="btn btn-dark" id="${i}"  data-toggle="modal" data-target="#userModal" >+</button>`;
                cellElement.innerHTML=popUpButton.innerHTML;

                //Add an event listener so when the user clicks on the "+" button, the modal will open and its title and body will update.
                cellElement.addEventListener("click",async ()=>{
                    //Assigning the cell id to a variable.
                    var x=cellElement.id;
                    modTitle.innerHTML=`The user with id: ${x} has the following complete information`;
                    //Create a new async promise-based function to access specific users.
                    const url1="https://jsonplaceholder.typicode.com/users/"+x;
                    console.log(url1);
                    var response1=await fetch(url1);
                    globalThis.data1=await response1.json();
                    console.log(data1);
                    
                    //The address and the company infos obtained are objects
                    //so I used the stringify() method to convert the js objects into strings.
                    const myCompany=JSON.stringify(data1.company);
                    const myAddress=JSON.stringify(data1.address);
                     
                    //Update the modal body.
                    modBody.innerHTML="<i> Address info:</i> <br/>"+myAddress+" <br /> <i>Company info:</i> <br/>"+myCompany;
                       
                    });

                //Append the cells to the rows.
                rowElement.appendChild(cellElement);
                break;
        }
    }
        //Append the rows to the table.
        tableBody.appendChild(rowElement);
    }
    
}



