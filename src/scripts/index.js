import '../styles/index.scss';
import data from '../assets/airports.json';
import datepicker from 'js-datepicker';


//const link = document.querySelector('#js-search');
const formData = {};
const myRequestObj = new Request("./src/assets/airports.json");

const picker = datepicker('#depDate');

const fetchdata = (nameValue) => {
	fetch(myRequestObj) 
	.then(function(res) {
		return res.json();
	})
	.then(function(data) {
		
		if(nameValue !="" && nameValue !=undefined) {
			
			//console.log(filterByProperty(data, "", "Pune"));
			for (const  formdataVal in nameValue) {
				
				//console.log(formdataVal[0]);
			   // `item` is the array element, **not** the index
			}

		
			
			
			
			var returnVal = getObjects(data,'', '', nameValue);
			displayData(returnVal);
			
			//var res1 =Object.entries(nameValue);
			
			
			var result = data.filter(function(e) {
			  //return res1.includes(e.Origin);
			});

			//console.log(result);
			
			//var filtered = data.filter(filterByProperty1, nameValue );
			
			//console.log(filtered);
			//var result = data.filter(o => Object.keys(nameValue).every(k => nameValue[k].some(f => o[k] === f)));

			//console.log(result);


			for (var i=0; i<data.length; i++){
					//console.log(data[i].Origin);
			}
  
  
			
			//console.log(nameValue);
			//var vandu =  data.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(nameValue)));
			
			//console.log(vandu);
			
			//var item = array.filter((item)=>eachIndex(item));
			
			
			const data_filter = data.filter(function (element) {
				return element.Origin.toLowerCase() == nameValue;
			});
			//console.log(data_filter);
			
			
			data_filter.forEach(obj => {
				
				
				Object.entries(obj).forEach(([key, value]) => {
					
				});
			
				for (var el in obj) {
					if (obj[el].hasOwnProperty(nameValue)) {
					  //console.log(obj[el][nameValue]);
					}
				}
			});
			
		} else {
			displayData(data);
		}

	});

};

let getObjects = (obj, key, val, formarr) => {
    let objects = [];
	
	for (let i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
			
			if (typeof obj[i] == 'object') {
				objects = objects.concat(getObjects(obj[i], key, val, formarr));    
			
			} else {
				for( var vanz in formarr) {
			
					let uppercaseVal = formarr[vanz].charAt(0).toUpperCase() + formarr[vanz].slice(1);
					
					let searchKey = formarr[vanz].toLowerCase();	
				 	//if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
					if (i == key && obj[i] == val || i == key && val == '') { 
						objects.push(obj);
					} else if ( obj[i] == uppercaseVal && key == ''){
						
						//only add if the object is not already in the array
						if (objects.lastIndexOf(obj) == -1){
							objects.push(obj);
						}
					}
				
				}
			}
    }
	console.log(objects);
	return objects;
};


/*let filterItems = (arr, query) => {
  return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
};


let  filterByProperty = (array, prop, value) => {
    var filtered = [];
	var vandu;
	for(var i = 0; i < array.length; i++){

        var obj = array[i];

		for(var key in obj){
			
			if(typeof(obj[key] == "object")){
                var item = obj[key];
				//console.log(item);
				
				if(item[prop] == value){
                    filtered.push(item);
                } 
            }
        }

    }    

    return filtered;

};*/

var displayData = (data) => {
	document.getElementById("ajax-content").innerHTML = `
	<h1 class="app-title">All Flight Data (${data.length} results)</h1>
		${data.map(petTemplate).join("")}
	`;
};


const petTemplate = (travelDetails) => {
	
	//console.log(travelDetails);
	
	let car = travelDetails.TravelOptions;
	return `
	<div class="header">
	<div class="left-data">
		${travelDetails.Origin} > ${travelDetails.Destination} 
	</div>
	
	
	<div class="right-data">
		<span class="depart"> Depart : ${travelDetails.DepartureDateTime} </span>
		<span class="depart"> Arrive : ${travelDetails.ArrivalDateTime} </span>
		
	</div>
	</div>
	
	<div class="travelDetail--block">
		${car.map(airportCareer).join("")}
	</div>
	
	`;
	
};

const airportCareer = (career) => {
	
	let portWays = career.Carrier;	
	  return `
		<div class="carrier--details">
		<h4>${career.TravelPrice}</h4>
		<div class="carrierWrapper">
			
		${portWays.map(portOptions).join("")}
		<div class="book--flight">
		<button class="btn btn-primary">Book this Flight</button>
		</div>
		
		</div>
		
		</div>
		`;
};


const portOptions = (port) => {
	  return `
		<ul>
		<li><span class="station--code">${port.Code}</span></li>
		<li>Depart : ${port.Depart}</li>
		<li>Arrive : ${port.Arrive}</li>
		<li>${port.Station}</li>
		</ul>
		`;
};


document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();
	var formElements=document.getElementById("my-form").elements;    

	for (var i=0; i<formElements.length; i++) {
		if (formElements[i].type!="submit") { //we dont want to include the submit-buttom
			formData[i]=formElements[i].value;
		}	
	}		
	fetchdata(formData);

});
fetchdata();

