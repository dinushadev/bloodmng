function addHospital(){
	
    $.ajax({
           type: "POST",
           url: 'hospital',
           data: $("#hospitalMatnForm").serialize(), // serializes the form's elements.
           success: function(data)
           {
              // alert(data); // show response from the php script.
              home_alert(data,'succ');
            $('#hospitalDetails').modal('toggle');
           },
           error: function(err)
           {
               alert(err); // show response from the php script.
            //   home_alert.warning(data,'succ');
            $('#hospitalDetails').modal('toggle');
             home_alert(err.responseText,'err');
           }
         });
}


home_alert= function(message,type) {
			var class_ = '';
			switch(type) {
			    case 'info':
			        class_ ='alert alert-info';
			        break;
			    case 'succ':
			        class_ ='alert alert-success';
			        break;    
			    case 'err':
			        class_ ='alert alert-danger';
			        break;
			    case 'warn':
			         class_ ='alert alert-warning';
			        break;
			    default: class_ ='alert alert-info';
			}
            $('#home_alert_placeholder').html('<div class="'+class_+'"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
}

function getHospitals(id){
	
    $.ajax({
           type: "GET",
           url: 'hospital',
           data: {'hid':id}, // serializes the form's elements.
           success: function(data)
           {
               //alert(data); // show response from the php script.
               return data;
           },
           error: function(err)
           {
               alert(err); // show response from the php script.
            //   home_alert.warning(data,'succ');
             home_alert(err,'err');
           }
     });
}

function loadHospitals(){
		 $.ajax({
           type: "GET",
           url: 'hospital',
           success: function(data)
           {
               alert(data); // show response from the php script.
               
           },
           error: function(err)
           {
               alert(err); // show response from the php script.
            //   home_alert.warning(data,'succ');
             home_alert(err,'err');
           }
     });
}

function addBloodStock(){
  
    $.ajax({
           type: "POST",
           url: 'stock',
           data: $("#addStockForm").serialize(), // serializes the form's elements.
           success: function(data)
           {
              // alert(JSON.stringify(data)); // show response from the php script.
              home_alert(data,'succ');
            $('#addBloodStockModal').modal('toggle');
           },
           error: function(err)
           {
              // alert(JSON.stringify(err)); // show response from the php script.
            //   home_alert.warning(data,'succ');
            $('#addBloodStockModal').modal('toggle');
             home_alert(err.responseText,'err');
           }
         });
}


function loadStocks(){
      var url = 'hospitalstock'
     $.ajax({
           type: "GET",
           url: url,
           success: function(data)
           {
               alert(data); // show response from the php script.
               
           },
           error: function(err)
           {
               alert(err); // show response from the php script.
            //   home_alert.warning(data,'succ');
             home_alert(err,'err');
           }
     });
}