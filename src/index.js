import Groq from "groq-sdk";

// Inicializa el cliente con tu clave API
const groq = new Groq({ apiKey: "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" });

export async function preguntarIA(pregunta) {
    const promptHistory = []; // Historial de la conversación
    promptHistory.push({ role: "user", content: pregunta });

    try {
        const response = await groq.chat.completions.create({
            messages: promptHistory,
            model: "llama-3.3-70b-versatile",
        });

        const iaResponse = response.choices[0]?.message?.content || "No se recibió respuesta de la IA.";
        return iaResponse;
    } catch (error) {
        console.error("Error al interactuar con la IA:", error);
        return "Hubo un error al obtener la respuesta.";
    }
}