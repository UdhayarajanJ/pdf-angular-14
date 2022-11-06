import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from './core/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 //Declare Property
 pdfFormGroup!: FormGroup;
 isSubmitted: boolean = false;
 //pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
 pdfSrc = "../assets/PdfFile/marksheets_transfercertificates.pdf";
 @ViewChild('pdfFormModalOpen') pdfFormModalOpen!: ElementRef;
 pageVariable: number = 1;

 constructor(private fb: FormBuilder, private loggerService: LoggerService, private spinner: NgxSpinnerService)
 {

 }
 ngOnInit(): void
 {
   this.loadFormIntialization();
 }


 //Submit The Form Value 
 onSubmit()
 {
   this.isSubmitted = true;
   if (!this.pdfFormGroup.valid)
     return;

 }


 //To Declare The Forms
 loadFormIntialization()
 {
   this.pdfFormGroup = this.fb.group({
     studentName: ['', Validators.required],
     rollNumber: ['', Validators.required],
     departmentName: ['', Validators.required],
     collageName: ['', Validators.required],
     collageCity: ['', Validators.required]
   });
 }

 //Get Whether Form Error Is There Or Not
 get f()
 {
   return this.pdfFormGroup.controls;
 }

 //clearForm
 clearForm()
 {
   this.loadFormIntialization();
   this.isSubmitted = false;
 }
 scroll()
 {
   this.loggerService.logInformation('Scroll Event Checking', 'Working Fine Event');
 }

 loadCompletePdf(event: any)
 {
   this.loggerService.logInformation('load Completed Pdf', event);
 }

 loadPdfDocument(event: any)
 {
   this.loggerService.logInformation('load Start Pdf', event);
 }
}
