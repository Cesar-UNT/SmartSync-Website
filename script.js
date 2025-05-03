        /*
        async function queryDynamoDB() {

            //Clear the output division
            document.getElementById('result').innerText = " ";


            // Get the partition and sort key values from input fields
            const roomValue = document.getElementById('partitionValue').value;
            const sortValue = document.getElementById('sortValue').value;
            const dateValue = document.getElementById('dateValue').value;

            const partitionValue = roomValue + "-" + dateValue;

            let apiUrl = `https://uac13zk9va.execute-api.us-east-1.amazonaws.com/v1/smartsync?PartitionKey=${partitionValue}`;

            if (sortValue) {
                apiUrl += `&SortKey=${sortValue}`;
            }

            try {
                // Fetch data from the API
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

               //Response from GET request
                const rawData = await response.json(); //parses json string
                const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData; //parses again due to double encoded JSON string


                //Error message output 
                if (data === "No Records Found") {
                    document.getElementById('result').innerHTML = `<p>${data}</p>`;
                    return;
                }

                //Sort the query in chronological order
                data.sort((a, b) => {
                    const parseTime = (timestamp) => {
                        const [time, modifier] = timestamp.split(' '); // Split time and AM/PM
                        let [hours, minutes, seconds] = time.split(':').map(Number); // Split into components

                            if (modifier === 'PM' && hours !== 12) {
                                hours += 12; // Convert PM to 24-hour format
                            } else if (modifier === 'AM' && hours === 12) {
                                hours = 0; // Handle midnight case
                            }

                            // Return total seconds since the start of the day
                            return hours * 3600 + minutes * 60 + seconds;
                    };
                    
                    //Sort the values
                    return parseTime(a.Timestamp) - parseTime(b.Timestamp);
                });

                // Safely delete the Room and Time property
                data.forEach(item => delete item.Room);
                data.forEach(item => delete item.Time);


                // Format the data for display
                const formattedData = data
                    .map(item => 
                        Object.entries(item)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('<br>') //line break in html
                    )
                    .join('<br><br>'); //line break in html

                // Update the result element
                document.getElementById('result').innerHTML = `<p>${formattedData}</p>`;
            
            } catch (error) {
                // Handle errors
                document.getElementById('result').innerText = `Error: ${error.message}`;
                console.error('Error querying DynamoDB:', error);
            }
        }

        //Query function for recorded incidents 
        async function QueryIncidents() {

            //Clear the output division
            document.getElementById('incidentresults').innerText = " ";

            //Extract the date value from input
            const selectedDate = document.getElementById('Fecha').value;

            //define api url 
            let incidentqueryAPI = `https://uac13zk9va.execute-api.us-east-1.amazonaws.com/v1/incidentQuery?DateValue=${selectedDate}`;


            try {
                // Fetch data from the API
                const response = await fetch(incidentqueryAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                //Response from GET request 
                const rawData = await response.json(); //parses json string
                const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData; //parses again due to double encoded JSON string

                if (data === "No Record Found") {
                    document.getElementById('incidentresults').innerHTML = `<p>${data}</p>`;
                    return;
                }

                //Sort the query in chronological order
                data.sort((a, b) => {
                    const parseTime = (timestamp) => {
                        const [time, modifier] = timestamp.split(' '); // Split time and AM/PM
                        let [hours, minutes, seconds] = time.split(':').map(Number); // Split into components

                            if (modifier === 'PM' && hours !== 12) {
                                hours += 12; // Convert PM to 24-hour format
                            } else if (modifier === 'AM' && hours === 12) {
                                hours = 0; // Handle midnight case
                            }

                            // Return total seconds since the start of the day
                            return hours * 3600 + minutes * 60 + seconds;
                    };
                    
                    //Sort the values
                    return parseTime(a.Timestamp) - parseTime(b.Timestamp);
                });

                // Safely delete the Room and Time property
                data.forEach(item => delete item.Room);
                data.forEach(item => delete item.Time);


                // Format the data for display
                const formattedData = data
                    .map(item => 
                        Object.entries(item)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('<br>') //line break in html
                    )
                    .join('<br><br>'); //line break in html

                // Update the result element
                document.getElementById('incidentresults').innerHTML = `<p>${formattedData}</p>`;
            
            } catch (error) {
                // Handle errors
                document.getElementById('incidentresults').innerText = `Error: ${error.message}`;
                console.error('Error querying DynamoDB:', error);
            }
        }
               
        async function incidentDashboard(){
             
            //Get date from system to only print todays incidents
            let systemDate = new Date();
            console.log(systemDate);
            let formattedDate = (systemDate.getMonth() + 1).toString().padStart(2, '0') + '/' + systemDate.getDate().toString().padStart(2, '0') + '/' + systemDate.getFullYear();
            
            //define api url 
            let incidentDashboardAPI = `https://uac13zk9va.execute-api.us-east-1.amazonaws.com/v1/incident?DateValue=${formattedDate}`;


            try {
                // Fetch data from the API
                const response = await fetch(incidentDashboardAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                //Store response of GET request
                const data = await response.json();

                //Sort the query in chronological order
                data.sort((a, b) => {
                    const parseTime = (timestamp) => {
                        const [time, modifier] = timestamp.split(' '); // Split time and AM/PM
                        let [hours, minutes, seconds] = time.split(':').map(Number); // Split into components

                            if (modifier === 'PM' && hours !== 12) {
                                hours += 12; // Convert PM to 24-hour format
                            } else if (modifier === 'AM' && hours === 12) {
                                hours = 0; // Handle midnight case
                            }

                            // Return total seconds since the start of the day
                            return hours * 3600 + minutes * 60 + seconds;
                    };
                    
                    //Sort the values
                    return parseTime(a.Timestamp) - parseTime(b.Timestamp);
                });

                // Safely delete the Room and Time property
                data.forEach(item => delete item.Room);
                data.forEach(item => delete item.Time);

                //set flag for existing incidents 
                // Iterate through each item in the array
                for (const item of data) {
                    // Extract timestamp and location
                    const timestamp = item.Timestamp; // Replace 'timestamp' with the actual key in your data
                    const location = item.Location;   // Replace 'location' with the actual key in your data
                    
                   
                
                }

               const formattedData = data
               .map(item => 
                   Object.entries(item)
                   .map(([key, value]) => `${key}: ${value}`)
                   .join('<br>') //line break in html
               )
               .join('<br><br>'); //line break in html
       
           if (!formattedData) {
               resultElement.innerHTML = `<p>No incidents recorded today</p>`;
           } else {
               // Remove "No incidents..." message if it exists
               if (resultElement.innerHTML.includes("No incidents recorded today")) {
                   resultElement.innerHTML = '';
               }
       
               // Add to message history and keep only last 3
               messageHistory.push(`<p>${formattedData}</p>`);
               if (messageHistory.length > 3) {
                   messageHistory.shift();
               }
       
               // Update the innerHTML with the last 3 messages
               resultElement.innerHTML = messageHistory.join('');
           }
            } catch (error) {
                // Handle errors
                document.getElementById('incidentDashboard').innerText = `Error: ${error.message}`;
                console.error('Error querying DynamoDB:', error);
            }

        }
           
        */

      

async function queryDynamoDB() {
    document.getElementById('result').innerText = " ";

    const roomValue = document.getElementById('partitionValue').value;
    const sortValue = document.getElementById('sortValue').value;
    const dateValue = document.getElementById('dateValue').value;
    const partitionValue = roomValue + "-" + dateValue;

    let apiUrl = `https://uac13zk9va.execute-api.us-east-1.amazonaws.com/v1/smartsync?PartitionKey=${partitionValue}`;
    if (sortValue) apiUrl += `&SortKey=${sortValue}`;

    try {
        const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0 || data === "No Records Found") {
            document.getElementById('result').innerHTML = `<p>No Records Found</p>`;
            return;
        }

        data.sort((a, b) => parseTime(a.Timestamp) - parseTime(b.Timestamp));
        data.forEach(item => { delete item.Room; delete item.Time; });

        const formattedData = data
            .map(item => Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('<br>'))
            .join('<br><br>');

        document.getElementById('result').innerHTML = `<p>${formattedData}</p>`;

    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
        console.error('Error querying DynamoDB:', error);
    }
}

async function QueryIncidents() {
    document.getElementById('incidentresults').innerText = " ";
    const selectedDate = document.getElementById('Fecha').value;
    const incidentqueryAPI = `https://uac13zk9va.execute-api.us-east-1.amazonaws.com/v1/incidentQuery?DateValue=${selectedDate}`;

    try {
        const response = await fetch(incidentqueryAPI, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0 || data === "No Record Found") {
            document.getElementById('incidentresults').innerHTML = `<p>No records found</p>`;
            return;
        }

        data.sort((a, b) => parseTime(a.Timestamp) - parseTime(b.Timestamp));
        data.forEach(item => { delete item.Room; delete item.Time; });

        const formattedData = data
            .map(item => Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('<br>'))
            .join('<br><br>');

        document.getElementById('incidentresults').innerHTML = `<p>${formattedData}</p>`;

    } catch (error) {
        document.getElementById('incidentresults').innerText = `Error: ${error.message}`;
        console.error('Error querying DynamoDB:', error);
    }
}



const resultElement2 = document.getElementById('incidentDashboard');

let incidentMessageHistory = [];

async function incidentDashboard() {
    const systemDate = new Date();
    const formattedDate = (systemDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
        systemDate.getDate().toString().padStart(2, '0') + '/' +
        systemDate.getFullYear();

    const incidentDashboardAPI = `https://uac13zk9va.execute-api.us-east-1.amazonaws.com/v1/incident?DateValue=${formattedDate}`;

    try {
        const response = await fetch(incidentDashboardAPI, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const resultElement = document.getElementById('incidentDashboard');

        if (!Array.isArray(data) || data.length === 0) {
            resultElement.innerHTML = `<p>No incidents recorded today</p>`;
            return;
        }

        data.sort((a, b) => parseTime(a.Timestamp) - parseTime(b.Timestamp));
        data.forEach(item => { delete item.Room; delete item.Time; });

// Keep only the last 3 entries (most recent)
        const lastThreeIncidents = data.slice(-3); 
        // assumes sorted in chronological order
        incidentMessageHistory.push(...lastThreeIncidents);
        const formattedData = lastThreeIncidents
            .map(item => Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('<br>'))
            .join('<br><br>');

       

if (!formattedData) {
    resultElement2.innerHTML = `<p>No incidents recorded today</p>`;
} else {
    resultElement2.innerHTML = `<p>${formattedData}</p>`;
}


    } catch (error) {
        document.getElementById('incidentDashboard').innerText = `Error: ${error.message}`;
        console.error('Error querying DynamoDB:', error);
    }
}

function parseTime(timestamp) {
    const [time, modifier] = timestamp.split(' ');
    let [hours, minutes, seconds] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    else if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 3600 + minutes * 60 + seconds;
}

        // Step 1: Establish WebSocket connection
        const updatesocket = new WebSocket('wss://x290qiinj3.execute-api.us-east-1.amazonaws.com/production/');

        function initializeWebSocket() {
            // Step 2: Handle WebSocket events
            updatesocket.onopen = function() {
                console.log("Recent Activity WebSocket connection established!");
               
            };

            let messageList = []; // Array to store all messages
            let updateTimeout; // Variable to track the timeout

            updatesocket.onmessage = function(event) {
                console.log("Message received: ", event.data);

                let formattedData = event.data
                        .replace(/[\[\]{}\"']/g, '')  // Remove unwanted characters
                        .replace(/,/g, ',\n');         // Add a newline after every comma
                    
                // Add the formatted message to the list
                messageList.push(formattedData);

                // Keep only the most recent 3 messages
                if (messageList.length > 2) {
                    messageList.shift(); // Removes the oldest message
                }
                // Restart the timeout timer for printing the dashboard
                if (updateTimeout) {
                    clearTimeout(updateTimeout); // Clear the existing timer
                }

                updateTimeout = setTimeout(() => {
                    printDashboard();
                    //messageList = []; // Clear the list after printing
                }, 200); // 1-second delay
                
            };

            function printDashboard() {
                // Only keep the last 3 messages
                const recentMessages = messageList.slice(-3);
            
                // Update the "messages" div with just the recent messages
                document.getElementById("messages").innerHTML = recentMessages
                    .map(message => `<p>${message}</p>`)
                    .join('');
            }
            

            updatesocket.onerror = function(error) {
                console.error("WebSocket error: ", error);
            };

            updatesocket.onclose = function() {
                console.log("WebSocket connection closed.");
                initializeWebSocket();
                
            };

        }


        //Establish incident report websocket
        const incidentsocket = new WebSocket('wss://aazjpa4x4d.execute-api.us-east-1.amazonaws.com/production/')

        function incidentWebSocket() {

            // Step 2: Handle WebSocket events
            incidentsocket.onopen = function() {
                console.log("Incident WebSocket connection established!");
                
            };

            incidentsocket.onmessage = function(event) {
                

                console.log("Message received: ", event.data);
                
                // Parse the message into a JSON object
                let message = JSON.parse(event.data);
                
                // Remove the "Room" and "Time" properties from the object
                delete message.Room;
                delete message.Time;
                
                // Extract the location and update monitor
                let location = message.Location;
                let Reset = "False";
                monitorSvgUpdate(location, Reset);
                
                // Add the new message to history and keep only the latest 3
                incidentMessageHistory.push(message);
                if (incidentMessageHistory.length > 3) {
                    incidentMessageHistory.shift();
                }
                
                // Format all messages
                const formattedData = incidentMessageHistory
                    .map(item => 
                        Object.entries(item)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join('<br>')
                    )
                    .join('<br><br>');
                
                // Update the DOM
                resultElement2.innerHTML = `<p>${formattedData}</p>`;
            };
            
            
            incidentsocket.onerror = function(error) {
                console.error("WebSocket error: ", error);
            };

            incidentsocket.onclose = function() {
                console.log("WebSocket connection closed.");
                incidentWebSocket();
            };
        }



        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //initial scan of the resetrecords table upon site load
        async function ResetStatus() {

            let apiUrl = "https://uac13zk9va.execute-api.us-east-1.amazonaws.com/v1/ResetStatus";

            try {
                // Fetch data from the API
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                data = await response.json();

                // Iterate through each item in the array
                for (const item of data) {
                    // Extract timestamp and location
                    const Reset = item.Reset; // Either true or false
                    const location = item.Room;   // Room number 
                    
                    monitorSvgUpdate(location, Reset);
                    
                }


            }catch (error) {
                // Handle errors
                console.error('Error scanning ResetRecords Table:', error);
            }
        }

         // Step 1: Establish WebSocket connection
         const resetsocket = new WebSocket('wss://ge3oft6oc0.execute-api.us-east-1.amazonaws.com/production/');

         function ResetWebSocket() {
             // Step 2: Handle WebSocket events
             resetsocket.onopen = function() {
                 console.log("Reset WebSocket connection established!");
                
             };
 
             resetsocket.onmessage = function(event) {
                 console.log("Message received: ", event.data);

                 try {
                    const data = JSON.parse(event.data); // Parse JSON data
            
                    const Room = data.Room;  // Extract values
                    const Reset = data.Reset;
            
                    console.log( Room + Reset);
                    monitorSvgUpdate(Room, Reset); //change it back to white as it only receives true reset status

                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                }
                 
 
             };
 
             resetsocket.onerror = function(error) {
                 console.error("WebSocket error: ", error);
             };
 
             resetsocket.onclose = function() {
                 console.log("WebSocket connection closed.");
                 ResetWebSocketWebSocket();
                 
             };
 
         }


        
        //changes map color
        function monitorSvgUpdate(location, Reset) {
           
            const svgObject = document.getElementById("svg-object");
            if(Reset == "False"){
            
                fillColor = "#FF0000";
            }else {
                
                fillColor = "#FFFFFF"
            }
            updateSvgFill(location, fillColor)
        
            // Update the SVG fill color
            function updateSvgFill(location, fillColor) {
                if (svgObject) {
                    if (svgObject.contentDocument) {
                        applyFill(svgObject.contentDocument, location, fillColor);
                    } else {
                        // In case the SVG is not loaded yet, listen for the load event
                        svgObject.addEventListener("load", function () {
                            applyFill(svgObject.contentDocument, location, fillColor);
                        });
                    }
                } else {
                    console.log("SVG object not found");
                }
            }
        
            // Apply the fill color to the specified path
            function applyFill(svgDoc, location, fillColor) {
                const pathElement = svgDoc.getElementById(location);
                if (pathElement) {
                    pathElement.setAttribute("fill", fillColor);
                } else {
                    console.log("No matching SVG path found for location", location);
                }
            }
        }
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        async function handleSend() {
            
            // Get the partition and sort key values from input fields
            let name = document.getElementById('nameValue').value;
            let number = document.getElementById('numberValue').value;
            let email = document.getElementById('emailValue').value;
            let message = document.getElementById('messageValue').value;

            if (!name || !number || !email || !message) {
                document.getElementById('sendresult').innerHTML = `<errorp>All fields are required.</errorp>`;
                return;
            }
          
            try {
                const response = await fetch('https://ngvw4trl11.execute-api.us-east-1.amazonaws.com/v1/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                        // Formats the body with all the attributes
                        body: JSON.stringify({name, number,  email,  message }),
                });
            
                if (response.ok) {
                  document.getElementById('sendresult').innerHTML = `<p>Message sent successfully.</p>`;
                } else {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
              } catch (error) {
                console.error(error);
                document.getElementById('sendresult').innerHTML = `<errorp>Failed to send message. Please try again.</errorp>`;
              }
            
          };
          
           //perform these function on window load
        window.onload = function() {
            initializeWebSocket(); //recent activity dashboard
            incidentDashboard(); //recent incident history GET request
            incidentWebSocket(); //receive messages of recorded incidents
            ResetStatus(); //reset status for measured rooms 
            ResetWebSocket(); //reset websocket for live updates 
        };

        function showSidebar(){
            const sidebar = document.querySelector('.sidebar')
            sidebar.style.display = 'flex'
        }
        function hideSidebar(){
            const sidebar = document.querySelector('.sidebar')
            sidebar.style.display = 'none'
        }
        
        
    