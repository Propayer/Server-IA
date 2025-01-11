// Esperamos a que el documento esté listo
document.addEventListener('DOMContentLoaded', function () {
    console.log('Documento cargado');
    // Referencia al botón de preguntar
    const askButton = document.getElementById('askButton');
    
    askButton.addEventListener('click', function () {
        const pregunta = document.getElementById('question').value;
        console.log('Pregunta enviada:', pregunta);
        
        if (!pregunta) {
            mostrarLog('Por favor, escribe una pregunta.');
            console.log('No se escribió ninguna pregunta');
            return;
        }
        preguntarIA(pregunta); // Llamamos la función con la pregunta
    });
});

async function preguntarIA(pregunta) {
    const apiKey = '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';  // Tu API key
    const apiUrl = 'https://api.groqcloud.com/v1/completions';

    mostrarLog('Iniciando solicitud a la API con la pregunta: ' + pregunta);
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'Llama-3.1-70B',
                prompt: pregunta,
                max_tokens: 200
            })
        });

        mostrarLog('Respuesta de la API recibida: ' + response.status);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}. No se pudo conectar con la API.`);
        }

        const data = await response.json();
        mostrarLog('Datos de la API: ' + JSON.stringify(data));
        
        // Mostrar la respuesta de la IA
        if (data && data.choices && data.choices.length > 0) {
            mostrarLog('Respuesta de la IA: ' + data.choices[0].text || 'No se recibió respuesta.');
        } else {
            mostrarLog('La IA no devolvió una respuesta válida.');
        }
    } catch (error) {
        // Mostrar error si ocurre alguno
        console.error('Error al hacer la solicitud:', error);
        mostrarLog(`Hubo un error al obtener la respuesta: ${error.message}`);
    }
}

// Función para mostrar los logs en el recuadro de la respuesta
function mostrarLog(mensaje) {
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = mensaje;  // Actualiza el contenido del recuadro con el log
}