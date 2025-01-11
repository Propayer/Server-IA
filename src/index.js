// Importamos 'node-fetch' para hacer solicitudes HTTP
const fetch = require('node-fetch');

// Coloca tu API key directamente aquí
const apiKey = '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';

// URL de la API de GroqCloud para el modelo Llama 3.1 70B
const apiUrl = 'https://api.groqcloud.com/v1/completions';

// Función para hacer la solicitud al modelo Llama 3.1 70B
async function obtenerDatosIA() {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'Llama-3.1-70B',  // Especificamos el modelo Llama 3.1 70B
                prompt: 'Tu texto o consulta aquí',  // Aquí iría el prompt que quieras enviar
                max_tokens: 200  // Puedes ajustar el número de tokens según lo que necesites
            })
        });

        const data = await response.json();
        console.log('Respuesta de la IA:', data);
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
}

// Llamamos a la función para obtener los datos de la IA
obtenerDatosIA();
