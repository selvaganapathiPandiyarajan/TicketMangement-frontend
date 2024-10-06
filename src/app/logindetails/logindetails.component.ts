import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-logindetails',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './logindetails.component.html',
  styleUrl: './logindetails.component.css'
})
export class LogindetailsComponent implements OnInit {
  public loginForm !: FormGroup;
  constructor(private form: FormBuilder, private router: Router ,  private api :ApiService,private http:HttpClient) { 
    this.loginForm = this.form.group({
      'email': ['',Validators.compose([Validators.required])],
      'password': ['',Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }
  login() {
    if (this.loginForm.invalid) {
      alert('Please enter details');
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
      console.log(email,"email");
    this.api.getLogin(email, password).subscribe(
      (res: any) => {
        console.log("check", res);
        const userCategory = res.category;
  
        if (userCategory === "employee") {
          sessionStorage.setItem('userpage', JSON.stringify(res));
          alert('Login success');
          this.router.navigate(['/user']);
        } else if (userCategory === "Manager") {
          sessionStorage.setItem('managerfinalpage', JSON.stringify(res));
          alert('Manager Login Success');
          this.router.navigate(['/manager']);
        } else if (userCategory === "Admin") {
          sessionStorage.setItem('Adminpage', JSON.stringify(res));
          alert('Admin Login Success');
          this.router.navigate(['/supportteam']);
        } else {
          alert('User category not recognized');
        }
  
        // Reset the form after successful login
        this.loginForm.reset();
      },
      (err) => {
        console.error("Error during login:", err);
        if (err.status === 401) {
          alert("Invalid email or password");
        } else {
          alert("An error occurred during login. Please try again.");
        }
      }
    );
  }
  
 
  
  }





 