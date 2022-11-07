import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from './core/logger.service';
import { degrees, PDFDocument, StandardFonts } from 'pdf-lib';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  //Declare Property
  pdfFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  scrollTouchBottom: boolean = false;

  pdfTemplateSrc = "assets/PdfFile/Leave_Letter.pdf";
  approvedImageURL = "assets/PdfFile/ApprovedImage.png";
  pdfSrc!: string;
  enableDownload: boolean = false;


  loadedPDFFile: boolean = false;
  @ViewChild('pdfFormModalOpen') pdfFormModalOpen!: ElementRef;
  @ViewChild('closeModalPopup') closeModalPopup!: ElementRef;
  pageVariable: number = 1;

  constructor(
    private fb: FormBuilder,
    private loggerService: LoggerService,
    private spinner: NgxSpinnerService)
  {

  }
  ngOnInit(): void
  {
    this.bindScrollEvent();
    this.loadFormIntialization();
  }


  //Submit The Form Value 
  onSubmit()
  {
    this.isSubmitted = true;
    if (!this.pdfFormGroup.valid)
      return;
    this.pdfFormModalOpen.nativeElement.click();
    this.spinner.show();
    this.loggerService.logInformation('FormValue', this.pdfFormGroup.value);
    this.BindPDFData(this.pdfFormGroup.value, false);
  }


  //To Declare The Forms
  loadFormIntialization()
  {
    this.pdfFormGroup = this.fb.group({
      studentName: ['', Validators.required],
      rollNumber: ['', Validators.required],
      departmentName: ['', Validators.required],
      collageName: ['', Validators.required],
      collageCity: ['', Validators.required],
      through: ['', Validators.required]
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
    this.scrollTouchBottom = false;
    this.pdfSrc = '';
    this.enableDownload = false;
  }


  loadCompletePdf(event: any)
  {
    this.loggerService.logInformation('load Completed Pdf', event);
  }

  loadPdfDocument(event: any)
  {
    this.loggerService.logInformation('load Start Pdf', event);
  }

  bindScrollEvent()
  {
    const pdfScroll = document.querySelector('.ng2-pdf-viewer-container');
    if (pdfScroll)
    {
      pdfScroll.addEventListener('scroll', (event: any) =>
      {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight)
          this.scrollTouchBottom = true;
        else
          this.scrollTouchBottom = false;
      });
    }

  }


  async BindPDFData(formValue: any, signature: boolean)
  {
    let currentDate: Date = new Date();

    const formPdfBytes = await fetch(this.pdfTemplateSrc).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.CourierOblique);

    const form = pdfDoc.getForm();
    this.loggerService.logInformation('formfields', form);

    //From Fields
    const txt_StudentName = form.getTextField('txt_StudentName');
    const txt_RollNo = form.getTextField('txt_RollNo');
    const txt_DepartmentName = form.getTextField('txt_DepartmentName');
    const txt_CollegeName = form.getTextField('txt_CollegeName');
    const txt_ColleageCity = form.getTextField('txt_ColleageCity');

    //To Fields
    const txt_Through = form.getTextField('txt_Through');
    const txt_Through_Department = form.getTextField('txt_Through_Department');
    const txt_Through_CollegeName = form.getTextField('txt_Through_CollegeName');
    const txt_Through_CityName = form.getTextField('txt_Through_CityName');



    //Letter Name Fields
    const txt_LetterName = form.getTextField('txt_LetterName');

    //Signature And Date
    if (signature)
    {
      const txt_Signature = form.getTextField('txt_Signature');
      txt_Signature.setFontSize(19);
      txt_Signature.setText(this.pdfFormGroup.controls['studentName'].value.toString());
      txt_Signature.updateAppearances(timesRomanFont);
      txt_Signature.setText(formValue.studentName);

      const pages = pdfDoc.getPages();
      const placeImage = pages[0];

      const imageBytes = await fetch(this.approvedImageURL).then((res) => res.arrayBuffer());
      const jpgImage = await pdfDoc.embedPng(imageBytes);
      const jpgDims = jpgImage.scale(0.25);

      placeImage.drawImage(jpgImage, {
        x: placeImage.getWidth() / 2 - jpgDims.width / 2,
        y: placeImage.getHeight() / 2 - jpgDims.height / 2,
        width: jpgDims.width,
        height: jpgDims.height,
        rotate: degrees(-45)
      });

      this.enableDownload = true;
    }
    const txt_Date = form.getTextField('txt_Date');

    //Bind All Values In A PDF
    txt_StudentName.setText(formValue.studentName);
    txt_RollNo.setText(formValue.rollNumber);
    txt_DepartmentName.setText(formValue.departmentName);
    txt_CollegeName.setText(formValue.collageName);
    txt_ColleageCity.setText(formValue.collageCity);

    txt_Through.setText(formValue.through);
    txt_Through_Department.setText(formValue.departmentName);
    txt_Through_CollegeName.setText(formValue.collageName);
    txt_Through_CityName.setText(formValue.collageCity);

    txt_LetterName.setText(formValue.studentName);

    txt_Date.setText(currentDate.getDate().toString().concat('-', currentDate.getMonth().toString(), '-', currentDate.getFullYear().toString()));

    form.flatten();

    const pdfBytes = await pdfDoc.save();

    const blop = new Blob([pdfBytes], {
      type: 'application/pdf'
    });
    this.pdfSrc = window.URL.createObjectURL(blop);

    setTimeout(() =>
    {
      this.loadedPDFFile = true;
      this.spinner.hide();
    }, 1000);
  }


  async SignaturePlace(event: any)
  {
    this.BindPDFData(this.pdfFormGroup.value, event.target.checked);
    this.loggerService.logInformation('Checked Signature Check', event.target.checked);
  }

  downloadLetter()
  {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.setAttribute("href", this.pdfSrc);
    link.setAttribute("download", "PdfBindLetter.pdf");
    link.click();
    this.closeModalPopup.nativeElement.click();
  }
}
