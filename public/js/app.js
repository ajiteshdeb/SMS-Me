

  // DOM
  var numberField = document.querySelector('input[name=number]');
  var textField = document.querySelector('input[name=text]');
  var button = document.querySelector('input[type=button]');
  var msg = document.querySelector('.response');

  
  // UI Events
  textField.addEventListener('keyup', function(e) {
    (e.keyCode || e.charCode) === 13 && send()
  }, false);
  button.addEventListener('click', send, false);

  function send() {
  var number = '+91'+ numberField.value.replace(/\D/g,''); 
  var text = textField.value;

  localStorage.setItem('number', number);

        if(!self.fetch) {
        alert("Bummer, your browser doesn't support Fetch API!");
        return;
        // Ideally, use XHR as the fallback for fetch.
        }
 


  fetch('/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: number,
        text: text
      })
    }).then(function(response) {
      if(response.status !== 200) {
        displayStatus(statusText, notification);
      }
      textField.value = '';
    }).catch(function(e) {
      displayStatus(e, notification);
  })     

 }   



