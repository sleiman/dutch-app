// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var count = 0;
// // app.get('/', function(req, res){
// //   res.sendfile('index.html');
// // });

// var nsp = io.of('/2');
// nsp.on('connection', function(socket){
//     console.log('someone connected');
//     count = io.of('/2').sockets.length
//     nsp.emit('count', count);
// });


// io.on('connection', function(socket){
	


//    setInterval(function(){
//    		 socket.emit('date', {'date': new Date()});
//     }, 1000);
//    socket.on('new count', function(data){
//     	 count = io.sockets.sockets;
    		
//     	 io.emit('count', count.length);
//     	 io.sockets.sockets.map(function(e) {
//     console.log(e.username);
// })
//   	});

//    socket.on('disconnect', function(){
//    		 count = io.sockets.sockets;
//        io.emit('count', count.length);
//   });
// });
// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var count = 0;
// app.get('/', function(req, res){
//   res.sendfile('index.html');
// });
io.on('connection', function(socket){
  console.log('a user connected');
  
});
io.on('connection', function(socket){
    

                
    //    setInterval(function(){ 
    //     var delta = price/120;
    //     var updatePrice = eval(price)- eval(delta);
    //     var newPrice  = updatePrice.toFixed(2);

        
    //     io.emit('price', newPrice);
    // }, 2000);


    socket.on('create', function(room) {
      socket.join(room);
      var nsp = (typeof _nsp !== 'string') ? '/' : _nsp;
      var members = io.nsps[nsp].adapter.rooms[room];
      console.log(members);
      var count = Object.keys(members).length;
      io.emit('count', {'room':room,'count':count});
      if (count > 1) {
        console.log('more than one');
        io.to(room).emit('getCurrent');
      }

    });

  socket.on('current', function(data){
    console.log('current');
    var room = data.room;
    var price = data.price;
    start(room,price);
    function start(room,price) {
        console.log(room, price);
     
        var delta = price/120;
        var newPrice = price;
        var dutchBid = setInterval(function() {  
        
        newPrice= eval(newPrice) - eval(delta);
        newPrice  = newPrice.toFixed(2);
        if (newPrice > -1) {
        io.to(room).emit('change', {'price':newPrice,'room':room});
        }
        
        
          // io.sockets.emit('timer', { countdown: countdown });
        }, 1000);
      }
  });
    // socket.on('start', function(price) {
    //   console.log(price);
    //   start(price);
      

    // });

   setInterval(function(){
       socket.emit('date', {'date': new Date()});
    }, 1000);

   socket.on('new count', function(data){
      console.log(data.user, data.room);    
    });

  socket.on('dutched', function(id){
    io.to(id).emit('bidOver', {'room': id});
    
    // socket.emit('bidOver', {'room': id});
    console.log(id);
  });


   socket.on('disconnect', function(){
    
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});

