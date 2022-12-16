console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();


}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );

    // get user input and put in an object

    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $(`#nameIn`).val(),
      age: $(`#ageIn`).val(),
      gender: $(`#genderIn`).val(),
      readyForTransfer: $(`#readyForTransferIn`).val(),
      notes: $(`#notesIn`).val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
  // $(`body`).on(`click`, `#deleteBtn`, deleteKoala)
  $(`body`).on(`click`, `#transferBtn`, markAsReady)
}
function markAsReady(){
  let id = $(this).data().id;
  $.ajax({
      type: `PUT`,
      url: `/KOALA/${id}`,
      data: {
          isRead: '1'
      }
  }).then((response) => {

  }).catch((error) => {
  console.log(`ERROR in PUT`,error);
  })
}

function getKoalas() {
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koala'
  }).then((response) => {
    console.log(response);
    $(`#viewKoalas`).empty();
    for (let koala of response) {
      if (koala.ready_to_transfer === `Y`) {
        $(`#viewKoalas`).append(`
        <tr>
        <td>${koala.name}</td>
        <td>${koala.gender}</td>
        <td>${koala.age}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button data-id=${koala.id} class="deleteBtn">Delete</button></td>
        <td>Ready to transfer</td>
        </tr>
        `)
      } else {
        $(`#viewKoalas`).append(`
        <tr>
        <td>${koala.name}</td>
        <td>${koala.gender}</td>
        <td>${koala.age}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td><button data-id=${koala.id} class="deleteBtn">Delete</button></td>
        <td><button  data-id="${koala.id}" class="transferBtn">Mark as Ready</button></td></tr>
        `)
      }
      $(`#viewKoalas`).append(`

      `);
    };
  });
}; // end getKoalas


function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  $.ajax({
    method: `POST`,
    url: `/koala`,
    data: newKoala
  }).then ((response) => {
    console.log(response);
  }).catch((error) =>{
    console.log(`Error in saveKoala`, error);
  })
  getKoalas();
  // ajax call to server to get koalas
};
