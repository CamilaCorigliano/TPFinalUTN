export class User {
    _id: string;
    _userName: string;
    _firstName: string;
    _lastName: string;
    _email: string;
    _dni: string;
    _reservations: any[]; 
    _favourites: any[];   
    _role: string;
    _password?: string 
  
    constructor(data: any) {
      this._id = data._id || '';
      this._userName = data._userName || '';
      this._firstName = data._firstName || '';
      this._lastName = data._lastName || '';
      this._email = data._email || '';
      this._dni = data._dni || '';
      this._reservations = data._reservations || [];
      this._favourites = data._favourites || [];
      this._role = data._role || '';
      this._password = data._password
    }
   
  }
  