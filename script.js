function buscarPersonaje() {
    const nombre = document.getElementById('input').value;

    if (nombre.trim() === '') {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.style.display = 'block';
        resultadoDiv.style.padding = '10px';
        resultadoDiv.style.width = '100%';
        resultadoDiv.style.height = 'auto';
        resultadoDiv.innerHTML = `<p>Por favor, introduce un nombre para buscar.</p>`;
        return;
    }

    axios.get(`https://rickandmortyapi.com/api/character/?name=${nombre}`)
        .then(response => {
            const personajes = response.data.results;
            if (personajes.length > 0) {
                const personaje = personajes[0];
                const resultadoDiv = document.getElementById('resultado');
                resultadoDiv.style.display = 'block';
                resultadoDiv.style.width = '100%';
                resultadoDiv.innerHTML = `
                    <h2>${personaje.name}</h2>
                    <img src="${personaje.image}" alt="${personaje.name}" style="width: 100%; max-width: 300px;">
                    <p>Género: ${personaje.gender}</p>
                    <p>Especie: ${personaje.species}</p>
                    <p>Origen: ${personaje.origin.name}</p>
                    <p>Última ubicación: ${personaje.location.name}</p>
                `;
            } else {
                const resultadoDiv = document.getElementById('resultado');
                resultadoDiv.style.display = 'block';
                resultadoDiv.style.padding = '10px';
                resultadoDiv.style.width = '100%';
                resultadoDiv.style.height = 'auto';
                resultadoDiv.innerHTML = `<p>No se encontró ningún personaje con el nombre "${nombre}".</p>`;
            }
        })
        .catch(error => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.style.display = 'block';
            resultadoDiv.style.padding = '10px';
            resultadoDiv.style.width = '100%';
            resultadoDiv.style.height = 'auto';
            resultadoDiv.innerHTML = `<p>Error al realizar la búsqueda: ${error.message}</p>`;
        });
}

function manejarTeclado(event) {
    if (event.keyCode === 13) {
        buscarPersonaje();
    }
}

document.addEventListener('keydown', manejarTeclado);
