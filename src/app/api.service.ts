import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators' ; 
import{ Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
 
  createEmployee(data:any):Observable<any>{
   const apiUrl= "http://localhost:5000/employeeDetails/"
   return this.http.post(`${apiUrl}`,data);


  } 
  createTicket(data:any):Observable<any>{
    const apiUrl= "http://localhost:5000/ticketDetails/"
    return this.http.post(`${apiUrl}`,data);
   }
  
   deleteAdmin(email : any):Observable<any>{
    const Url='http://localhost:5000/deleteemployee';
    const Id=email; 
    return this.http.delete(`${Url}/${Id}`);  
  }
  update2(data: any,id:any ){
   
    return this.http.put<any>("http://localhost:3000/ticketdetails/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getuser(email:any){ 
    const loginUrl='http://localhost:5000/getemployeebyemail';
    const emailId=email; 
    return this.http.get(`${loginUrl}/${emailId}`);  
    
  } 
  getuserbyemail(email:any)
  {
    const Url='http://localhost:5000/employeebyEmail';
    const emailId=email; 
    console.log(emailId,"emailId");
    return this.http.get(`${Url}/${emailId}`);  
  }
 
  getticket(email:any){ 
    const Url='http://localhost:5000/ticketbyemail';
    const emailId=email; 
    console.log(emailId,"emailId");
    return this.http.get(`${Url}/${emailId}`);  
    
  }
  getTeam(category:any){
    const Url='http://localhost:5000/teamAllTeam';
    const categoryType=category; 
    return this.http.get(`${Url}/${categoryType}`)
  }
  getAllTicket()
  {
    const Url='http://localhost:5000/getAllticket';
    return this.http.get(`${Url}`)
  }
  getLogin(email:any,pass:any)
  {
    const loginUrl='http://localhost:5000/getemployee';
    const emailId=email;
    const passId=pass;
    const result= this.http.get(`${loginUrl}/${emailId}/${passId}`);
    return result;
    ;
  } 
  passwordUpdate(data : any,email:any): Observable<any>
  {
    const apiUrl= "http://localhost:5000/updatePassword"
    const emailId=email;
    return this.http.put(`${apiUrl}/${emailId}`,data);
  }
editEmployee(data : any,email:any): Observable<any>{
   console.log("updateemployee")
  const apiUrl= "http://localhost:5000/updateEmployee"
  const emailId=email;
  return this.http.put(`${apiUrl}/${emailId}`,data);
}
upadteAdminAllocator(data : any,id:any)
{
  const Url= "http://localhost:5000/updateadminAllocator"
  const Id=id;
  return this.http.put(`${Url}/${Id}`,data);
}
getticketbyallocator(adminallocater:any)
{
const Url='http://localhost:5000/ticketbyallocatorname';
const adminallocaterName=adminallocater; 
return this.http.get(`${Url}/${adminallocaterName}`);  
}
closingticketbyallocator(data : any,id:any)
{
  const Url= "http://localhost:5000/closingTicket"
  const Id=id;
  return this.http.put(`${Url}/${Id}`,data);
}
get1(){
  return this.http.get<any>('http://localhost:3000/ticketdetails/')
  .pipe(map((res)=>{
    return res;
  }))
}
}
