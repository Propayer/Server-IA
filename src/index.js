// Esperamos a que el documento esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Referencia al botón de enviar
    const sendButton = document.getElementById('sendButton');
    
    sendButton.addEventListener('click', function () {
        const pregunta = document.getElementById('question').value;
        if (!pregunta) {
            document.getElementById('response').innerText = 'Por favor, escribe una pregunta.';
            return;
        }
        preguntarIA(pregunta); // Llamamos la función con la pregunta
    });
});

async function preguntarIA(pregunta) {
    const apiKey = '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';  // Tu API key
    const apiUrl = 'https://api.groqcloud.com/v1/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'Llama-3.1-70B',  // Modelo GroqCloud
                prompt: pregunta,
                max_tokens: 200
            })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}. No se pudo conectar con la API.`);
        }

        const data = await response.json();
        
        // Mostrar la respuesta de la IA
        if (data && data.choices && data.choices.length > 0) {
            document.getElementById('response').innerText = data.choices[0].text || 'No se recibió respuesta.';
        } else {
            document.getElementById('response').innerText = 'La IA no devolvió una respuesta válida.';
        }
    } catch (error) {
        // Mostrar error si ocurre alguno
        document.getElementById('response').innerText = `Hubo un error al obtener la respuesta: ${error.message}`;
    }
}