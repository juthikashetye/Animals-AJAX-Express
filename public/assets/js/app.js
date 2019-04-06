$('#insert_animal').submit(function(e) {

  e.preventDefault(); // avoid to execute the actual submit of the form.
  var cn = $("#insert_animal input[name='animal_name']").val();

  $.ajax({
    url: '/animals-insert',
    method: 'POST',
    data: {
      animal_name: cn
    }
  }).then(function(message) {
    getAnimals();
  });

});

function getAnimals() {
  $('div').empty();

  $.ajax({
    url: '/animals.json',
    method: 'GET'
  }).then(function(animals) {
    for (var animalIndex in animals) {

      var p = $('<p>');

      p.text(`ID: ${animals[animalIndex].id}, Animal name: ${animals[animalIndex].animal_name}`)

      $('div').prepend(p);
    }
  })
}