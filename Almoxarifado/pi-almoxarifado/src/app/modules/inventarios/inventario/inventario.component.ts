import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from './inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  public inventarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
  ) { }

  ngOnInit(): void {
    this.inventarioForm = this.formBuilder.group({
      statusInventario: [{ id: 1 }, [Validators.required]],
      usuarioCriacao: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataInicio: [null, [Validators.required]],
      tipoInventario: [{ id: 1 }, [Validators.required]],
      descricao: [null, [Validators.required]],
      ativo: [true, [Validators.required]],
    });

  }
  
  public CriarInventario() {
    var dadosUsuario = JSON.parse(sessionStorage.getItem("dadosUsuario"));
    this.inventarioForm.get("usuarioCriacao.id").setValue(Number(dadosUsuario.id));
    
    var dt = this.inventarioForm.get("dataInicio").value;
    var arrayData = dt.split("/");
    dt = `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}T03:00:00.000Z`;
    this.inventarioForm.get("dataInicio").setValue(new Date(dt));

    if (this.inventarioForm.valid) {
      this.inventarioService.criar(this.inventarioForm.value).subscribe(res => {
        this.resetForm();
      });
    }
  }
  
  public resetForm() {
    this.inventarioForm = this.formBuilder.group({
      statusInventario: [{ id: 1 }, [Validators.required]],
      usuarioCriacao: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      dataInicio: [null, [Validators.required]],
      tipoInventario: [{ id: 1 }, [Validators.required]],
      descricao: [null, [Validators.required]],
      ativo: [true, [Validators.required]]
    });

  }

}
