import swal from 'sweetalert';

export const confirmDialog=(title,text)=>{
    swal({
        title: title,
        text: text,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          return true;
        } else {
          return false;
        }
      });
}

export const successDialog = (text)=>{
    swal(text, {
        icon: "success",
      });
}

export const errorDialog = (text)=>{
    swal(text, {
        icon: "error",
      });
}