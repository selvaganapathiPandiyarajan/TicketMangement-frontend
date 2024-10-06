import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketDetails } from './ticket-details.model';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    FilterPipe,
    HttpClientModule
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})


export class EmployeeDashboardComponent implements OnInit {
public Questiontrue=false;
public Questiontrueone=false;
public tableView=true;
public ticketView=false;
public profileView=false;
public editprofileView=false;
public resetPage=false;
public passwordcheck=false;
public passcon=false;
public ticketForm !: FormGroup;
public passwordform !:FormGroup;
public userDetails:any;
public userDetailsvalue:any;
public adminallocater :String ="adminmanager";
public status :String ="ticket pending"
public reverse:boolean=false;
public datereverse:boolean=false;
public prioritydrop=false;
public ticketuser:any=[];
public highArr:any=[];
public lowArr:any=[];
public mediumArr:any=[];
public openedArr:any=[];
public pendingArr:any=[];
public closedArr:any=[];
pagination: any=[];
page = 1;
count = 0;
tableSize = 5;
size = [5, 10, 15, 20];
public progressBarPercentage :any;
public progressBarPercentageone :any;
public progressBarPercentagetwo:any;
public progressBarPercentagethree:any;
search: string ="";
  constructor(private form: FormBuilder,private api: ApiService,private http:HttpClient, private router: Router,private passform:FormBuilder ) { 
    this.ticketForm = this.form.group({
      'type': ['',Validators.compose([Validators.required])],
      'service': ['choose'],
      'subject': ['',Validators.compose([Validators.required])],
      'text': ['',Validators.compose([Validators.required])],
      'Priority': ['choose'],
      'attach': [''],
    })
    this.passwordform = this.passform.group({

      'oldpass': ['',Validators.compose([Validators.required])],
      'newpass': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],

      'conpass': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],

    })
  }
  

  ngOnInit(): void {
    this.userDetails = sessionStorage.getItem('userpage');
    this.userDetailsvalue = JSON.parse(this.userDetails);
    this.getticket();
  }
  Clickdropdown()
  {
  this.prioritydrop=true;

}
ClickdropdownTwo()
{
  this.Questiontrueone=true;
}
ClickticketPage()
{
  this.ticketView=true;
  this.tableView=false;
}
public ticketAdd :TicketDetails  = new TicketDetails();
ticketsubmit()
  {
    
  console.log("inside fun");
  this.ticketAdd.firstname = this.userDetailsvalue.firstname;
  this.ticketAdd.lastname = this.userDetailsvalue.lastname;
  this.ticketAdd.email = this.userDetailsvalue.email;
  this.ticketAdd.type =this.ticketForm.value.type;
  this.ticketAdd.service =this.ticketForm.value.service;
  this.ticketAdd.subject =this.ticketForm.value.subject;
  this.ticketAdd.text =this.ticketForm.value.text;
  this.ticketAdd.Priority =this.ticketForm.value.Priority;
  this.ticketAdd.attach =this.ticketForm.value.attach;
  this.ticketAdd.status=this.status;
  this.ticketAdd.adminallocater=this.adminallocater;
  this.ticketAdd.ticketDescription=""
  this.api.createTicket(this.ticketAdd)
            .subscribe(res=>{
              // this.router.navigate(['/admin'])
              console.log(res);
              alert("Ticket Raised Sucessfully")
              let ref = document.getElementById('cancel')
              ref?.click();
              this.ticketForm.reset(); 
              location.reload();
            },
            err=>{
              alert("something went wrong");
})} 
 getticket(){
  console.log("inside get ticket");
      this.api.getticket(this.userDetailsvalue.email)
      .subscribe(res=>{
        var check = res
        
          {
            this.ticketuser=res;
            console.log("ticketArr",this.ticketuser); 
            this.getAllticketdetails(check);
            this.progressBarPercentage= this.ticketuser.length *10;
          }
        
       
      })
  
    }


  
  
  
  changePriority(){
    this.prioritydrop=true; 
    var number = <HTMLInputElement>document.getElementById('Priority')
    var val=number.value;
    if(val === "high" )
    {
     this.ticketuser=this.highArr;
     this.prioritydrop=false; 
   
    }
    if(val === "low" )
    {
     this.ticketuser=this.lowArr;
     this.prioritydrop=false; 
   
    }
    if(val === "medium" )
    {
     this.ticketuser=this.mediumArr;
     this.prioritydrop=false; 
    }
   }
   checkticketLevel(){
    this.Questiontrueone=true; 
    var number = <HTMLInputElement>document.getElementById('ticketLevel')
    var val=number.value;
    if(val === "ticket Opened" )
    {
     this.ticketuser=this.openedArr;
     this.Questiontrueone=false; 
   
    }
    if(val === "ticket pending" )
    {
     this.ticketuser=this.pendingArr;
     this.Questiontrueone=false; 
   
    }
    if(val === "ticket closed" )
    {
     this.ticketuser=this.closedArr;
     this.Questiontrueone=false; 
    }
   }
   pages(): void {
    this.api.getticket(this.userDetailsvalue.email)
      .subscribe(res=>{
        console.log(res,"reeeeee")
          this.pagination = res;
      })
  }
  pageChangeEvent(event:number){
    this.page = event;
    this.pages();
  }  
  sizeChange(event:any){
    console.log("inside size change function");
    this.tableSize = event.target.value;
    this.page = 1;
    this.pages();
  } 
  getAllticketdetails(ticketArr:any)
  {
    ticketArr.map((e:any)=>
    {
      if(e.Priority == "low")
        {
          this.lowArr.push(e);
      
        }
        if(e.Priority == "high")
          {
            this.highArr.push(e);
          }
        
          if(e.Priority == "medium")
          {
            this.mediumArr.push(e);
          }
          if(e.status == "ticket Opened")
            {
              this.openedArr.push(e);
        
              this.progressBarPercentageone= this.pendingArr.length*10;
            }
            if(e.status == "ticket pending")
              {
                this.pendingArr.push(e);
          
                this.progressBarPercentagetwo= this.openedArr.length*10;
              }
              if(e.status == "ticket closed")
                {
                  this.closedArr.push(e);
            
                  this.progressBarPercentagethree= this.closedArr.length*10;
                }
    })

              
  }
  logout(){
    console.log("logout function");
    sessionStorage.removeItem('userpage');
    this.router.navigate(['/login']);

  }
  getProfile()
  {
    this.tableView=false;
    this.ticketView=false;
    this.profileView=true;
    this.editprofileView=false;
    this.resetPage=false;
  }
  getEditPage()
  {
  
    this.tableView=false;
    this.ticketView=false;
    this.profileView=false;
    this.editprofileView=true;
    this.resetPage=false;
  }
  getResetpage()
  {
    this.tableView=false;
    this.ticketView=false;
    this.profileView=false;
    this.editprofileView=false;
    this.resetPage=true;
  }
  getmaindashboard()
  {
    this.tableView=true;
    this.ticketView=false;
    this.profileView=false;
    this.editprofileView=false;
    this.resetPage=false;
  }
  updatetion()
{

 const firstname=(<HTMLInputElement>document.getElementById("firstName")).value;
 const lastname=(<HTMLInputElement>document.getElementById("lastname")).value;
 const designation=(<HTMLInputElement>document.getElementById("designation")).value;
 const DataAdd={
  firstname:firstname,
  lastname:lastname,
  designation:designation
 }
console.log(DataAdd,"Data");
this.api.editEmployee(DataAdd,this.userDetailsvalue.email)
.subscribe(res=>{
 console.log(res);
 alert("update Sucessfully")

 let ref = document.getElementById('cancel')
 ref?.click();

 sessionStorage.setItem('userpage',JSON.stringify(res));
 location.reload();
},
err=>{
   alert("something went wrong")
})

}
checkprevisouspass()
{
  this.api.getuserbyemail(this.userDetailsvalue.email)
  .subscribe(res=>{
    var check:any=[];
    check.push(res); 
    console.log(res,"res");

    if(check[0].password !== this.passwordform.value.oldpass){
      this.passwordcheck=true;
     }
     else{
      this.passwordcheck=false;

     }
  },err=>{
    alert('something went wrong');
  })
}

changepass()
{
  const DataAdd={
    password:this.passwordform.value.newpass,
    conpassword:this.passwordform.value.conpass
   }
  console.log(DataAdd,"Data");
  this.api.passwordUpdate(DataAdd,this.userDetailsvalue.email)
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
checkPassword(){
  var pass=this.passwordform.value.newpass;
  var conpass=this.passwordform.value.conpass;
  if(pass != conpass)
  {
    this.passcon=true;
  }
  else{
    this.passcon=false;
  }
}

}

