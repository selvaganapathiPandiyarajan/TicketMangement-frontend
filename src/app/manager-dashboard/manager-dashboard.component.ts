import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import emailjs from 'emailjs-com';
import { TeamDetails } from './team-details.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination'
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    FilterPipe,
    HttpClientModule
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent  implements OnInit  {
public managerDetails:any;
public managerDetailsValue:any;
public tableView=true;
public ticketView=false;
public profileView=false;
public editprofileView=false;
public resetPage=false;
public passcon=false;
public otpValue:any;
public passwordcheck=false;
public reverse=false;
public prioritydrop=false;
public Questiontrueone=false;
public datereverse=false;
public AllTable=false;
public pendingTable=true;
public OpenTable=false;
public CloseTable=false;
public myteampage=false;
public createteampage=false;
public userView=false;
public emailcheck=false;
public ticketuser:any=[];
public highArr:any=[];
public lowArr:any=[];
public mediumArr:any=[];
public openedArr:any=[];
public pendingArr:any=[];
public closedArr:any=[];
public teamUser:any=[];
public passwordform !:FormGroup;
public userForm !:FormGroup;
public selectiveForm !:FormGroup
public progressBarPercentage :any;
public progressBarPercentageone :any;
public progressBarPercentagetwo:any;
public progressBarPercentagethree:any;
public allocatorNames:any=[];
public userpassscon=false;
public teamUserOpened:any=[];
public teamUserClosed:any=[];
public userOneticketcloseArr:any=[];
public userOneticketArr:any=[];
public usertwoticketcloseArr:any=[];
public usertwoticketArr:any=[];
search: string ="";
pagination: any;
page = 1;
count = 0;
tableSize = 5;
size = [5, 10, 15, 20];
DataAdd :TeamDetails  = new TeamDetails();
  constructor(private router:Router,private passform:FormBuilder,private api: ApiService,private http:HttpClient,private form:FormBuilder,private selectform:FormBuilder) { 
    this.passwordform = this.passform.group({

      'oldpass': ['',Validators.compose([Validators.required])],
      'newpass': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],

      'conpass': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],

    })
    this.userForm = this.form.group({
      'email': ['',Validators.compose([Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')])],
      'lastname': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')])],
      'firstname': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],
      'password': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],
      'conpassword': ['',Validators.compose([Validators.required])],
      'designation':['choose']
    })
    this.selectiveForm=this.selectform.group({
      'fromselect':['choose'],
    })
  }
  viewTableOne()
  {
    this.AllTable=true;
    this.pendingTable=false;
    this.CloseTable=false;
    this.OpenTable=false;

  }
  adminallocation(id:any){

    const DataAdd={
      adminallocater:this.selectiveForm.value.fromselect,
      status:"ticket Opened"
     }
    console.log(DataAdd,"Data");
    this.api.upadteAdminAllocator(DataAdd,id)
    .subscribe(res=>{
     console.log(res);
     alert("AdminAlloctor update Sucessfully")
    
     let ref = document.getElementById('cancel')
     ref?.click();
     location.reload();
  
    },
    err=>{
       alert("something went wrong")
    })
}
  viewTableTwo()
  {
    this.AllTable=false;
    this.pendingTable=true;
    this.CloseTable=false;
    this.OpenTable=false;
    
  }
  deleteTeam(email: any) {
    if (confirm('Are you sure you want to delete this team member?')) {
      this.api.deleteAdmin(email).subscribe(
        () => {},
        
      );
    }
    alert("Successfully deleted");
    let ref = document.getElementById('cancel');
    if (ref) {
      ref.click(); // Assuming 'cancel' is an element to close a modal or dialog
    }
    location.reload();
  }
  viewTableThree()
  {

    this.pendingTable=false;
    this.CloseTable=false;
    this.OpenTable=true;
    this.AllTable=false;
  }
  viewTableFour()
  {
    this.AllTable=false;
    this.pendingTable=false;
    this.CloseTable=true;
    this.OpenTable=false;
    
  }
  ngOnInit(): void {
    this.managerDetails = sessionStorage.getItem('managerfinalpage');
    this.managerDetailsValue = JSON.parse(this.managerDetails);
    this.getticket();
    this.getAllteam();

  }
  getAllteam()
  {
    const category="Admin";
    this.api.getTeam(category)
    .subscribe(res=>{
      this.teamUser=res;  
      this.teamUser.map((e:any)=>
        {
          this.allocatorNames.push(e.firstname);
        }
      )
 
  
    },err=>{
      alert('something went wrong');
    })

  }
  sendmail(data:any){
   const messageDetails=`Login Id:${data.email} and Password:${data.password}`
    var params ={
      to_name:data.firstname,
      message:messageDetails,
      to_email:data.email,
  
    }
    console.log(params);
  emailjs.send("service_n3v49ll","template_fl120o8",params,'ZiasAIY22fqeRxufM').then(function (res)
  {
  alert("Login details shared successfully");
  })
  
  }

  
  

  logout()
  {
    console.log("logout function");
    sessionStorage.removeItem('managerfinalpage');
    this.router.navigate(['/login']);

  }
  getResetpage()
  {
    this.tableView=false;
    this.ticketView=false;
    this.profileView=false;
    this.editprofileView=false;
    this.resetPage=true;
    this.myteampage=false;
    this.createteampage=false;
  }
  getmaindashboard()
  {
    this.tableView=true;
    this.ticketView=false;
    this.profileView=false;
    this.editprofileView=false;
    this.resetPage=false;
    this.myteampage=false;
    this.createteampage=false;
  }
  getTeamPage()
  {
    this.tableView=false;
    this.ticketView=false;
    this.profileView=false;
    this.editprofileView=false;
    this.resetPage=false;
    this.myteampage=true;
    this.createteampage=false;
  }
  getCreateteampage()
  {
    this.tableView=false;
    this.ticketView=false;
    this.profileView=false;
    this.editprofileView=false;
    this.resetPage=false;
    this.myteampage=false;
    this.createteampage=true;
  }
  checkprevisouspass()
  {
    this.api.getuserbyemail(this.managerDetailsValue.email)
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
    this.api.passwordUpdate(DataAdd,this.managerDetailsValue.email)
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
checkuserpassword()

{
  var pass=this.userForm.value.password;
  var conpass=this.userForm.value.conpassword;
  if(pass != conpass)
  {
    this.userpassscon=true;
  }
  else{
    this.userpassscon=false;
  }
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
getProfile()
{
  this.tableView=false;
  this.ticketView=false;
  this.profileView=true;
  this.editprofileView=false;
  this.resetPage=false;
  this.myteampage=false;
  this.createteampage=false;
}
getEditPage()
{
  this.tableView=false;
  this.ticketView=false;
  this.profileView=false;
  this.editprofileView=true;
  this.resetPage=false;
  this.myteampage=false;
  this.createteampage=false;
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
this.api.editEmployee(DataAdd,this.managerDetailsValue.email)
.subscribe(res=>{
 console.log(res);
 alert("update Sucessfully")

 let ref = document.getElementById('cancel')
 ref?.click();

 sessionStorage.setItem('managerfinalpage',JSON.stringify(res));
 location.reload()
 this.getticket();
},
err=>{
   alert("something went wrong")
})

}
getticket(){

  this.api.getAllTicket().subscribe(res=>{
    var check = res;
        this.ticketuser=res;  
        this.getAllticketdetails(res);
        this.progressBarPercentage= this.ticketuser.length *10;
    
    
    if(check){
      sessionStorage.setItem('ticketfinalpage1',JSON.stringify(check));
             console.log("ticketval",this.ticketuser);
      
    }
    })
}


  
  

getAllticketdetails(ticketArr:any)
{
  ticketArr.map((e:any)=>{
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
        if(e.status === "ticket Opened")
          {
            this.openedArr.push(e);
      
            this.progressBarPercentageone= (this.ticketuser.length - this.openedArr.length)*10;
          }
          if(e.status === "ticket pending")
            {
              this.pendingArr.push(e);
        
              this.progressBarPercentagetwo= (this.ticketuser.length - this.pendingArr.length)*10;
            }
            if(e.status === "ticket closed")
              {
                this.closedArr.push(e);
          
                this.progressBarPercentagethree= (this.ticketuser.length - this.closedArr.length)*10;
              }
  })
 

}
pages(): void {
  this.api.get1()
    .subscribe(res=>{
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



  Clickdropdown()
  {
  this.prioritydrop=true;

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
 ClickdropdownTwo()
{
  this.Questiontrueone=true;
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
 
 
   

getOtp()
{
   var minm = 100000;
  var maxm = 999999;
  this.otpValue=Math.floor(Math
  .random() * (maxm - minm + 1)) + minm;

}

createTeam()
{
  if(this.userForm.invalid) 
    alert("Enter all the details");
  this.api.getuser(this.userForm.value.email)
  .subscribe(res=>{
    var check:any=[];
    check.push(res); 
    console.log(res,"res");
    if(check[0].exists==true){
      this.emailcheck=true;
     }
     else if(check[0].exists==false){
      this.emailcheck=false;
        this.DataAdd.firstname = this.userForm.value.firstname;
        this.DataAdd.lastname = this.userForm.value.lastname;
        this.DataAdd.email = this.userForm.value.email;
        this.DataAdd.password = this.userForm.value.password;
         this.DataAdd.conpassword=this.userForm.value.conpassword;
         this.DataAdd.otpValue=this.otpValue;
        this.DataAdd.designation=this.userForm.value.designation;
        this.DataAdd.category="Admin"
        
        this.api.createEmployee(this.DataAdd)
         .subscribe(res=>{
          console.log(res);
          alert("user Create Sucessfully")

          let ref = document.getElementById('cancel')
          ref?.click();

          this.userForm.reset();
          this.sendmail(this.DataAdd);
         location.reload();

        },
        err=>{
            alert("something went wrong")
        })}
      })
  }
}

