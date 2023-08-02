import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  id: any;
  status : boolean = false;
  error : string | undefined;
  user : User | undefined;
  myForm!: FormGroup;
  roles: string[] | undefined;
  constructor(public apiService : ApiService, public router : Router, private formBuilder: FormBuilder, private route : ActivatedRoute){
   this.myForm = this.formBuilder.group({
    id : [0, Validators.required],
    username : ['', Validators.required],
    password : ['', Validators.required],
    confirmPassword : ['', Validators.required],
  },  {validators : this.mustMatch('password', 'confirmPassword')})
  }
  onSaveUser(myForm : FormGroup){
    if(myForm.valid){
      this.user = new User(myForm.value.id, myForm.value.username,myForm.value.password, ["MANAGER"]);
      this.apiService.postUser(this.user).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.router.navigateByUrl('hotels')),
      });
      alert('Manager bien ajouté');
      console.log(this.user);
            
    }
    else{
      this.error = "Vous n'avez pas saisi correctement les champs";
    }
  }
  mustMatch(firstControl: string, secondControl : string): ValidatorFn {
    return (ctrl : AbstractControl): ValidationErrors | null => {
      const formGroup = ctrl as FormGroup
      const firstControlValue = formGroup.get(firstControl)?.value;
      const secondControlValue = formGroup.get(secondControl)?.value;
      if(firstControlValue === secondControlValue){
        return null;
      } else {
        return {valuesNotMatch : true}
      }
    }
  }
}
