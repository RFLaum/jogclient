import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appCheckNumber]',
  providers: [{provide: NG_VALIDATORS,
               useExisting: CheckNumberDirective,
               multi: true}]
})
export class CheckNumberDirective implements Validator {

  validate(c: AbstractControl): {[key: string]: any} | null {
    let num = Number(c.value);
    return (isNaN(num) || num <= 0) ? {"valid number": true} : null;
  }
}
