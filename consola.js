window.onload = function() {
  var consola_form = document.getElementById('consola_form');
  var consola = document.getElementById('consola');
  var results_list = document.getElementById('results-list');
  var clean_results = document.getElementById('clean-results');

  var editor  = ace.edit('consola');
  editor.setTheme("ace/theme/tomorrow_night");
  editor.getSession().setMode("ace/mode/javascript");
  editor.getSession().setTabSize(2);
  editor.getSession().setUseSoftTabs(true);

  clean_results.onclick = function(e) {
    e.preventDefault();

    results_list.innerHTML = "";
  };

  consola_form.onsubmit = function(e) {
    e.preventDefault();

    var results = (new Function(editor.getValue()))();

    if(results instanceof Array) {
      var results_as_array = [], results_as_string = "";

      for(i in results) {
        results_as_array.push(results[i]);
      }

      results_as_string = "[" + results_as_array.join(', ') + "]";
    }
    else if(results instanceof Function) {
      results_as_string = results.name + ' : Function';
    }
    else if(results instanceof Date) {
      results_as_string = results;
    }
    else if(results instanceof Object) {
      var results_as_array = [], results_as_string = "";

      for(i in results) {
        results_as_array.push(i + ' : ' + results[i]);
      }

      results_as_string = "{" + results_as_array.join(', ') + "}";
    }
    else {
      results_as_string = results;
    }

    results_item = document.createElement('li');
    results_item.innerHTML = "<strong>></strong> " + results_as_string;

    console.log(results, results_as_string)

    results_list.appendChild(results_item);
  };
};