const states = [
    {
        name : "Alabama",
        value : "AL"
    },
    {
        name : "Alaska",
        value : "AK"
    },
    {
        name : "Arizona",
        value : "AZ",
    },
    {
        name : "California",
        value : "CA"
    },
    {
        name : "Colorado",
        value : "CO"
    },
    {
        name : "Connecticut",
        value : "CT"
    },
    {     
        name : "Delaware",
        value : "DE"
    },
    {
        name : "Florida",
        value : "FL"
    },
    {
        name : "Georgia",
        value : "GA"
    },
    {
        name : "Hawaii",
        value : "HI"
    },
    {
        name : "Idaho",
        value : "ID"
    },
    {
        name : "Illinois",
        value : "IL"
    },
    {
        name : "Indiana",
        value : "IN"
    },
    {
        name : "Iowa",
        value : "IA"
    },
    {
        name : "Kansas",
        value : "KS"
    },
    {
        name : "Kentucky",
        value : "KY"
    },
    {
        name : "Louisiana",
        value : "LA"
    },
    {
        name : "Maine",
        value : "ME"
    },
    {
        name : "Maryland",
        value : "MD"
    },
    {
        name : "Massachusetts",
        value : "MA"
    },
    {
        name : "Michigan",
        value : "MI"
    },
    {
        name : "Minnesota",
        value : "MN"
    },
    {
        name : "Mississippi",
        value : "MS"
    },
    {
        name : "Missouri",
        value : "MO"
    },
    {
        name : "Montana",
        value : "MT"
    },
    {
        name : "Nebraska",
        value : "NE"
    },
    {
        name : "Nevada",
        value : "NV"
    },
    {
        name : "New Hampshire",
        value : "NH"
    },
    {
        name : "New Jersey",
        value : "NJ"
    },
    {
        name : "New Mexico",
        value : "NM"
    },
    {
        name : "New York",
        value : "NY"
    },
    {
        name : "North Carolina",
        value : "NC"
    },
    {
        name : "North Dakota",
        value : "ND"
    },
    {
        name : "Ohio",
        value : "OH"
    },
    { 
        name : "Oklahoma",
        value : "OK"
    },
    {
        name : "Oregon",
        value : "OR"
    },
    {
        name : "Pennsylvania",
        value : "PA"
    },
    {
        name : "Rhode Island",
        value : "RI"
    },
    {
        name : "South Carolina",
        value : "SC"
    },
    {
        name : "South Dakota",
        value : "SD"
    },
    {
        name : "Tennessee",
        value : "TN"
    },
    {
        name : "Texas",
        value : "TX"
    },
    {
        name : "Utah",
        value : "UT"
    },
    {
        name : "Vermont",
        value : "VT"
    },
    {
        name : "Virginia",
        value : "VA"
    },
    {
        name : "Washington",
        value : "WA"
    },
    {
        name : "West Virginia",
        value : "WV"
    },
    {
        name : "Wisconsin",
        value : "WI"
    },
    {
        name : "Wyoming",
        value : "WY"
    }
];

function generateStates() {
    
    let generateHTML = "";

    for (let i = 0; i < states.length; i++) {
        
        if (i % 5 === 0 && i !== 0) {generateHTML += `<p></p>`;}
        
        generateHTML += `<input type="checkbox" name ="${states[i].name}" value="${states[i].value}">${states[i].name}  `;

    }

    document.querySelector("#states").innerHTML = generateHTML;
}

function buildStateParams(states) {
    
    let stateString = "";

    for (let i = 0; i < states.length; i++) {
        stateString += `stateCode=${states[i].value}`;
        if (i !== states.length -1) {stateString += `&`}
    }

    return stateString;
}

function fetchParks() {

    let stateString = buildStateParams(document.querySelectorAll("input[type='checkbox']:checked"))
    
    const search = `https://developer.nps.gov/api/v1/parks?${stateString}&limit=${document.querySelector("#maxResults").value}&api_key=O4eI6FTrhNIUT8edzRxQCHG89pSUJzMfs5tXRe5Y`;
    
    fetch (search)
    .then (response => response.json())
    .then (response => {
        console.log(response);
        let buildHTML = "";
        for (let i = 0; i < response.data.length; i++) {
            buildHTML += `<h2>${response.data[i].fullName}</h2>`;
            buildHTML += `<p><a href="${response.data[i].url}" target="_blank">Visit Website</a></p>`;
            buildHTML += `<p><em>${response.data[i].description}</em></p>`;
        }
        document.querySelector("#parks").innerHTML = buildHTML;
    })
};



document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    fetchParks();
})

generateStates();
