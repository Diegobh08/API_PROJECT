document.addEventListener("DOMContentLoaded", () => {

    const URLGOV  = 'https://www.datos.gov.co/resource/wy5g-wxbb.json?$query=SELECT nro, tipo_de_proyecto, c_digo_del_proyecto, proyecto_de_investigaci_n, unidad_academica';

    const contenedor = document.getElementById("contenedor");
    const resultados = document.getElementById("resultados");


    const selectTipo = document.createElement("select");

    const op1 = document.createElement("option");
    op1.value = "1";
    op1.textContent = "COFINANCIADO";

    const op2 = document.createElement("option");
    op2.value = "2";
    op2.textContent = "Interno";

    selectTipo.appendChild(op1);
    selectTipo.appendChild(op2);

    // 🔹 SELECT 2 (facultades)
    const selectFacultad = document.createElement("select");

    const facultades = [
        "FACULTAD DE CIENCIA Y TECNOLOGÍA",
        "FACULTAD DE EDUCACIÓN",
        "FACULTAD DE HUMANIDADES",
        "FACULTAD DE BELLAS ARTES",
        "DOCTORADO INTERINSTITUCIONAL EN EDUCACIÓN",
        "CENTRO REGIONAL VALLE DE TENZA",
        "INSTITUTO PEDAGOGICO NACIONAL",
        "FACULTAD DE EDUCACIÓN FÍSICA"
    ];

    facultades.forEach((fac, index) => {
        const opcion = document.createElement("option");
        opcion.value = index;
        opcion.textContent = fac;
        selectFacultad.appendChild(opcion);
    });

    // agregar selects al HTML
    contenedor.appendChild(selectTipo);
    contenedor.appendChild(document.createElement("br"));
    contenedor.appendChild(selectFacultad);




    function limpiar(texto) {
        return texto
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
            .toUpperCase()
    }
    // 🔍 HACER LA FUNCIÓN GLOBAL (IMPORTANTE)
    window.nameMun = function() {



        const tipo = selectTipo.value;
        const facultad = selectFacultad.options[selectFacultad.selectedIndex].text;

        const tipoTexto = tipo == "1" ? "COFINANCIADO" : "INTERNO";

        resultados.innerHTML = "<p>Cargando...</p>";

        fetch(URLGOV)
            .then(res => res.json())
            .then(data => {

                resultados.innerHTML = "";

                let encontrado = false;

                data.forEach(proyecto => {
                    const tipoAPI = limpiar(proyecto.tipo_de_proyecto)
                    const unidadAPI = limpiar(proyecto.unidad_academica)

                    const tipoUser = limpiar(tipoTexto)
                    const unidadUser = limpiar(facultad)
                    if (
                        tipoAPI === tipoUser && unidadAPI === unidadUser
                    ) {
                        encontrado = true;

                        const div = document.createElement("div");

                        div.innerHTML = `
                            <h3>${proyecto.proyecto_de_investigaci_n}</h3>
                            <p><strong>Tipo:</strong> ${proyecto.tipo_de_proyecto}</p>
                            <p><strong>Facultad:</strong> ${proyecto.unidad_academica}</p>
                            <hr>
                        `;

                        resultados.appendChild(div);
                    }

                });

                if (!encontrado) {
                    resultados.innerHTML = "<p>No se encontraron proyectos</p>";
                }

            })
            .catch(error => {
                resultados.innerHTML = "<p>Error cargando datos</p>";
                console.error(error);
            });
    };

});