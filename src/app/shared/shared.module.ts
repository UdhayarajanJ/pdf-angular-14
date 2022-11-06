import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllowOnlyCharacterDirective } from './Directives/allow-only-character.directive';
import { AllowOnlyCharacterAndNumberDirective } from './Directives/allow-only-character-and-number.directive';

const sharedDirectives = [
  AllowOnlyCharacterDirective,
  AllowOnlyCharacterAndNumberDirective
];

@NgModule({
  declarations: [
    sharedDirectives
  ],
  imports: [
    CommonModule
  ],
  exports:[sharedDirectives]
})
export class SharedModule { }
