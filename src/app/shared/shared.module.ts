import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllowOnlyCharacterDirective } from './Directives/allow-only-character.directive';
import { AllowOnlyCharacterAndNumberDirective } from './Directives/allow-only-character-and-number.directive';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

const sharedDirectives = [
  AllowOnlyCharacterDirective,
  AllowOnlyCharacterAndNumberDirective
];



@NgModule({
  declarations: [
    sharedDirectives,

  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    FormsModule
  ],
  exports: [sharedDirectives]
})
export class SharedModule { }
