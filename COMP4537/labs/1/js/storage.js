class Storage{
  static KEYS = {
    NOTES: 'notes',
    SAVED_AT: 'savedAt',
    RETRIEVED_AT: 'retrievedAt'
  }


  getNotes(){
    try{
      const raw = localStorage.getItem(Storage.KEYS.NOTES);
      return raw ? this.parse(raw) : [];
    }catch(e){
      return [];
    }
  }
  saveNotes(arr){
    localStorage.setItem(STORAGE.NOTES, JSON.stringify(arr));
    const iso = new Date().toISOString();
    localStorage.setItem(STORAGE.SAVED_AT, iso);
    return iso;                   
  }
  getSavedAt(){ 
    return localStorage.getItem(Storage.KEYS.SAVED_AT); 
  }
  setRetrievedNow(){ 
    localStorage.setItem(Storage.KEYS.RETRIEVED_AT, new Date().toISOString()); 
  }
  getRetrievedAt(){ 
    return localStorage.getItem(Storage.KEYS.RETRIEVED_AT); 
  }

}