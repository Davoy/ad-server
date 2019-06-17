$(()=>{
    getCounters();
});

function getCounters(){
    $.get('/api/counters', (response)=>{
        let html = '';
        response.docs.forEach((doc)=>{
            html += `
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-12 px-1">
                            <div class="form-group text-left">
                                <label for="countersTitle-${doc._id}">Title</label>
                                <input type="text" name="countersTitle-${doc._id}" class="form-control form-control-sm" placeholder="Title of counter" value="${doc.title}">
                            </div>
                        </div>
                        <div class="col-12 px-1">
                            <div class="form-group text-left">
                                <label for="countersCount-${doc._id}">Count</label>
                                <input type="text" name="countersCount-${doc._id}" class="form-control form-control-sm" placeholder="Number or Total Count" value="${doc.count}">
                            </div>
                        </div>
                        <div class="col-12 px-1">
                            <div class="form-group text-left">
                                <label for="countersIcon-${doc._id}">Icon</label> - <i class="${doc.icon}"></i>
                                <input type="text" name="countersIcon-${doc._id}" class="form-control form-control-sm" placeholder="Fontawesome 4.0 icon class" value="${doc.icon}">
                            </div>
                        </div>
                        <div class="col-12 text-left">
                            <button class="btn btn-success btn-sm" onclick="onUpdateCounter('${doc._id}')">
                                <span class="onSubmitted">Update</span>
                                <span class="d-none onSubmitted"><i class="fa fa-check-circle" aria-hidden="true"></i></span>    
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="onDeleteCounter('${doc._id}')">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        });
        $('.countersInsert').html(html);
    });
}

function onCreateCounter(){
    let html = `
        <div class="container-fluid">
            <div class="form-group text-left">
                <label for="countersTitle">Title</label>
                <input type="text" name="countersTitle" class="form-control form-control-sm" placeholder="Title of Counter">
            </div>
            <div class="form-group text-left">
                <label for="countersCount">Count</label>
                <input type="text" name="countersCount" class="form-control form-control-sm" placeholder="Number of records">
            </div>
            <div class="form-group text-left">
                <label for="countersIcon">Icon</label>
                <input type="text" name="countersIcon" class="form-control form-control-sm" placeholder="Font awesome icon class">
            </div>
        </div>
    `;
    Swal.fire({
        title: 'ADD Counter',
        html: html,
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/counters',{
                    title: $('input[name=countersTitle]').val(),
                    count: $('input[name=countersCount]').val(),
                    icon: $('input[name=countersIcon]').val()
                }, (response)=>{
                    res(response);
                });
            }).then((response)=>{
                return response.doc;
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.value) {
            getCounters();
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}

function onUpdateCounter(id){
    $.post('/api/counters/'+id+'?_method=PUT', {
        title: $('input[name=countersTitle-'+id+']').val(),
        count: $('input[name=countersCount-'+id+']').val(),
        icon: $('input[name=countersIcon-'+id+']').val()
    }, (response)=>{
        if(!response.error) getCounters();
    });
}

function onDeleteCounter(id){
    Swal.fire({
        title: 'Are You Sure?',
        text: 'this action can not be undone',
        showCancelButton: true,
        confirmButtonText: 'delete',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/counters/'+id+'?_method=DELETE', (response)=>{
                    res(response);
                });
            }).then((response)=>{
                return response.doc;
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.value) {
            getCounters();
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}
