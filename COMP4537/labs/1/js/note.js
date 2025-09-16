/**
 * Disclosure: Portions of this educational lab were assisted by ChatGPT.
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

  /**
   * Returns a plain object representation of the note.
   * @returns {{id: string, text: string}} - The plain object representation of the note.
   */
  toPlain(){
    return {
      id: this.id,
      text: this.text
    }
  }

  /**
   * Creates a New Note from a plain obj. Used for converting stored obj in localstorage back to Note obj
   * @param {*} obj - The object to create a Note from.
   * @returns {Note} - The new Note object.
   **/
  static from(obj) {
    return new Note(
      typeof obj?.id === "string" ? obj.id : crypto.randomUUID(),
      typeof obj?.text === "string" ? obj.text : String(obj?.text ?? "")
    );
  };    
}

