function sendData() {
    var judul = $("input#judul-drama").val();
    var deskripsi = $("input#deskripsi-drama").val();
    var kategori = $("input#kategori-drama").val();

    // array berisi semua data masukan
    var dataBaru = {
        "title": judul,
        "description": deskripsi,
        "category": kategori
    }

    // melakukan POST
    $.ajax({
        type: "POST",
        url: "https://fullstack-book.ariefdfaltah.com/book/create?key=ayu",
        data: {
            u_data: JSON.stringify(dataBaru)
        },
        cache: false,
        success: function (svr_resp) {
            if (svr_resp == '1') {
                alert("Data successfully captured on the server.");
                //you may do more things here, depending on your needs...
            } else {
                alert("Error: Data not captured on the server.");
                //you may do more things here, depending on your needs...
            }
        }
    });
}

// // menambahkan data pada drama list 
// $('#submit-form').on('click', function () {

//     // var $judul = $('#judul-drama');
//     // var $kategori = $('#kategori-drama');
//     // var $deskripsi = $('#deskripsi-drama');



//     // let judulDrama = $('#judul-drama').val();
//     // let katDrama = $('#kategori-drama').val();
//     // let desDrama = $('#deskripsi-drama').val();
//     // "title:" + judulDrama + "&description:" + desDrama + "&category:" + katDrama,


//     $.ajax({
//         url: 'https://fullstack-book.ariefdfaltah.com/book/create?key=ayu',
//         type: 'post',
//         data: $('#form').serialize(),
//         dataType: 'json',
//         beforeSend: function () {
//             //lakukan apasaja sambil menunggu proses selesai disini
//             //misal tampilkan loading

//             $(".loading").html("Please wait....");

//         },
//         success: function (result) {
//             if (result.status) {
//                 alert("Selamat, form sukses");
//             } else {
//                 alert("isi semua");
//             }
//         },
//         error: function (xhr, Status, err) {
//             $("Terjadi error : " + Status);
//         }
//     });


// })

// function sendData() {
//     var xhr = new XMLHttpRequest();
//     var url = "https://fullstack-book.ariefdfaltah.com/book/create?key=ayu";

//     var data = JSON.stringify({
//         title: document.getElementById("judul-drama").value,
//         description: document.getElementById("deskripsi-drama").value,
//         category: document.getElementById("deskripsi-drama").value
//     });

//     xhr.open("POST", url, true);
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhr.onload = function () {
//         console.log(this.responseText);
//     }

//     xhr.send(data);

// }
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
        data: JSON.stringify({
            title: judul.val(),
            description: deskripsi.val(),
            category: kategori.val()
        }),
        success: function (response) {
            console.log(response);
            $('#popup').append('<h2>Title Popup</h2>' + '<p>consequat.</p>');
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
        url: 'http://fullstack-book.ariefdfaltah.com/book/delete/' + id + '?' + 'key=ayu',
        type: 'get',
        data: id,
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    })
})