console.log('The file is loaded');
$(document).ready(function() {
    $('.delete-employee').on('click', function(e) {
        e.preventDefault();
        $target = $(e.target);
        const id = $target.attr('data-id');
        console.log('The button ' + id + ' is clicked !');
        
        if(confirm("Voulez-vous réellement supprimer cet employé ? ")) {
            $.ajax({
                type:'DELETE',
                url:'/employee/'+id,
                success: function(response) {
                    window.location.href='/employees';
                    //return false;
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }
    });
});