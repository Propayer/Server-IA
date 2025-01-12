import Groq from "groq-sdk";

// Inicializa el cliente con tu clave API
const groq = new Groq({ apiKey: "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" });

// Esta función recibirá la pregunta desde la web y la procesará
export async function procesarPregunta(pregunta) {
    const promptHistory = []; // Historial de la conversación
    promptHistory.push({ role: "user", content: pregunta });

    try {
        // Realiza la solicitud a la API de Groq para obtener la respuesta de la IA
        const response = await groq.chat.completions.create({
            messages: promptHistory,
            model: "llama-3.3-70b-versatile",
        });

        // Extrae la respuesta de la IA
        const iaResponse = response.choices[0]?.message?.content || "No se recibió respuesta de la IA.";

        // Enviar la respuesta a la otra web con el prefijo '[IA]'
        await enviarRespuestaAWeb(iaResponse);

        return iaResponse; // Puedes eliminar esta línea si solo quieres enviar la respuesta a la web
    } catch (error) {
        console.error("Error al interactuar con la IA:", error);
        await enviarRespuestaAWeb("Hubo un error al obtener la respuesta.");
        return "Hubo un error al obtener la respuesta.";
    }
}

// Esta función envía la respuesta a la web proporcionada
async function enviarRespuestaAWeb(respuesta) {
    const url = 'https://frontend-server-zeta.vercel.app'; // La URL de la web a la que enviarás las respuestas
    const respuestaConPrefijo = `[IA] ${respuesta}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: respuestaConPrefijo }),
        });

        if (!response.ok) {
            console.error("Error al enviar la respuesta a la web:", response.statusText);
        }
    } catch (error) {
        console.error("Error al conectar con la web:", error);
    }
}