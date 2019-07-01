import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Department } from '../app.component';
import { ApiServiceService } from '../api-service.service';

export interface Department {
  deptArbName: string;
  deptName: string;
  dept_Multiple_Token: number;
  floorId: number;
  orgId: number;
  deptId: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  updateData:Department;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Department, public dialogRef: MatDialogRef<EditComponent>, private fb: FormBuilder, private apiService: ApiServiceService) {
    this.editForm = this.fb.group({
      deptArbName: ['', Validators.required],
      deptName: ['', Validators.required],
      dept_Multiple_Token: ['', Validators.required],
      floorId: ['', Validators.required],
      orgId: ['', Validators.required],
      deptId: ['', Validators.required]
    });
    if(data){
      this.editForm.patchValue(data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  getupdatedata(){
    this.updateData={
      deptArbName:this.editForm.value.deptArbName,
      deptName: this.editForm.value.deptName,
      dept_Multiple_Token: this.editForm.value.dept_Multiple_Token,
      floorId: this.editForm.value.floorId,
      orgId: this.editForm.value.orgId,
      deptId: this.editForm.value.deptId
    }
    this.apiService.putApi(this.updateData).subscribe( resPut => {
      if(resPut){
        this.dialogRef.close(this.updateData);
      }
    })
  }


}
