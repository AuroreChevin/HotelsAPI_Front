import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit{
  mode = 0;
  myForm: FormGroup;
  error: any | undefined;
  constructor(private formBuilder: FormBuilder,private router: Router, private authService : AuthServiceService) {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['',[Validators.required, Validators.pattern('[0-9]{4}$')]]
    })
  }
  ngOnInit(): void {
  }
  login(myForm: FormGroup){
    if(myForm.valid){
    this.authService.postUser(myForm.value.username, myForm.value.password).subscribe( {
        next: (data) => {console.log(data);
                        let jwt = data.headers.get('Authorization');
                        console.log(jwt);
                        this.authService.saveToken(jwt);},                        
        error: (err) => (this.error = "pb"),
        complete: () => (this.error = "null"),
      })
      console.log(myForm.value);
      this.router.navigateByUrl('hotels');
    } else{
      alert("Identifiants incorrects");
    }
  }
}
