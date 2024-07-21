import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subject = new BehaviorSubject('');
  address = " ";
  user = {};
  userIn = {
    username: "",
  };
  //fakeUsers = 'https://fakestoreapi.com/users';
  users = [
    {
      id: 6,
      name: 'David',
      lastname: 'Russell',
      email: 'david_r@gmail.com',
      username: 'david_r',
      password: 'f238&@*$',
      likedItems: [1, 6],
      orders: [],
    },
    {
      id: 8,
      name: 'william',
      lastname: 'hopkins',
      email: 'william@gmail.com',
      username: 'hopkins',
      password: 'William56$hj',
      likedItems: [5,6],
      orders: [],
    },
    {
      id: 1,
      name: 'john',
      lastname: 'doe',
      email: 'john@gmail.com',
      username: 'johnd',
      password: 'm38rmF$',
      likedItems: [3, 6],
      orders: [],
    }
  ]
  registUsers:object[] = [];

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
    } else {
      this.router.navigateByUrl("/login")
    }
   }

   login(user: object) {
    return this.http.post(this.address + 'auth/login', user)
  }

  register() {
    this.http.post(this.address, this.user).subscribe();
  }

  isLoggedIn() {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem("user");
  }

  saveUser(user: object) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  getUser() {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem("user") || '{}');
    }
    return {};
  }
}
