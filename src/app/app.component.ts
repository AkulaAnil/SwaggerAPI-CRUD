import {Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ApiServiceService } from './api-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

export interface Department {
  deptArbName: string;
  deptName: string;
  dept_Multiple_Token: number;
  floorId: number;
  orgId: number;
  deptId: number;
}

export interface RootObject {
  departments: Department[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public users:Department[];

  public dataSource;
  displayedColumns: string[] = ['deptArbName', 'deptId', 'deptName', 'dept_Multiple_Token', 'floorId', 'orgId'];
  

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private apiService: ApiServiceService,private snackBar: MatSnackBar, private dialog: MatDialog){
    this.getData();
  }

  getData(){
    this.apiService.getApi().subscribe( res => {
      this.users = res['departments'];
      this. dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.openSnackBar('Success','Completed')
    },
    (error) => {
      console.log("Error->" , error);
      this.openSnackBar('Error','Pending');
    })      
  }

  // Snack Bar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
  }

 // POST  API
  createData(){
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Result', result);
      this.apiService.postApi(result).subscribe( resPost => {
        this.users = resPost['departments'];
        this. dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getData();
      })
    });
  }

  // PUT  API
  editData(edit){
    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      data: edit
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  deleteData(deptId){
    this.apiService.deleteApi(deptId).subscribe( resDelete => {
      for(var i=0; i< this.users.length; i++){console.log("for loop", this.users.length)
        if(this.users[i].deptId === deptId){
          this.users.splice(i,1);
          this. dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
      this.openSnackBar('Deleted','SuccessFully');
    },
    error => {
      console.log(error);
      this.openSnackBar('Deleted','Failure');
    })
  }

  

}
