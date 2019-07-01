import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateComponent>, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      deptArbName: ['', Validators.required],
      dept_Multiple_Token: ['', Validators.required],
      deptName: ['', Validators.required],
      floorId: ['', Validators.required],
      orgId: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  

}
