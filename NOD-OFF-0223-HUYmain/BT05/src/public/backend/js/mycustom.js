
const changeStatus = (link) => {
    $.get(link,
        function (data, textStatus, jqXHR) {
            let { success, id, status } = data;
            if (data.success === true) {
                let parent = `#changeStatus-${id}`
                let classColor = "danger"
                let iconColor = "ban"
        
                if(status === "active"){
                    classColor = "success"
                    iconColor = "check"
                } 

                let link = `admin/category/change-status/${id}/${status}`

        
                let xhtmlStatus = `<a href="javascript:changeStatus('${link}')" class="rounded-circle btn btn-sm btn-${classColor}"><i class="fas fa-${iconColor}"></i></a>`
                
                // success notification
                // Shorthand for:
                // alertify.notify( message, 'success', [wait, callback]);
                alertify.success('Success');
                $(parent).html(xhtmlStatus);
            }
        },
        'json'
    );
}