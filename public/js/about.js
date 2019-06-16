$(()=>{
    $.get('/api/about', (response)=>{
        $('input[name=aboutImage]').val(response.doc.image);
        $('input[name=aboutName]').val(response.doc.name);
        $('input[name=aboutProfession]').val(response.doc.profession);
        $('input[name=aboutEmail]').val(response.doc.email);
        $('input[name=aboutPhone]').val(response.doc.phone);
        $('input[name=aboutLocation]').val(response.doc.location);
        $('textarea[name=aboutBio]').val(response.doc.about);
        createSocialGroup(response.doc.socials);
        createSkillGroup(response.doc.skills);
    });

    $('.updateAbout').on('click', ()=>{
        $('.onSubmitted').toggleClass('d-none');
        $.post('/api/about?_method=PUT', {
            image: $('input[name=aboutImage]').val(),
            name: $('input[name=aboutName]').val(),
            profession: $('input[name=aboutProfession]').val(),
            email: $('input[name=aboutEmail]').val(),
            phone: $('input[name=aboutPhone]').val(),
            location: $('input[name=aboutLocation]').val(),
            about: $('textarea[name=aboutBio]').val()
        },(response)=>{
            setTimeout(()=>{
                $('.onSubmitted').toggleClass('d-none');
            }, 2000);
        });
    });
});

function addToArray(field){
    let html = `
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="field1">${field == 'socials' ? 'URL':'Title'}</label>
                        <input type="text" name="field1" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="field2">${field == 'socials' ? 'Social icon fontawesome 4.0+':'Year Started (YYYY)'}</label>
                        <input type="text" name="field2" class="form-control form-control-sm">
                    </div>
                </div>
            </div>
        </div>
    `;
    Swal.fire({
        title: 'ADD '+field.toUpperCase(),
        html: html,
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/about?_method=PUT&field='+field,{
                    field1: $('input[name=field1]').val(),
                    field2: $('input[name=field2]').val()
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
            if(field == 'socials'){
                createSocialGroup(result.value.socials);
            }else{
                createSkillGroup(result.value.skills);
            }
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
};

function createSocialGroup(socials){
    let html = '';
    socials.forEach((social)=>{
        html += `
            <div class="p-2" style="width:100px;">
                <a href="${social.url}"><i class="${social.icon} fa-3x mb-0"></i></a><br/>
                <i class="fa fa-trash bg-danger w-25 rounded text-center text-light" style="cursor:pointer;" aria-hidden="true" onclick="onDelete('${social._id}', 'socials')"></i>
                <i class="fa fa-pencil bg-info w-25 rounded text-center text-light" style="cursor:pointer;" aria-hidden="true" onclick="onEdit('${social._id}', '${social.url}', '${social.icon}', 'socials')"></i>
            </div>\n
        `;
    });
    $('.socialGroup').html(html);
}

function createSkillGroup(skills){
    let html = '';
    skills.forEach((skill)=>{
        html += `
            <div class="p-2">
                <p class="badge badge-primary mb-0 w-100">${skill.title +' - '+ skill.year}</p>
                <i class="fa fa-trash bg-danger w-25 rounded text-center text-light" style="cursor:pointer;" aria-hidden="true" onclick="onDelete('${skill._id}', 'skills')"></i>
                <i class="fa fa-pencil bg-info w-25 rounded text-center text-light" style="cursor:pointer;" aria-hidden="true" onclick="onEdit('${skill._id}', '${skill.title}', '${skill.year}', 'skills')"></i>
            </div>\n
        `;
    });
    $('.skillGroup').html(html);
}

function onEdit(id, val1, val2, field){
    let html = `
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="updateField1">${field == 'socials' ? 'URL':'Title'}</label>
                        <input type="text" name="updateField1" class="form-control form-control-sm" value="${val1}">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="updateField2">${field == 'socials' ? 'Social icon fontawesome 4.0+':'Year'}</label>
                        <input type="text" name="updateField2" class="form-control form-control-sm" value="${val2}">
                    </div>
                </div>
            </div>
        </div>
    `;
    Swal.fire({
        title: 'Update '+field,
        html: html,
        showCancelButton: true,
        confirmButtonText: 'Update',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/about/update?_method=PUT&field='+field,{
                    field1: $('input[name=updateField1]').val(),
                    field2: $('input[name=updateField2]').val(),
                    id: id
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
            if(field == 'socials'){
                createSocialGroup(result.value.socials);
            }else{
                createSkillGroup(result.value.skills);
            }
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}

function onDelete(id, field){
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action can not be reversed',
        showCancelButton: true,
        confirmButtonText: 'delete',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((res, rej)=>{
                $.post('/api/about/delete?_method=DELETE&field='+field,{
                    id: id,
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
            if(field == 'socials'){
                createSocialGroup(result.value.socials);
            }else{
                createSkillGroup(result.value.skills);
            }
            Swal.fire({
                title: `SUCCESS!`
            });
        }
    });
}