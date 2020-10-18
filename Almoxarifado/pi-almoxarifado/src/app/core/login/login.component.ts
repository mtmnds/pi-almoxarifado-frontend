import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }


  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    remember: [false]
  });


  ngOnInit(): void {
    if (localStorage.getItem("credentials")) {
      const credentials = JSON.parse(localStorage.getItem("credentials"));
      this.loginForm.get("email").setValue(credentials.email);
      this.loginForm.get("password").setValue(credentials.password);
      this.loginForm.get("remember").setValue(credentials.remember);
    }
  }


  onSubmit() {
    if (this.loginForm.get("remember").value) {
      localStorage.setItem("credentials", JSON.stringify({
        email: this.loginForm.get("email").value,
        password: this.loginForm.get("password").value,
        remember: this.loginForm.get("remember").value
      }));
    } else {
      localStorage.removeItem("credentials");
    }

    if (this.loginForm.get("password").value) {
      this.loginForm.get("password").setValue(
        this.encrypt(this.loginForm.get("password").value)
      );
    }

    if (this.loginForm.valid) {
      this.router.navigate(["/index"]);
    }
  }


  encrypt(password: string) {
    const md5 = new Md5();
    return md5.appendStr(password).end();
  }


}
