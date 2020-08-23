import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private passwordEncrypted = false;

  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      senha: ["", [Validators.required]],
      lembrar: [false, []]
    });

    if (localStorage.getItem("credenciais")) {
      const credenciais = JSON.parse(localStorage.getItem("credenciais"));
      this.loginForm.get("email").setValue(credenciais.email);
      this.loginForm.get("senha").setValue(credenciais.senha);
      this.loginForm.get("lembrar").setValue(credenciais.lembrar);
      this.passwordEncrypted = true;
    }
  }


  login() {
    if (!this.passwordEncrypted) {
      if (this.loginForm.get("senha").value) {
        this.loginForm.get("senha").setValue(
          this.encrypt(this.loginForm.get("senha").value)
        );
      }
    }
    
    if (this.loginForm.get("lembrar").value) {
      localStorage.setItem("credenciais", JSON.stringify({
        email: this.loginForm.get("email").value,
        senha: this.loginForm.get("senha").value,
        lembrar: this.loginForm.get("lembrar").value
      }));
    } else {
      localStorage.removeItem("credenciais");
    }

    if (this.loginForm.get("senha").value) {
      this.loginForm.get("senha").setValue(
        this.encrypt(this.loginForm.get("senha").value)
      );
    }

    if (this.loginForm.valid) {
      this.router.navigate(["index"]);
    }
  }


  encrypt(senha: string) {
    const md5 = new Md5();
    return md5.appendStr(senha).end();
  }
  

}
