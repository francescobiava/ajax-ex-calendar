$(document).ready(function () {
  
  var month = 11; //setto di base il primo da visualizzare
  getDays(month);
  prevMonth(month);
  nextMonth(month);
  
});

// FUNCTIONS
// funzione al click di precedente
function prevMonth(selectedMonth) {
  $('#select-month .prev').click(function() {
    // scalo di uno il mese
    selectedMonth = selectedMonth - 1;
    getDays(selectedMonth);
  });
}

// funzione al click di seguente
function nextMonth(selectedMonth) {
  $('#select-month .next').click(function() {
    // aumento di uno il mese
    selectedMonth = selectedMonth + 1;
    getDays(selectedMonth);
  })
}

// funzione per stampare i giorni del mese che gli passo
function getDays(selectedMonth) {
  // cancello il mese già presente
  $('#calendar ul').html('');
  // in base al numero del mese scrivo in pagina il giorno
  $('#select-month .month-name').text(moment(selectedMonth, 'M').format('MMMM'));
  // estraggo il numero di giorni del mese
  var days = moment("2018-" + selectedMonth, "YYYY-M").daysInMonth();
  // ciclo per tutti i giorni, appendo in pagina ogni giorno e aggiungo l'attributo per identificarlo
  for (var i = 1; i <= days; i++) {
    var date = moment('2018-' + selectedMonth + '-' + i, 'YYYY-M-D').format('YYYY-MM-DD');
    var day = moment(date).format('DD dddd');
    $('#calendar ul').append('<li data-day=' + date + '>' + day + '</li>');
  }
  // richiamo la funzione della chiamata ajax
  getHolidays(selectedMonth);
}

// funzione chiamata Ajax
function getHolidays(selectedMonth) {
  selectedMonth = selectedMonth - 1;
  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',
    data: {
      year: 2018,
      month: selectedMonth
    },
    success: function (data) {
      // recupero dalla chiamata le festività
      var holidays = data.response;
      // ciclo per ogni festività
      holidays.forEach(function(item) {
        // recupero la data e il nome
        var day = item.date;
        var holiday = item.name;
        // recupero il li con lo stesso attributo, gli assegno la classe per la festività e aggiungo il nome
        $('li[data-day=' + day + ']').addClass('holiday').append('<span> ' + holiday + '</span>');
      });
    }
  });
}