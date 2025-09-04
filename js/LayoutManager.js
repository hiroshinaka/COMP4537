class LayoutManager{
    measure(el) {
        const r = el.getBoundingClientRect();
        return { w: r.width, h: r.height };
    }
    getViewport() {
        return { w: window.innerWidth, h: window.innerHeight };
    }

    randomPos(btnW, btnH, pad = 2) {
        const { w, h } = this.getViewport();      // read fresh size each time
        const maxX = Math.max(0, w - btnW - pad);
        const maxY = Math.max(0, h - btnH - pad);
        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        return { x, y };
    }

    scramble(buttons, btnW, btnH) {
        // allow overlap per spec
        for (const b of buttons) {
        const { x, y } = this.randomPos(btnW, btnH);
        b.moveTo(x, y, "fixed"); // position relative to window
        }
    }
    }