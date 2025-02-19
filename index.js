const https = require('https');

    const options = {
      host: 'www.paprikaapp.com',
      path: '/api/v2/sync/meals/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX’
      },
    };

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
 

   
 exports.handler = (event, context, callback) => {

   
    function formatDate (date) {
        let monthString = (date.getMonth() + 1).toString().padStart(2,'0');
        let dayString = date.getDate().toString().padStart(2,'0');
        return date.getFullYear() + '-' +monthString + '-' + dayString;
    }
    
    function todayCT() {
    var timelagging = 6; // 5 or 6
    var utc = new Date();
    var cdt = new Date(utc.getTime()-((1 * 60 * 60 * 1000) * timelagging));
    return cdt;
}
   
    const req = https.request(options, (res) => {
         var responseObj = new Object();
         responseObj.today = "Nothing is planned.";
         responseObj.tomorrow = "Nothing is planned.";
        let body = '';
        console.log('Status:', res.statusCode);
        console.log('Headers:', JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            
            console.log('Successfully processed HTTPS response');
            // If we know it's JSON, parse it
            if (res.headers['content-type'] === 'application/json') {
                body = JSON.parse(body);
            }
            var array = body.result;
            let today = todayCT(); //new Date(); //.format('Y-m-d'); 
            let todayString = formatDate(today);
            let tomorrow = todayCT(); //new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            let tomorrowString = formatDate(tomorrow);
            
            console.log(todayString);
            for(let i = 0; i < array.length; i++) {
               let obj = array[i];

               let dateString = obj.date.substring(0,10);
               if (dateString === todayString) {
                     console.log(dateString);
                     console.log(obj.date);
                     console.log(obj.name);
                     responseObj.today = obj.name;
                     //callback(null, responseObj);
               }
                if (dateString === tomorrowString) {
                     console.log(dateString);
                     console.log(obj.date);
                     console.log(obj.name);
                     responseObj.tomorrow = obj.name;
                     //callback(null, responseObj);
               }
           
            } 
            //responseObj.meal = "Nothing is planned";
            callback(null, responseObj);
           // callback(null, "Nothing is planned");
        });
    });
    req.on('error', callback);
    // req.write(JSON.stringify(event.data));
    req.end();
};
