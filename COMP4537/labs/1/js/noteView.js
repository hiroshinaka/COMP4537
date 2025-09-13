import { Note } from "./note.js";
/* Disclosure: Portions of this educational lab were assisted by ChatGPT.*/
export class NoteView {
  /**
   * @param {Note} note
   * @param {{onChange?: (note:Note)=>void, onRemove?: (note:Note)=>void}} handlers
   */
  constructor(note, { onChange, onRemove } = {}) {
    this.note = note;
    this.onChange = onChange;
    this.onRemove = onRemove;
    this.el = null; // root element
  }

  /** Build DOM and wire events. Returns root element. */
  render() {
    const wrapper = document.createElement("div");
    wrapper.className = "note-row";

    const ta = document.createElement("textarea");
    ta.value = this.note.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn danger remove";
    remove.textContent = window.MSG.BTN_REMOVE;

    ta.addEventListener("input", () => {
      this.note.text = ta.value;
      if (this.onChange) this.onChange(this.note);
    });

    remove.addEventListener("click", () => {
      if (this.onRemove) this.onRemove(this.note);
      wrapper.remove();
    });

    wrapper.appendChild(ta);
    wrapper.appendChild(remove);
    this.el = wrapper;
    return wrapper;
  }
}
