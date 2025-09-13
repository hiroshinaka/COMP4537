/**
 * Creates a new Note object.
 * @param {string} id - The id of the note.
 * @param {string} text - The text of the note.
 * @returns {Note} - The new Note object.
 */
export class Note {
  constructor(id, text){
    this.id = id;
    this.text = text || '';
  }
  toPlain = function(){
    return {
      id: this.id,
      text: this.text
    }
  }

  static from = function (obj) {
    return new Note(
      typeof obj?.id === "string" ? obj.id : crypto.randomUUID(),
      typeof obj?.text === "string" ? obj.text : String(obj?.text ?? "")
    );
  };
}


