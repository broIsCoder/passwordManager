// first extract data from local storage  , if data available , show in table Html   ,else show 'no data found'

//when submitBtn is clicked , check if input are empty or not ,  if they are filled , store them in local storage (obj element of arr=>str element of arr) wih copy btn 
//show them in html by extract them from local storage again.
// while showing masking the password 

// setItem = store in local storage
// getItem - extract from local storage 
// parse = json obj into js obj
// stringify = js obj into json obj 

// In the browser's localStorage, you can only store string key-value pairs(json obj). Therefore, you cannot directly store a JavaScript object (JS object) in localStorage
const table = document.getElementById('table');
const submitBtn = document.getElementById('submitBtn')
const dataStatus = document.getElementById('dataStatus');

showPassword();                                                      // show data from array of obj

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();                                         // Prevent page reload

    let info = localStorage.getItem("infoJson");                     // extract data from local storage(json obj)
    console.log(info)
    
    let newData = {                                                 // new object for storing new inputted data
        website: website.value,
        userName: userName.value,
        password: password.value
    };

    if(newData.website == ''|| newData.userName ==''|| newData.password==''){
        alert('FIll in all spaces ')
    }
    else{
    // save password for first time
        if (info == null) {                                                       //  if there is no data in local storage 
            let json = [];                                                               // Create an array of obj for the first time (empty)
            json.push(newData);                                                     // update array with new inputted data
            alert("Password saved");
            localStorage.setItem("infoJson", JSON.stringify(json))                       // update local storage with the array  of obj (converted into json obj)
        }   
        // Get and save password
        else {                
            let json = JSON.parse(info);                                           // create  array  with extracted data (converted into  obj)
            json.push(newData);                                                      // update arrray with new inputted data of obj
            console.log("Password saved");
            localStorage.setItem("infoJson", JSON.stringify(json))             //  updated local storage with the array of obj (converted into json obj)
        }
        
        showPassword();                                                        // show saved data to user from array
        
        // clear forms inputs after saving passwords
        website.value = '';
        userName.value = '';
        password.value = '';

}
});


function deletePassword(website){      // it will delete based on website
    
    let data = localStorage.getItem("infoJson");                                    //extract data from local storage
    let arr = JSON.parse(data);                                                         // convert into objs , and store in arr
    // it will excludes the selected info  and store in arrUpdated
    let arrUpdated = arr.filter((e)=>{       //selected info will be false ,and tthis array only stores true 
        return e.website != website ;
    })
 
    localStorage.setItem("infoJson",JSON.stringify(arrUpdated));                     // update local storage with arrUpdated{ (array of(obj) into array of(json obj)}
    showPassword();                                                                     // show user updated data
    console.log(` ${website}'s password deleted`) ;
};

function showPassword() {
    let data = localStorage.getItem("infoJson");                      //extract data from local storage
    let str = `<tr>                            
    <th>Website</th>
    <th>UserName</th>
    <th>Password</th>
    <th>Delete</th>
    </tr>`;                   // default html (will show anyhow)

    if (data == null || data =='[]') {                                                  // if there is no data in local storage
        dataStatus.innerHTML = 'data not found';
        table.innerHTML = str ;                     // make it default
    } else {              
        dataStatus.innerHTML = 'data founded';                                                 // if there is data in local storage
        let arr = JSON.parse(data);                                         // covert into array of objs and store in arr
    
        for (let index = 0; index < arr.length; index++) {                      // for each element in arr
            const element = arr[index];

            // each are equipped with copy btn (img)
            str += `<tr>
                <td>${element.website} <img src="copy.svg" width="20" onclick="copyText('${element.website}')">
                </td>
                <td>${element.userName} <img src="copy.svg" width="20" onclick="copyText('${element.userName}')">
                </td>
                <td>${maskPassword(element.password)} <img src="copy.svg" width="20" onclick="copyText('${element.password}')">
                </td>
                <td><button class='deleteBtn' onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;                                              //also add event listener for deletion                 // add these to str
        }
        
        table.innerHTML = str;                // finally update the html with str(inputtted data)
    }
}


function copyText(txt){
    let copyItem = navigator.clipboard.writeText(txt);
    document.querySelector('.copyStatus').innerHTML = "copied";

    setTimeout(() => {
        document.querySelector('.copyStatus').innerHTML = "";
    }, 4000);
    
}

function maskPassword(pass){
    let str = '';
    for (let index = 0; index < pass.length; index++) {
        str += '*'
    };
    return str ;
}