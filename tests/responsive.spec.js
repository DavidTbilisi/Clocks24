const { test, expect } = require('@playwright/test');

const viewports = [
    { name: 'phone-320', width: 320, height: 680 },
    { name: 'phone-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'laptop-1024', width: 1024, height: 768 },
    { name: 'desktop-1366', width: 1366, height: 900 }
];

for (const viewport of viewports) {
    test(`responsive explanation layout on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/explanation.html', { waitUntil: 'networkidle' });

        const wrap = page.locator('.wrap');
        const controls = page.locator('.controls');
        const cal = page.locator('.cal');

        await expect(wrap).toBeVisible();
        await expect(controls).toBeVisible();
        await expect(cal).toBeVisible();
        // the resulting month should have rendered day cells
        await expect(page.locator('.cal .d').first()).toBeVisible();

        const metrics = await page.evaluate(() => {
            const doc = document.documentElement;
            const wrapEl = document.querySelector('.wrap');
            if (!wrapEl) return { missing: true };
            const wrapRect = wrapEl.getBoundingClientRect();
            return {
                missing: false,
                horizontalOverflow: doc.scrollWidth > doc.clientWidth,
                wrapFitsViewport: wrapRect.left >= 0 && wrapRect.right <= window.innerWidth
            };
        });

        expect(metrics.missing).toBeFalsy();
        expect(metrics.horizontalOverflow).toBeFalsy();
        expect(metrics.wrapFitsViewport).toBeTruthy();
    });

    test(`responsive stage layout on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/index.html', { waitUntil: 'networkidle' });

        await expect(page.locator('.stage')).toBeVisible();
        await expect(page.locator('.stage-time')).toBeVisible();
        await expect(page.locator('.stage-date')).toBeVisible();

        const horizontalOverflow = await page.evaluate(() => {
            const doc = document.documentElement;
            return doc.scrollWidth > doc.clientWidth;
        });
        expect(horizontalOverflow).toBeFalsy();
    });
}

test('the day panel highlights the correct weekday for the 1st', async ({ page }) => {
    await page.goto('/explanation.html', { waitUntil: 'networkidle' });
    await expect(page.locator('.feedbk.ok')).toBeVisible();
});

test('the stage shows a live clock and links to the explanation page', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'networkidle' });
    await expect(page.locator('#stageTime')).toContainText(/\d{2}:\d{2}/);
    await expect(page.locator('.stage-bg')).toHaveClass(/loaded/);

    await page.click('.explain-link');
    await expect(page).toHaveURL(/explanation\.html$/);
    await expect(page.locator('.wrap')).toBeVisible();
});
