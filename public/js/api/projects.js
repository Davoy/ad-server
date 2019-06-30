
$(()=>{
    getProjects();
});

function onCreateProject(){
    let html = `
        <div class="container-fluid">
            <div class="form-group text-left">
                <label for="projectsImage">Image</label>
                <input type="text" name="projectsImage" class="form-control form-control-sm" placeholder="Comma seperated list of image urls">
            </div>
            <div class="form-group text-left">
                <label for="projectTitle">Title</label>
                <input type="text" name="projectTitle" class="form-control form-control-sm" placeholder="Title of the project">
            </div>
            <div class="form-group text-left">
                <label for="projectDate">Date</label>
                <input type="text" name="projectDate" class="form-control form-control-sm" placeholder="(MM/DD/YYY)">
            </div>
            <div class="form-group text-left">
                <label for="projectTag">Tag</label>
                <input type="text" name="projectTag" class="form-control form-control-sm" placeholder="Single word tag for project (catagory/type)">
            </div>
            <div class="form-group text-left">
                <label for="projectDescription">Description</label>
                <input type="text" name="projectDescription" class="form-control form-control-sm" placeholder="Description of the project">
            </div>
            <div class="form-group text-left">
                <label for="projectVideoLink">Video Link</label>
                <input type="text" name="projectVideoLink" class="form-control form-control-sm" placeholder="Video link to projevct if available">
            </div>
        </div>
    `;
    Swal.fire({
        title: 'ADD Project',
        html: html,
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/projects',{
                    images: $('input[name=projectsImage]').val(),
                    title: $('input[name=projectTitle]').val(),
                    date: $('input[name=projectDate]').val(),
                    tag: $('input[name=projectTag]').val(),
                    description: $('input[name=projectDescription]').val(),
                    videoLink: $('input[name=projectVideoLink]').val()
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
            getProjects();
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}

function onUpdateProject(id){
    $.post('/api/projects/'+id+'?_method=PUT', {
        images: $('input[name=projectsImage-'+id+']').val(),
        title: $('input[name=projectTitle-'+id+']').val(),
        date: $('input[name=projectDate-'+id+']').val(),
        tag: $('input[name=projectTag-'+id+']').val(),
        description: $('input[name=projectDescription-'+id+']').val(),
        videoLink: $('input[name=projectVideoLink-'+id+']').val()
    },(response)=>{
        getProjects();
    });
}

function onDeleteProject(id){
    Swal.fire({
        title: 'Delete Project',
        text: 'This action can not be reversed',
        showCancelButton: true,
        confirmButtonText: 'delete',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/projects/'+id+'?_method=DELETE', (response)=>{
                    res(response);
                });
            }).then((response)=>{
                return response.doc;
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.value) {
            getProjects();
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}

function getProjects(){
    $.get('/projects', (response)=>{
        let html = '';
        response.docs.forEach((doc)=>{
            html += `
                <div class="row">
                    <div class="col-md-6 px-1">
                        <div class="form-group text-left">
                            <label for="projectsImage">Image</label>
                            <input type="text" name="projectsImage-${doc._id}" class="form-control form-control-sm" placeholder="Comma seperated list of image urls" value="${doc.images}">
                        </div>
                    </div>
                    <div class="col-md-6 px-1">
                        <div class="form-group text-left">
                            <label for="projectTitle">Title</label>
                            <input type="text" name="projectTitle-${doc._id}" class="form-control form-control-sm" placeholder="Title of the project" value="${doc.title}">
                        </div>
                    </div>
                    <div class="col-md-6 px-1">
                        <div class="form-group text-left">
                            <label for="projectDate">Date</label>
                            <input type="text" name="projectDate-${doc._id}" class="form-control form-control-sm" placeholder="When the project was started if in progress, otherwise completed. (MM/DD/YYY)" value="${new Date(doc.date)}">
                        </div>
                    </div>
                    <div class="col-md-6 px-1">
                        <div class="form-group text-left">
                            <label for="projectTag">Tag</label>
                            <input type="text" name="projectTag-${doc._id}" class="form-control form-control-sm" placeholder="Single word tag for project (catagory/type)" value="${doc.tag}">
                        </div>
                    </div>
                    <div class="col-md-6 px-1">
                        <div class="form-group text-left">
                            <label for="projectDescription">Description</label>
                            <input type="text" name="projectDescription-${doc._id}" class="form-control form-control-sm" placeholder="Description of the project" value="${doc.description}">
                        </div>
                    </div>
                    <div class="col-md-6 px-1">
                        <div class="form-group text-left">
                            <label for="projectVideoLink">Video Link</label>
                            <input type="text" name="projectVideoLink-${doc._id}" class="form-control form-control-sm" placeholder="Video link to projevct if available" value="${doc.videoLink}">
                        </div>
                    </div>
                    <div class="col-12 text-left">
                        <button class="btn btn-success btn-sm" onclick="onUpdateProject('${doc._id}')">
                            <span class="onSubmitted">Update</span>
                            <span class="d-none onSubmitted"><i class="fa fa-check-circle" aria-hidden="true"></i></span>    
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="onDeleteProject('${doc._id}')">Delete</button>
                    </div>
                </div>
            `;
        });
        $('.projectsInsert').html(html);
    });
}
