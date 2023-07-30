const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
    {
        //buat note
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        //tampilkan semua note
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        //tampilkan sebuah note
        method:'GET',
        path:`/notes/{id}`,
        handler: getNoteByIdHandler,
    },
    {
        //ubah note
        method:'PUT',
        path:'/notes/{id}',
        handler:editNoteByIdHandler,
    },
    {
        //hapus catatan
        method:'DELETE',
        path:'/notes/{id}',
        handler:deleteNoteByIdHandler,
    }
  ];
   
module.exports = routes;