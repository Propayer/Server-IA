// Esperamos a que el documento esté listo
document.addEventListener('DOMContentLoaded', function () {
    console.log('Documento cargado');
    // Referencia al botón de preguntar
    const askButton = document.getElementById('askButton');
    
    askButton.addEventListener('click', function () {
        const pregunta = document.getElementById('question').value;
        console.log('Pregunta enviada:', pregunta);
        
        if (!pregunta) {
            document.getElementById('response').innerText = 'Por favor, escribe una pregunta.';
            console.log('No se escribió ninguna pregunta');
            return;
        }
        preguntarIA(pregunta); // Llamamos la función con la pregunta
    });
});

async function preguntarIA(pregunta) {
    const apiKey = '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';  // Tu API key
    const apiUrl = 'https://api.groqcloud.com/v1/completions';

    console.log('Iniciando solicitud a la API con la pregunta:', pregunta);
    
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

        console.log('Respuesta de la API recibida:', response);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}. No se pudo conectar con la API.`);
        }

        const data = await response.json();
        console.log('Datos de la API:', data);
        
        // Mostrar la respuesta de la IA
        if (data && data.choices && data.choices.length > 0) {
            document.getElementById('response').innerText = data.choices[0].text || 'No se recibió respuesta.';
        } else {
            document.getElementById('response').innerText = 'La IA no devolvió una respuesta válida.';
        }
    } catch (error) {
        // Mostrar error si ocurre alguno
        console.error('Error al hacer la solicitud:', error);
        document.getElementById('response').innerText = `Hubo un error al obtener la respuesta: ${error.message}`;
    }
}