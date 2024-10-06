import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http'
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    FilterPipe,
    HttpClientModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  implements OnInit {
  public adminDetails:any;
  public adminDetailsValue:any;
  public tableView=true;
public ticketView=false;
public profileView=false;
public editprofileView=false;
public resetPage=false;
public passwordcheck=false;
public passcon=false;
public ticketuser:any=[];
public passwordform !:FormGroup;
public progressBarPercentage :any;
public progressBarPercentageone :any;
public progressBarPercentagetwo:any;
public progressBarPercentagethree:any;
public highArr:any=[];
public lowArr:any=[];
public mediumArr:any=[];
public openedArr:any=[];
public pendingArr:any=[];
public closedArr:any=[];
public AllTable=false;
public pendingTable=false;
public OpenTable=true;
public CloseTable=false;
public closedPage=false;
public search:string="";
public reverse=false;
public Questiontrueone=false;
public prioritydrop=false;
public datereverse=false;
public closedViewArr:any=[];
pagination: any;
page = 1;
count = 0;
tableSize = 1;
size = [5, 10, 15, 20];
  constructor(private router:Router,private api: ApiService,private http:HttpClient,private passform:FormBuilder)
  {
    this.passwordform = this.passform.group({

      'oldpass': ['',Validators.compose([Validators.required])],
      'newpass': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],

      'conpass': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],

    })
  }
ngOnInit(): void {
      this.adminDetails = sessionStorage.getItem('Adminpage');
    this.adminDetailsValue = JSON.parse(this.adminDetails);
    this.getticket();
}
logout()
{
  console.log("logout function");
  sessionStorage.removeItem('Adminpage');
  this.router.navigate(['/login']);

}
getcloseTicket(open:any)
{
  this.tableView=false;
  this.ticketView=false;
  this.profileView=false;
  this.editprofileView=false;
  this.resetPage=false;
  this.closedPage=true;
  this.closedViewArr.push(open);
}
viewTableThree()
{

  this.CloseTable=false;
  this.OpenTable=true;
  this.AllTable=false;
}
viewTableFour()
{
  this.AllTable=false;

  this.CloseTable=true;
  this.OpenTable=false;
}
getProfile()
{
  this.tableView=false;
  this.ticketView=false;
  this.profileView=true;
  this.editprofileView=false;
  this.resetPage=false;
  this.closedPage=false;
}

getEditPage()
{
  this.tableView=false;
  this.ticketView=false;
  this.profileView=false;
  this.editprofileView=true;
  this.resetPage=false;
  this.closedPage=false;
}
getResetpage()
{
  this.tableView=false;
  this.ticketView=false;
  this.profileView=false;
  this.editprofileView=false;
  this.resetPage=true;
  this.closedPage=false;
}

Clickdropdown()
{
this.prioritydrop=true;

}
ClickdropdownTwo()
{
this.Questiontrueone=true;
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
this.api.editEmployee(DataAdd,this.adminDetailsValue.email)
.subscribe(res=>{
 console.log(res);
 alert("update Sucessfully")

 let ref = document.getElementById('cancel')
 ref?.click();

 sessionStorage.setItem('Adminpage',JSON.stringify(res));
 location.reload();
},
err=>{
   alert("something went wrong")
})

}
checkprevisouspass()
{
  this.api.getuserbyemail(this.adminDetailsValue.email)
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
  this.api.passwordUpdate(DataAdd,this.adminDetailsValue.email)
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

getticket(){
  
  this.api.getticketbyallocator(this.adminDetailsValue.firstname)
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
      
            this.progressBarPercentageone= (this.ticketuser.length - this.openedArr.length)*10;
          }
          if(e.status == "ticket pending")
            {
              this.pendingArr.push(e);
        
              this.progressBarPercentagetwo= (this.ticketuser.length - this.pendingArr.length)*10;
            }
            if(e.status == "ticket closed")
              {
                this.closedArr.push(e);
          
                this.progressBarPercentagethree= (this.ticketuser.length - this.closedArr.length)*10;
              }
              
  })
  
}



viewTableOne()
{
  this.AllTable=true;
  this.CloseTable=false;
  this.OpenTable=false;

}
ticketClosing(id:any){
  console.log("inside change pass ")
  var ticketDest = <HTMLInputElement>document.getElementById('ticketDescription');
  const description:string=ticketDest.value;
  const DataAdd={
    ticketDescription:description,
    status:"ticket closed"
   }
  console.log(DataAdd,"Data");
  this.api.closingticketbyallocator(DataAdd,id)
  .subscribe(res=>{
   console.log(res);
   alert("Ticket has closed sucessfully")
  
   let ref = document.getElementById('cancel')
   ref?.click();
   location.reload();

  },
  err=>{
     alert("something went wrong")
  })


  // this.http.get<any>('http://localhost:3000/ticketdetails?id='+id)
  // .subscribe(res=>{
  //   var check = res.find((c:any)=>{
  //     return c.id == id;
  //   });
  //   console.log("check=",check);
  //   console.log("adminuser firstname",data);
   
  //     if(check){
  //       check.ticketDescription=ticketDest.value;
  //       check.status="ticket closed"
  //       this.api.update2(check,id)    
         
  //        .subscribe(res=>{
  //         alert("Updated Successfully");
  //        let ref = document.getElementById('cancel');
  //        ref?.click();
  //        location.reload()
  //       })
     }
     
  


  
  



}
