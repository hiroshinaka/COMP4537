class LayoutManager{
    /**
     * Get the size of the element as { w: width, h: height }.
     * @param {Element} element - The element to measure.
     * @returns {Object} - The size of the element as { w: width, h: height }.
     */
    measure(element) {
        const r = element.getBoundingClientRect();
        return { w: r.width, h: r.height };
    }
    /**
     * Gets the size of the window viewport as { w: width, h: height }.
     * @returns {Object} - The size of the window viewport as { w: width, h: height }.
     */
    getViewport() {
        return { w: window.innerWidth, h: window.innerHeight };
    }

    /**
     * Generates a random position within the viewport, minus the size of the given button
     * and some padding. The button will not overlap with the edge of the viewport.
     * @param {number} btnW - The width of the button.
     * @param {number} btnH - The height of the button.
     * @param {number} [pad=2] - The padding around the viewport.
     * @returns {Object} - The position as { x: number, y: number }.
     */
    randomPos(btnW, btnH, pad = 2) {
        const { w, h } = this.getViewport();      
        const maxX = Math.max(0, w - btnW - pad);
        const maxY = Math.max(0, h - btnH - pad);
        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        return { x, y };
    }

    /**
     * Scrambles the buttons by repositioning them at random positions within the viewport.
     * The buttons are allowed to overlap with each other.
     * @param {GameButton[]} buttons - The buttons to scramble.
     * @param {number} btnW - The width of each button.
     * @param {number} btnH - The height of each button.
     */
    scramble(buttons, btnW, btnH) {
        // allow overlap per spec
        for (const b of buttons) {
        const { x, y } = this.randomPos(btnW, btnH);
        b.moveTo(x, y, "fixed"); 
        }
    }
    }