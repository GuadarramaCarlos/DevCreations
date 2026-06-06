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
            window.location.href = "pages/principal.html";
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

    window.location.href = "../index.html";
}

if (
    !localStorage.getItem("usuario") &&
    window.location.pathname.includes("principal.html")
) {
    window.location.href = "../index.html";
}

const btnCerrar = document.getElementById("btnCerrarSesion");

if (btnCerrar) {
    btnCerrar.onclick = cerrarSesion;
}