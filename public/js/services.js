$(()=>{
    getServices();
});

function getServices(){
    $.get('/api/services', (response)=>{
        let html = '';
        response.docs.forEach((doc)=>{
            html += `
                <div class="col-md-6 p-2 border rounded border-dark">
                    <div class="form-group text-left">
                        <label for="serviceTitle">Title</label>
                        <input type="text" name="serviceTitle-${doc._id}" class="form-control form-control-sm" placeholder="Title of service" value="${doc.title}">
                    </div>
                    <div class="form-group text-left">
                        <label for="serviceDescription">Description</label>
                        <textarea name="serviceDescription-${doc._id}" class="form-control form-control-sm" placeholder="Description of service">${doc.description}</textarea>
                    </div>
                    <div class="form-group text-left">
                        <label for="serviceIcon">Icon</label> - <i class="${doc.icon}"></i>
                        <input type="text" name="serviceIcon-${doc._id}" class="form-control form-control-sm" placeholder="Icon of service" value="${doc.icon}">
                    </div>
                    <button class="btn btn-sm btn-block btn-success" onclick="updateService('${doc._id}')">
                        <span class="onSubmitted">Update</span>
                        <span class="d-none onSubmitted"><i class="fa fa-check-circle" aria-hidden="true"></i></span>
                    </button>
                    <button class="btn btn-sm btn-block btn-danger" onclick="deleteService('${doc._id}')">Delete</button>
                </div>\n
            `;
        });
        $('.servicesInjection').html(html);
    });
}

function addService(){
    let html = `
        <div class="col-12 px-1">
            <div class="form-group text-left">
                <label for="serviceTitle">Title</label>
                <input type="text" name="serviceTitle" class="form-control form-control-sm" placeholder="Title of service">
            </div>
            <div class="form-group text-left">
                <label for="serviceDescription">Description</label>
                <textarea name="serviceDescription" class="form-control form-control-sm" placeholder="Description of service"></textarea>
            </div>
            <div class="form-group text-left">
                <label for="serviceIcon">Icon</label>
                <input type="text" name="serviceIcon" class="form-control form-control-sm" placeholder="Icon of service">
            </div>
        </div>\n
    `;
    Swal.fire({
        title: 'ADD Service',
        html: html,
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/services/create',{
                    title: $('input[name=serviceTitle]').val(),
                    description: $('textarea[name=serviceDescription]').val(),
                    icon: $('input[name=serviceIcon]').val()
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
            getServices();
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}

function updateService(id){
    $.post('/api/services/'+id+'?_method=PUT', {
        title: $(`input[name=serviceTitle-${id}]`).val(),
        description: $(`textarea[name=serviceDescription-${id}]`).val(),
        icon: $(`input[name=serviceIcon-${id}]`).val()
    }, (response)=>{
        getServices();
    });
}

function deleteService(id){
    Swal.fire({
        title: 'Are You Sure?',
        text: 'This action can not be reversed',
        showCancelButton: true,
        confirmButtonText: 'delete',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post(`/api/services/${id}?_method=DELETE`, (response)=>{
                    res(response);
                });
            }).then((response)=>{
                return response.doc;
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.value) {
            getServices();
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}

