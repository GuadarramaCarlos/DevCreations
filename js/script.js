async function entrar() {
    let usuario = document.getElementById('usuarioInput').value;
    let password = document.getElementById('passInput').value;

    let mensaje = document.getElementById('mensajeFeedback');

    const { data, error } = await db
        .from('usuario')
        .select('*')
        .eq('correo', usuario)
        .eq('password', password)
        .single();

    if (data) {
        localStorage.setItem("usuario", data.nombre);
        localStorage.setItem("rol", data.id_rol);

        mensaje.innerHTML = "¡Bienvenido " + data.nombre + "!";
        mensaje.style.color = "green";
        mensaje.style.backgroundColor = "#eaffea";
        mensaje.style.border = "1px solid green";

        setTimeout(() => {
            // CAMBIO AQUÍ: Ahora redirige a landing_admin.html
            window.location.href = "pages/landing_admin.html";
        }, 1000);

    } else {
        mensaje.innerHTML = "Error: Usuario o contraseña equivocados";
        mensaje.style.color = "red";
        mensaje.style.backgroundColor = "#ffeaea";
        mensaje.style.border = "1px solid red";
        mensaje.style.padding = "5px";
    }
}

const btnIngresar = document.getElementById('btnIngresar');

if (btnIngresar) {
    btnIngresar.onclick = entrar;
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");

    // Redirige al login principal
    window.location.href = "../index.html";
}

// CAMBIO AQUÍ: Actualizamos la protección de ruta para landing_admin.html
if (
    !localStorage.getItem("usuario") &&
    window.location.pathname.includes("landing_admin.html")
) {
    window.location.href = "../index.html";
}

const btnCerrar = document.getElementById("btnCerrarSesion");

if (btnCerrar) {
    btnCerrar.onclick = cerrarSesion;
}