        let date=new Array();
        let temp_min=new Array();
        let temp_max=new Array();
        let weathericon=new Array();
            function myFunction() {
      var x = document.getElementById("myLinks");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
        x.style.position="absolute";
        x.style.top="10%";
        x.style.right="0";
      }
    }
    let appid="21d2bb893317cd7d6af48db3a93bd75b";
    let units="metric";
    function displayWeather(id){
        console.log(id);
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&units=${units}&APPID=${appid}`).then(result=> {
            return result.json();
        })
        .then(result=>{
            init(result);
        })
     }
     
    function init(resultFromServer){
        document.getElementById("cityName").innerHTML=resultFromServer.name;
        console.log(resultFromServer);
        switch(resultFromServer.weather[0].main){
            case 'Clear':
                document.getElementsByClassName("main")[0].style.backgroundImage='url("clear.jpeg")';
                
                break;
            case 'Clouds':
                document.getElementsByClassName("main")[0].style.backgroundImage='url("clouds.jpeg")';
                break;
            case 'Rain':
            case 'Drizzle':
            case 'Mist':
                document.getElementsByClassName("main")[0].style.backgroundImage='url("rain.jpeg")';
                break;
            case 'Thunderstorm':
                document.getElementsByClassName("main")[0].style.backgroundImage='url("storm.jpg")';
                break;
            case 'Snow':
                document.getElementsByClassName("main")[0].style.backgroundImage='url("snow.jpg")';
                default: 
                break;
        }
        var date = new Date(resultFromServer.dt*1000);
        console.log(date);
         let hrs = date.getHours();
         var dd = date.getDate();
         var mm = date.getMonth()+1;
         var yyyy = date.getFullYear();
         if(dd<10)
         {
             dd="0${dd}";
         }
         if(mm<10)
         {
             mm='0'+mm;
         }
         let dateString= yyyy+'-'+mm+'-'+dd;
         let greet;
           if (hrs < 12)
               greet = 'Good Morning';
           else if (hrs >= 12 && hrs <= 16)
               greet = 'Good Afternoon';
           else if( hrs>16 && hrs<=24)
               greet = 'Good Evening';
           document.getElementById('greetings').innerHTML = greet;
         let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
         let d = new Date(dateString);
         let dayName = days[d.getDay()];
         document.getElementById("weeklyheader").innerHTML = dayName;

        let weathericon=document.getElementById('weatherIcon');
        weathericon.src="http://openweathermap.org/img/w/"+resultFromServer.weather[0].icon+".png";
        document.getElementById("temp").innerHTML=resultFromServer.main.temp_max +'&degC | '+resultFromServer.main.temp_min+'&degC';

    }
    function displayFutureWeather(id){
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=${units}&APPID=${appid}`).then(result=> {
            return result.json();
        })
        .then(result=>{
            j=0;
            count=result.list.length;
            for(let i=0;i<count;i=i+8){
                date[j]=result.list[i].dt*1000;
                temp_min[j]=result.list[i].main.temp_min;
                temp_max[j]=result.list[i].main.temp_max;
                weathericon[j]=result.list[i].weather[0].icon;
                j++;
            }
            initFuture(result,date,temp_max,temp_min,weathericon);
            console.log(result,date,temp_min,temp_max);
            
        })
     }
    function initFuture(resultFromServer,date2,temp_max,temp_min,weathericon){
        j=0;
        for(let i=1;i<5;i++){
        console.log(resultFromServer,date2,temp_max,temp_min);
        let date = new Date(date2[i]);
        console.log(date);
         let hrs = date.getHours();
         let dd = date.getDate();
         let mm = date.getMonth()+1;
         let yyyy = date.getFullYear();
         if(dd<10)
         {
             dd=`0${dd}`;
         }
         if(mm<10)
         {
             mm='0'+mm;
         }
         let dateString= yyyy+'-'+mm+'-'+dd;
         let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
         let d = new Date(dateString);
         let dayName = days[d.getDay()];
         let dName= document.getElementsByClassName("futureweeklyheader");
        dName[j].innerHTML = dayName;

        let weathericonar=document.getElementsByClassName('futureweatherIcon');
        weathericonar[j].src="http://openweathermap.org/img/w/"+weathericon[i]+".png";
        document.getElementsByClassName("futuretemp")[j].innerHTML=temp_max[i] +'&degC | '+temp_min[i]+'&degC';
        j++;
    }
    }
