var url = "http://localhost:3000/api/users"; // Asegúrate de que esta URL esté bien

// Función para hacer POST
// Función para hacer POST
function postUser() {
    console.log(url);  // Verifica que esta URL sea la correcta

    var myName = $('#name').val();
    var myEmail = $('#email').val();
    var myAge = $('#age').val();
    var myComments = $('#comments').val();

    var myuser = {
        name: myName,
        email: myEmail,
        age: myAge,
        comments: myComments
    };
    console.log(myuser);

    $.ajax({
        url: url,
        type: 'POST',  // Asegúrate de que el tipo de solicitud sea 'POST'
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            $('#resultado').html(JSON.stringify(data.user));
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            $('#resultado').html('Error al crear el usuario: ' + error); // Mostrar el error al usuario
        },
        data: JSON.stringify(myuser)  // Enviar los datos como JSON
    });
}

// Función para hacer GET
function getUsers() {
    console.log(url);

    $.getJSON(url, function (json) {
        console.log(json);

        var arrUsers = json.users;

        var htmlTableUsers = '<table border="1">';
        htmlTableUsers += '<tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Comments</th></tr>';

        arrUsers.forEach(function (item) {
            console.log(item);
            htmlTableUsers += '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.email + '</td>' +
                '<td>' + item.age + '</td>' +
                '<td>' + item.comments + '</td>' +
                '</tr>';
        });

        htmlTableUsers += '</table>';
        $('#userTable').html(htmlTableUsers);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { // Agregar manejo de errores
        console.error('Error en getUsers:', textStatus, errorThrown);
        $('#userTable').html('Error al obtener los usuarios');
    });
}
