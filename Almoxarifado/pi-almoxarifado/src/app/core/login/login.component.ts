import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }


  public loginForm = this.fb.group({
    email: ["", Validators.required],
    senha: ["", Validators.required],
    lembrar: [false]
  });


  ngOnInit(): void {
    if (localStorage.getItem("credentials")) {
      const credentials = JSON.parse(localStorage.getItem("credentials"));
      this.loginForm.get("email").setValue(credentials.email);
      this.loginForm.get("senha").setValue(credentials.senha);
      this.loginForm.get("lembrar").setValue(credentials.lembrar);
    }
  }


  onSubmit() {
    if (this.loginForm.get("lembrar").value) {
      localStorage.setItem("credentials", JSON.stringify({
        email: this.loginForm.get("email").value,
        senha: this.loginForm.get("senha").value,
        lembrar: this.loginForm.get("lembrar").value
      }));
    } else {
      localStorage.removeItem("credentials");
    }

    /*if (this.loginForm.get("senha").value) {
      this.loginForm.get("senha").setValue(
        this.encrypt(this.loginForm.get("senha").value)
      );
    }*/

    if (this.loginForm.valid) {
      this.loginService.autenticar(this.loginForm.value).subscribe(res => {
        if (res) {
          sessionStorage.setItem("dadosUsuario", JSON.stringify(res));
          this.router.navigate(["/index"]);
        }
      });
    }
  }


  encrypt(senha: string) {
    const md5 = new Md5();
    return md5.appendStr(senha).end();
  }


}
