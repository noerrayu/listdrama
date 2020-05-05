// mengambil data pada postman
$.ajax({
    url: 'https://fullstack-book.ariefdfaltah.com/book/list?key=ayu',
    type: 'get',
    dataType: 'json',
    data: {
        'd': $('#daftar-drama').val()
    },

    success: function (result) {
        let drama = result.data;
        // melakukan looping terhadap objek
        $.each(drama, function (i, data) {
            $('#daftar-drama').append('<tr><td class="id">' + data.id + '</td><td>' + data.title + '</td><td>' + data.category + '</td><td>' + data.description + '</td><td><button type="button" id="delete" class="btn btn-danger">Delete</button></td></tr>')
        });
    }
});

// menambahkan data drama baru ke postman
$('#postForm').on('submit', function (event) {
    event.preventDefault();

    var judul = $("#judul-drama");
    var deskripsi = $("#deskripsi-drama");
    var kategori = $("#kategori-drama");

    $.ajax({
        url: 'https://fullstack-book.ariefdfaltah.com/book/create?key=ayu',
        type: 'post',
        contentType: 'application/json',
        // mengubah objek javascript menjadi string JSON
        data: JSON.stringify({
            title: judul.val(),
            description: deskripsi.val(),
            category: kategori.val()
        }),
        success: function (response) {
            console.log(response);
            alert("Penambahan Sukses!")
            judul.val('');
            deskripsi.val('');
            kategori.val('');

        }
    })
});

// menghapus data
$('table').on('click', '#delete', function () {
    var baris = $(this).closest('tr');
    var id = baris.find('.id').text();

    $.ajax({
        url: 'https://fullstack-book.ariefdfaltah.com/book/delete/' + id + '?' + 'key=ayu',
        type: 'get',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    })
})