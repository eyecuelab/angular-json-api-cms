import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.html',
})

export class WarningDialogComponent implements OnInit {
  warningMessage: string;
  yesNo: boolean;

  constructor(public dialogRef: MdDialogRef<WarningDialogComponent>,
              @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any) {}

  ngOnInit(): void {
    this.warningMessage = this.dialogData.message;
    this.yesNo = this.dialogData.yesNo;
  }

}
