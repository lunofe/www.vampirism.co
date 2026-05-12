export async function onRequest(context) {
    const { request, env } = context;

    if (request.method !== "POST") {
        return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const body = await request.text();

        const res = await fetch(env.DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
        });

        if (!res.ok) {
            return new Response(JSON.stringify({ success: false, error: "Webhook request failed" }), {
                status: 502,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Failed to forward form data:", error);
        return new Response(JSON.stringify({ success: false, error: "Internal error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
