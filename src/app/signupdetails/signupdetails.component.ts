import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from './user-details.model';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-signupdetails',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './signupdetails.component.html',
  styleUrl: './signupdetails.component.css'
})
export class SignupdetailsComponent implements OnInit {
  public signupForm !: FormGroup;
  public passcon=false; 
  public otpValue:any;
public emailcheck=false;
  constructor(private form: FormBuilder, private router: Router,  private http: HttpClient, private api :ApiService) { 
    this.signupForm = this.form.group({
      'email': ['',Validators.compose([Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')])],
      'lastname': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')])],
      'firstname': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],
      'password': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],
      'conpassword': ['',Validators.compose([Validators.required])],
      'designation':['choose']
    })

  }

  ngOnInit(): void {
  }
  DataAdd :UserDetails  = new UserDetails();
  getOtp()
{
   var minm = 100000;
  var maxm = 999999;
  this.otpValue=Math.floor(Math
  .random() * (maxm - minm + 1)) + minm;

}

checkPassword(){
  var pass=this.signupForm.value.password;
  var conpass=this.signupForm.value.conpassword;
  if(pass != conpass)
  {
    this.passcon=true;
  }
  else{
    this.passcon=false;
  }
}


  register()
  { 
    if(this.signupForm.invalid) 
      alert("Enter all the details");

      this.getOtp();
          this.DataAdd.firstname = this.signupForm.value.firstname;
          this.DataAdd.lastname = this.signupForm.value.lastname;
          this.DataAdd.email = this.signupForm.value.email;
          this.DataAdd.password = this.signupForm.value.password;
           this.DataAdd.conpassword=this.signupForm.value.conpassword;
          this.DataAdd.designation=this.signupForm.value.designation; 
          this.DataAdd.category="employee"
          this.DataAdd.otpValue=this.otpValue;
          this.api.createEmployee(this.DataAdd)
           .subscribe(res=>{
            console.log(res);
            alert("Register Sucessfully")
  
            let ref = document.getElementById('cancel')
            ref?.click();
            this.router.navigate(['/login'])
            this.signupForm.reset();
  
  
          },
          err=>{
              alert("something went wrong")
          })} 
        
    
  }
    
