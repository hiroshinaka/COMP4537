class Note {
  constructor({ id, text = '', createdAt = new Date().toISOString(), updatedAt = createdAt }) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static createNew() {
    const id = crypto.randomUUID ? crypto.randomUUID() : ('id_' + Date.now() + '_' + Math.random());
    const now = new Date().toISOString();
    return new Note({ id, text: '', createdAt: now, updatedAt: now });
  }
  static fromPlain(obj) {
    return new Note({
      id: obj.id,
      text: obj.text ?? '',
      createdAt: obj.createdAt ?? new Date().toISOString(),
      updatedAt: obj.updatedAt ?? obj.createdAt ?? new Date().toISOString()
    });
  }
  toPlain() {
    return { id: this.id, text: this.text, createdAt: this.createdAt, updatedAt: this.updatedAt };
  }
  setText(newText) {
    this.text = newText;
    this.updatedAt = new Date().toISOString();
  }
}
