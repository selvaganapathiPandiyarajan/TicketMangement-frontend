 import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import emailjs from 'emailjs-com';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-forget-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './forget-page.component.html',
  styleUrl: './forget-page.component.css'
})
export class ForgetPageComponent implements OnInit {
public captchaValue:any;
public forgetform !: FormGroup;
public questionform!:FormGroup;
public otpform!:FormGroup
public resetform !:FormGroup;
public invalidCaptcha=false;
public emailCheck=false;
public noCaptcha=false;
public sectionOne=false;
public section=true;
public sectionTwo =false;
public nofounduser=false;
public incorrectans=false;
public incorrectansone=false;
public incorrectotp=false;
public sectionThree=false;
public passCheck=false;
public userDetails:any=[];
  constructor(private form: FormBuilder, private router: Router, private http: HttpClient,private api: ApiService ,private ansform:FormBuilder,private otp:FormBuilder,private reset:FormBuilder) {
    this.forgetform = this.form.group({
      'email': ['',Validators.compose([Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')])],
      'Captchatext':['',Validators.compose([Validators.required])]
    })
    this.questionform=this.ansform.group({
      'ansone': ['',Validators.compose([Validators.required,])],
      'anstwo': ['',Validators.compose([Validators.required,])],
   
    
    
    })
    this.otpform=this.otp.group({
      'otpval': ['',Validators.compose([Validators.required,])],
      
      
      })
      this.resetform=this.reset.group({
        'password': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],
        'conpassword': ['',Validators.compose([Validators.required])],
      })
   }

  ngOnInit(): void {
    
  }
 
 
  checkEmail(){
    
    this.api.getuser(this.forgetform.value.email)
    .subscribe(res=>{
      var check = res; 
      console.log(check,"check");
      if(check){
        this.emailCheck=true;
       }
       else{
        this.emailCheck=false;
       }
    },err=>{
      alert('something went wrong');
    })

}
continue(){ 

  console.log("inside section function")
  this.api.getuser(this.forgetform.value.email)
    .subscribe(res=>{
      var check = res; 
      console.log(check,"check");
      if(check){
        this.emailCheck=true; 
        localStorage.setItem('userpage',JSON.stringify(check));
      this.userDetails.push(check);
      console.log(this.userDetails[0])
      this.section=false;
      this.sectionThree=false; 
      this.getOTP();
       }
       else{
        this.emailCheck=false; 

       }
    },err=>{
      alert('User not found');
    })
  
   
}
getPasswordPage()
{
  this.sectionOne=false;
  this.section=false; 
  this.sectionTwo=false;
  this.sectionThree=true;
}
changepass()
{
  const DataAdd={
    password:this.resetform.value.password,
    conpassword:this.resetform.value.conpassword
   }
  console.log(DataAdd,"Data");
  this.api.passwordUpdate(DataAdd,this.userDetails[0].emai)
  .subscribe(res=>{
   console.log(res);
   alert("password update Sucessfully")
  
   let ref = document.getElementById('cancel')
   ref?.click();
   this.router.navigate(['/login']);
   

  },
  err=>{
     alert("something went wrong")
  })
  
}

CheckOtp()
{ 
  console.log(this.userDetails[0].otpValue,"ddddddd");
  if(this.otpform.value.otpval != this.userDetails[0].otpValue)
    {
    
      this.incorrectotp=true;
    }
    else{
      this.incorrectotp=false;
    
    }
}
getOTP()
{ 
  
  this.section=false;
  this.sectionTwo=true;
  alert("OTP send Succesfully to your gmail")
  this.sendmail();
}
checkPassword(){
  var pass=this.resetform.value.password;
  var conpass=this.resetform.value.conpassword;
  if(pass != conpass)
  {
    this.passCheck=true;
  }
  else{
    this.passCheck=false;
  }
}

sendmail(){

  var params ={
    to_name:this.userDetails[0]?.firstname,
    message:this.userDetails[0]?.otpValue,
    reply_to:"ditteam@gmail.com",
    to_email:this.userDetails[0]?.email,

  }
  console.log(params);
emailjs.send("service_n3v49ll","template_z871u6e",params,'ZiasAIY22fqeRxufM').then(function (res)
{
alert("We have sent OTP to Your Register Email Id ");
})

}
}
