$(()=>{
    getTestimonials();
});

function getTestimonials(){
    let html = '';
    $.get('/api/testimonials', (response)=>{
        response.docs.forEach((doc)=>{
            html += `
                <div class="col-md-6 p-2 border rounded border-dark">
                    <div class="form-group text-left">
                        <label for="testimonialImage">Image</label>
                        <img src="${doc.image}" class="img img-responsive thumbnail">
                        <input type="text" name="testimonialImage-${doc._id}" class="form-control form-control-sm" placeholder="Image URL" value="${doc.image}">
                    </div>
                    <div class="form-group text-left">
                        <label for="testimonialName">Name</label>
                        <input name="testimonialName-${doc._id}" class="form-control form-control-sm" placeholder="Name of person" value="${doc.name}">
                    </div>
                    <div class="form-group text-left">
                        <label for="testimonialMessage">Message</label>
                        <textarea type="text" name="testimonialMessage-${doc._id}" class="form-control form-control-sm" placeholder="Message of testimonial">${doc.message}</textarea>
                    </div>
                    <button class="btn btn-sm btn-block btn-success" onclick="updateTestimonial('${doc._id}')">
                        <span class="onSubmitted">Update</span>
                        <span class="d-none onSubmitted"><i class="fa fa-check-circle" aria-hidden="true"></i></span>
                    </button>
                    <button class="btn btn-sm btn-block btn-danger" onclick="deleteTestimonial('${doc._id}')">Delete</button>
                </div>\n
            `;
        });
        $('.testimonialInjection').html(html);
    });
}

function addTestimonial(){
    let html =  `
        <div class="col-12 p-2">
            <div class="form-group text-left">
                <label for="newTestimonialImage">Image</label>
                <input type="text" name="newTestimonialImage" class="form-control form-control-sm" placeholder="Image URL">
            </div>
            <div class="form-group text-left">
                <label for="newTestimonialName">Name</label>
                <input name="newTestimonialName" class="form-control form-control-sm" placeholder="Name of person">
            </div>
            <div class="form-group text-left">
                <label for="newTestimonialMessage">Message</label>
                <textarea type="text" name="newTestimonialMessage" class="form-control form-control-sm" placeholder="Message of testimonial"></textarea>
            </div>
        </div>
    `;
    Swal.fire({
        title: 'ADD Testimonial',
        html: html,
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/testimonials',{
                    image: $('input[name=newTestimonialImage]').val(),
                    name: $('input[name=newTestimonialName]').val(),
                    message: $('textarea[name=newTestimonialMessage]').val()
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
            getTestimonials();
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}

function updateTestimonial(id){
    $.post('/api/testimonials/'+id+'?_method=PUT', {
        image: $(`input[name=testimonialImage-${id}]`).val(),
        name: $(`input[name=testimonialName-${id}]`).val(),
        message: $(`textarea[name=testimonialMessage-${id}]`).val()
    }, (response)=>{
        getTestimonials();
    });
}

function deleteTestimonial(id){
    Swal.fire({
        title: 'Are You Sure?',
        text: 'This action can not be reversed',
        showCancelButton: true,
        confirmButtonText: 'delete',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post(`/api/testimonials/${id}?_method=DELETE`, (response)=>{
                    res(response);
                });
            }).then((response)=>{
                return response.doc;
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.value) {
            getTestimonials();
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}