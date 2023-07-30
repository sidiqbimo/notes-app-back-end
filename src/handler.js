//import package
const {nanoid}=require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    //received from client
    const {title, tags, body}=request.payload;

    //created by server
    const id = nanoid(16); //generate ID
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    //pushing metadatas
    const newNote={
        title,tags,body,id,createdAt,updatedAt
    }
    notes.push(newNote);

    //check if newNote sudah masuk ke array notes dengan filter()
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess){
        const response = h.response({
            status:'success',
            message:'Catatan mari ditambahke',
            data:{
                noteId:id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler=()=>({
    status:'success',
    data:{
        notes,
    },
});

const getNoteByIdHandler=(request,h)=>{
    //dapatkan dulu nilai id dari request.params
    const {id}=request.params;
    
    //mendapatkan objeknya
    const note=notes.filter((n)=>n.id===id)[0];

    //Bila objek "note" undefined, kembalikan dengan respons gagal.
    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note,
          },
        };
      }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;
}

const editNoteByIdHandler=(request,h)=>{
    //dapatkan dulu nilai id dari request.params
    const {id}=request.params;

    //dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.
    const {title,tags,body}=request.payload;

    //perbarui nilai 'updatedAt'
    const updatedAt= new Date().toISOString();

    //ubah catatan lama dengan baru menggunakan indexing array
    //Bila note dengan id yang dicari ditemukan, maka index akan bernilai array index dari objek catatan yang dicari. Namun bila tidak ditemukan, maka index bernilai -1 --> pakai if-else
    const index=notes.findIndex((note)=>note.id===id);
    if (index !== -1) {
        notes[index] = { //ubah isi notes
          ...notes[index],
          title,
          tags,
          body,
          updatedAt,
            };

        const response=h.response({
            status:'success',
            message:'note anyar mari kesimpen',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
          });
        response.code(404);
        return response;

}

const deleteNoteByIdHandler = (request,h) => {
    //dapatkan dulu nilai id yang dikirim melalui path parameters.
    const {id}=request.params;

    //dapatkan index catatan sesuai id
    const index=notes.findIndex((note)=>note.id===id);
    if (index !== -1) {
        //hapus isi notes
        notes.splice(index,1); //splice lets you change the content of your array by removing or replacing existing elements with new ones.
        const response=h.response({
            status:'success',
            message:'kenanganmu wis ilang',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'kenanganmu gak iso ilang, gamon teros',
          });
        response.code(404);
        return response;
}

module.exports={addNoteHandler,getAllNotesHandler,getNoteByIdHandler,editNoteByIdHandler,deleteNoteByIdHandler};