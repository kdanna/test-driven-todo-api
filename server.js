// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var nextId = 1;

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
   { _id: 1, task: 'Laundry', description: 'Wash clothes' },
   { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
   { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});


//WORKS
app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
});


app.post('/api/todos', function create(req, res) {
  
  var newTodo = req.body;
    var nextId = todos.length + 1;
    newTodo._id = nextId;
  
  todos.push(newTodo);
  res.json(newTodo);
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
});


//WORKS
app.get('/api/todos/:id', function show(req, res) {
   /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var idWeWant = req.params.id; //set user input to var 
   var todoWeWant = todos.filter(function(todo){  // if the loop is equal to the entry return it
    return (parseInt(idWeWant) === todo._id);
   })[0];

   res.json(todoWeWant);

   for (var i=0; i<todos.length; i++) {
    if(idWeWant === todos[i]._id) {

    }
   }

});

app.put('/api/todos/:id', function update(req, res) {
    var oneToUpdate = parseInt(req.params.id);
    var actualUpdate = req.body;
    for(var i = 0; i < todos.length; i ++){
      if (oneToUpdate === todos[i]._id){ 
        actualUpdate._id= oneToUpdate;
        todos[i] = actualUpdate;
        res.json(todos[i]); 
      }
    }   
  });
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */


app.delete('/api/todos/:id', function destroy(req, res) {
  var oneToDelete = parseInt(req.params.id);
  console.log(req.params);
  for(var i = 0; i < todos.length; i ++){
    if (oneToDelete === todos[i]._id){ 
      console.log("this works");
       todos.splice(i, 1);
    }
  }
  res.json(todos);
 });



  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
