// Cloudflare Pages Function

// Retrieve launcher statistics from D1
export async function onRequest(context) {
    const { env } = context;

    try {
        // Fetch aggregated daily statistics (~1k rows instead of ~1.5M)
        const result = await env.DB.prepare(
            'SELECT year, month, day, launcher, version, count FROM statistics ORDER BY year, month, day'
        ).all();

        // Return as JSON
        return new Response(JSON.stringify({
            success: true,
            data: result.results
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
            },
        });
    } catch (error) {
        console.error('Failed to fetch statistics:', error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Failed to fetch statistics'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}
