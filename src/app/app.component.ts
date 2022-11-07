import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggerService } from './core/logger.service';


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
  //pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSrc = "assets/PdfFile/Leave_Letter.pdf";
  loadedPDFFile: boolean = false;
  @ViewChild('pdfFormModalOpen') pdfFormModalOpen!: ElementRef;
  pageVariable: number = 1;

  constructor(private fb: FormBuilder, private loggerService: LoggerService, private spinner: NgxSpinnerService)
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
    setTimeout(() =>
    {
      this.loadedPDFFile = true;
      this.spinner.hide();
      this.loggerService.logInformation('3sec', 'afterworking');
    }, 2000);
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

  bindScrollEvent()
  {
    const pdfScroll = document.querySelector('.ng2-pdf-viewer-container');
    if (pdfScroll)
    {
      pdfScroll.addEventListener('scroll', (event: any) =>
      {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight)
        {
          this.loggerService.logInformation('Scroll Event Checking', 'Touch Bottom');
        }
        this.loggerService.logInformation('Scroll Event Checking', 'Working Fine Event');
      });
    }

  }


  test()
  {
    //var fillPdf = require("pdffiller-stream");
    // var fillPdf = require("fill-pdf");
    // var formData = { txt_LetterName: 'Udhayarajan J' };
    // var pdfTemplatePath = "templates.pdf";

    // app.get('/filled_form.pdf', function (req, res)
    // {
    //   fillPdf.generatePdf(formData, pdfTemplatePath, (err, output)
    //   {
    //     if (!err)
    //     {
    //       res.type("application/pdf");
    //       res.send(output);
    //     }
    //   });
    // });
  }
}
