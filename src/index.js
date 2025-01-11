import Groq from "groq-sdk";

// Configuración de la clave API
const groq = new Groq({ apiKey: "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" });

// Función para consultar la IA
export async function preguntarIA(pregunta, callback) {
    try {
        if (!pregunta) throw new Error("La pregunta no puede estar vacía.");

        // Solicitud al modelo
        const response = await groq.completions.create({
            model: "Llama-3.1-70B",
            prompt: pregunta,
            max_tokens: 200,
        });

        // Enviar el resultado al callback
        callback(null, response.choices[0]?.text || "Sin respuesta.");
    } catch (error) {
        // Manejo de errores
        callback(error.message, null);
    }
}
