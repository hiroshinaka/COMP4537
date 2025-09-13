const KEY = 'notes';
/* Disclosure: Portions of this educational lab were assisted by ChatGPT.*/
export class NotesRepository{
  constructor(storage = window.localStorage){
    this.storage = storage;
  }
  load(){
    try{
      const raw = localStorage.getItem(KEY);
      const arr = JSON.parse(raw);

      if(!Array.isArray(arr)){
        return [];
      }
      return arr.map(obj => ({
        id: typeof obj.id === 'string' ? obj.id : crypto.randomUUID(),
        text: typeof obj.text === 'string' ? obj.text : ''
      }));
    } catch(e){
      console.error('Error loading notes from localStorage', e);
      return [];
    }
  }


  save(notesArray) {
    this.storage.setItem(KEY, JSON.stringify(notesArray));
  }
  
  static key(){ 
    return KEY; 
  }

}