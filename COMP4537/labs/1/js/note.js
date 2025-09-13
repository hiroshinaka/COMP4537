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
   * Creates a new Note object from a given object.
   * @param {*} obj - The object to create a Note from.
   * If the object has an 'id' property of type string, it is used as the id of the Note.
   * If the object has a 'text' property of type string, it is used as the text of the Note.
   * If the object does not have an 'id' property of type string, a random uuid is used as the id of the Note.
   * If the object does not have a 'text' property of type string, an empty string is used as the text of the Note.
   * @returns {Note} - The new Note object.
   **/
  static from(obj) {
    return new Note(
      typeof obj?.id === "string" ? obj.id : crypto.randomUUID(),
      typeof obj?.text === "string" ? obj.text : String(obj?.text ?? "")
    );
  };    
}

