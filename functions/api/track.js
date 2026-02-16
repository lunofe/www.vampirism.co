// Cloudflare Pages Function

// Track launcher statistics
export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    // Get raw query parameters
    const rawLauncher = url.searchParams.get('source');
    const rawVersion = url.searchParams.get('version');

    // Validate launcher: empty -> 'legacy', allowed values: 'mr','cf','tl'
    let launcher;
    if (rawLauncher === null || rawLauncher === '') {
        launcher = 'legacy';
    } else {
        const allowed = new Set(['mr', 'cf', 'tl']);
        if (!allowed.has(rawLauncher)) {
            return new Response(JSON.stringify({ success: false, error: 'invalid launcher' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        launcher = rawLauncher;
    }

    // Validate version: empty -> '1.20.1', only digits and dots, max 7 chars
    let version;
    if (rawVersion === null || rawVersion === '') {
        version = '1.20.1';
    } else {
        const isValid = /^[0-9]+(\.[0-9]+)*$/.test(rawVersion) && rawVersion.length <= 7;
        if (!isValid) {
            return new Response(JSON.stringify({ success: false, error: 'invalid version' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        version = rawVersion;
    }

    // Upsert into aggregated daily table (1 row read + 1 write per request)
    try {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = now.getUTCMonth() + 1;
        const day = now.getUTCDate();

        await env.DB.prepare(
            `INSERT INTO statistics (year, month, day, launcher, version, count)
             VALUES (?, ?, ?, ?, ?, 1)
             ON CONFLICT(year, month, day, launcher, version)
             DO UPDATE SET count = count + 1`
        ).bind(year, month, day, launcher, version).run();
    } catch (error) {
        // Log error but don't fail the request
        console.error('Failed to log statistics:', error);
    }

    return new Response(JSON.stringify({
        success: true
    }));
}
