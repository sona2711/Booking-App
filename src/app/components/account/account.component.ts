import { Component , OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  loginTab: number = 1
  remember: boolean = false;
  login: boolean = false;
  register: boolean = false
  userInfo = {}

  signInForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    displayName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.maxLength(8)]),
    confirmPass: new FormControl("", [Validators.required, Validators.maxLength(8)]),
    agree: new FormControl("", [Validators.required]),
  });


  constructor(
    public router: Router,
    private ActivatedRoute: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient) {

      let user = this.authService.getUser();
      if (Object.keys(user).length > 0) {
        this.userInfo = user;
      }
  }

  ngOnInit(): void {
   window.scroll(0,0)
  }

   signIn() {
    this.login = !this.login;
    if (this.signInForm.status === 'INVALID') return;
    console.log(this.signInForm.value);

    this.authService.login(this.signInForm.value).subscribe(res => {
      let user = this.authService.users.find(el => el.username === this.signInForm.value.username);
      if (user) {
        let userInfo = {
          id: user.id,
          username: user.username,
          token: res,
          likedItems: user.likedItems,
          orders: user.orders,
        };
        this.authService.saveUser(userInfo);
        this.userInfo = userInfo;
        this.authService.subject.next('');
        this.router.navigateByUrl('/home');
      }
    }, error => {
      console.log(error);
    });
  }

  createAccount() {
    this.register = !this.register;
    if (this.registerForm.status === 'INVALID') return;
    if (this.registerForm.value.password === this.registerForm.value.confirmPass && this.registerForm.value.agree) {
      let newUser = this.registerForm.value;
      this.http.post(this.authService.address, newUser).subscribe(() => {
        let userInfo = {
          id: 1,
          username: newUser.displayName,
          token: "125433347262",
          likedItems: [],
          orders: [],
        };
        this.authService.saveUser(userInfo);
        this.userInfo = userInfo;
        this.authService.subject.next('');
        this.authService.registUsers.push(newUser);
        console.log(this.registerForm.value);
        this.router.navigateByUrl("/home");
      });
    }
  }
}

