export class Reservation {
    _id: string;
    _user_id: string;
    _state: string;
    _res_size: number;
    _due_date: string;
    _comment: string;
    _restaurant_id:string
    _tables?: any[] | null;
    _restaurant_details: { name: string; adress: string } = { name: '', adress: '' }; // Inicializa correctamente _restaurant_details
  
    constructor(id: string, user_id: string, state: string, res_size: number, due_date: string, comment: string, restaurant_id:string, tables?: any[]) {
      this._id = id;
      this._user_id = user_id;
      this._state = state;
      this._res_size = res_size;
      this._due_date = due_date;
      this._restaurant_id = restaurant_id
      this._comment = comment;
      this._tables = tables;
    }
  }
  