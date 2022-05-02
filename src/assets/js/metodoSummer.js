function metodoSummer(){
    $('#summernote').summernote({
        placeholder: '',
        tabsize: 5,
        height: 100,
        toolbar:[
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']]
        ]
    });
}

function metodoSummer2(){
    $('#summernote2').summernote({
        placeholder: '',
        tabsize: 5,
        height: 100,
        toolbar: [
            ['insert', ['picture']]
        ]
    });
}