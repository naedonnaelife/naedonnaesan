import Swal from 'sweetalert2'
import img from '../assets/garma.jpg'

type AlertProps = {
    title : string;
    content : string;
    icon : string;
}

const alert1 = (data :AlertProps) => {
    return Swal.fire(data.title)
}

export const alert2 = (data :AlertProps) => {
    return Swal.fire({
        title: data.title,
        text: data.content,
        icon: "info"
      });
}

export const alert3 = (data :AlertProps) => {
    return Swal.fire({
        title: data.title,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
}

export const alert4 = (data :AlertProps) => {
    return Swal.fire({
        title: data.title,
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url(${img})
          left top
          no-repeat
        `
      });
}

export default alert1