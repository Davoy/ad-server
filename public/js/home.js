$(()=>{
    $.get('/api/home', (response)=>{
        $('input[name=homeHeadline]').val(response.doc.headline);
        $('input[name=homeTypings]').val(response.doc.typings.join(', '));
    });
    $('.updateHome').on('click', ()=>{
        $.post('/api/home?_method=PUT', {
            headline: $('input[name=homeHeadline]').val(),
            typings:  $('input[name=homeTypings]').val().split(/\s*,\s*/g)
        },(response)=>{
            $('input[name=homeHeadline]').val(response.doc.headline);
            $('input[name=homeTypings]').val(response.doc.typings.join(', '));
        });
    });
});
