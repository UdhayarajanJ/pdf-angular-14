import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 //Declare Property
 pdfFormGroup!: FormGroup;
 isSubmitted: boolean = false;

 @ViewChild('pdfFormModalOpen') pdfFormModalOpen!: ElementRef;


 constructor(private fb: FormBuilder)
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
   this.pdfFormModalOpen.nativeElement.click();
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
}
