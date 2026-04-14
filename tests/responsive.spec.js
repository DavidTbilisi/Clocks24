const { test, expect } = require('@playwright/test');

const viewports = [
    { name: 'phone-320', width: 320, height: 680 },
    { name: 'phone-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'laptop-1024', width: 1024, height: 768 },
    { name: 'desktop-1366', width: 1366, height: 900 }
];

for (const viewport of viewports) {
    test(`responsive clock card on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/index.html', { waitUntil: 'networkidle' });

        const card = page.locator('.clock-card');
        const imageWrap = page.locator('.image-wrap');
        const overlayTime = page.locator('.clock-overlay-time');
        const metaBottom = page.locator('.meta-bottom');

        await expect(card).toBeVisible();
        await expect(imageWrap).toBeVisible();
        await expect(overlayTime).toBeVisible();
        await expect(metaBottom).toBeVisible();

        const metrics = await page.evaluate(() => {
            const doc = document.documentElement;
            const cardEl = document.querySelector('.clock-card');
            const imageEl = document.querySelector('.image-wrap');
            const overlayEl = document.querySelector('.clock-overlay-time');
            const bottomEl = document.querySelector('.meta-bottom');

            if (!cardEl || !imageEl || !overlayEl || !bottomEl) {
                return {
                    missing: true
                };
            }

            const card = cardEl.getBoundingClientRect();
            const image = imageEl.getBoundingClientRect();
            const overlay = overlayEl.getBoundingClientRect();
            const bottom = bottomEl.getBoundingClientRect();

            return {
                missing: false,
                viewportWidth: window.innerWidth,
                horizontalOverflow: doc.scrollWidth > doc.clientWidth,
                cardFitsViewport: card.left >= 0 && card.right <= window.innerWidth,
                overlayInsideImage:
                    overlay.left >= image.left - 1 &&
                    overlay.right <= image.right + 1 &&
                    overlay.top >= image.top - 1 &&
                    overlay.bottom <= image.bottom + 1,
                metaBottomInsideImage:
                    bottom.left >= image.left - 1 &&
                    bottom.right <= image.right + 1 &&
                    bottom.bottom <= image.bottom + 1,
                cardWidth: card.width,
                imageWidth: image.width,
                bottomWidth: bottom.width
            };
        });

        expect(metrics.missing).toBeFalsy();
        expect(metrics.horizontalOverflow).toBeFalsy();
        expect(metrics.cardFitsViewport).toBeTruthy();
        expect(metrics.overlayInsideImage).toBeTruthy();
        expect(metrics.metaBottomInsideImage).toBeTruthy();
    });
}
