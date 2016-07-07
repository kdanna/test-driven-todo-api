// wait for DOM to load before running JS
$(document).ready(function() {
  var app = new App();
  function App(){
    this.baseUrl = '/api/todos';
    this.allTodos = [];
    this.$todosList = $('#todos-list');
    this.$createTodo = $('#create-todo');
    this.source = $('#todos-template').html();
    this.template = Handlebars.compile(this.source);
  }


  App.prototype.render = function() {
    this.$todosList.empty();
    var todosHtml = this.template({ todos: this.allTodos });
    this.$todosList.append(todosHtml);
  };
 
  // GET all todos on page load
  $.ajax({
    method: "GET",
    url: app.baseUrl,
    success: function onIndexSuccess(json) {
      console.log(json);

      // set `allTodos` to todo data (json.data) from API
      app.allTodos = json.todos;

      // render all todos to view
      app.render();
    }
  });
  // listen for submit even on form
  app.$createTodo.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newTodo = $(this).serialize();

    // POST request to create new todo
    $.ajax({
      method: "POST",
      url: app.baseUrl,
      data: newTodo,
      success: function onCreateSuccess(json) {
        console.log(json);

        // add new todo to `allTodos`
        app.allTodos.push(json);

        // render all todos to view
        app.render();
      }
    });

    // reset the form
    app.$createTodo[0].reset();
    app.$createTodo.find('input').first().focus();
  });

  // add event-handlers to todos for updating/deleting
  app.$todosList

    // for update: submit event on `.update-todo` form
    .on('submit', '.update-todo', function (event) {
      event.preventDefault();

      // find the todo's id (stored in HTML as `data-id`)
      var todoId = $(this).closest('.todo').attr('data-id');

      // find the todo to update by its id
      var todoToUpdate = app.allTodos.filter(function (todo) {
        return todo._id == todoId;
      })[0];

      // serialze form data
      var updatedTodo = $(this).serialize();

      // PUT request to update todo
      $.ajax({
        type: 'PUT',
        url: app.baseUrl + '/' + todoId,
        data: updatedTodo,
        success: function onUpdateSuccess(json) {
          // replace todo to update with newly updated version (json)
          app.allTodos.splice(app.allTodos.indexOf(todoToUpdate), 1, json);

          // render all todos to view
          app.render();
        }
      });
    })

    // for delete: click event on `.delete-todo` button
    .on('click', '.delete-todo', function (event) {
      event.preventDefault();

      // find the todo's id (stored in HTML as `data-id`)
      var todoId = $(this).closest('.todo').attr('data-id');

      // find the todo to delete by its id
      var todoToDelete = app.allTodos.filter(function (todo) {
        return todo._id == todoId;
      })[0];

      // DELETE request to delete todo
      $.ajax({
        type: 'DELETE',
        url: app.baseUrl + '/' + todoId,
        success: function onDeleteSuccess(json) {
          // remove deleted todo from all todos
          app.allTodos.splice(app.allTodos.indexOf(todoToDelete), 1);
          // render all todos to view
          app.render();
        }
      });
    });
});