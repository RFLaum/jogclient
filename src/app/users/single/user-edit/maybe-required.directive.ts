// a toggleable required validator; can pass either true or false to set
// whether it's turned on or off

import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appMaybeRequired]',
  providers: [{provide: NG_VALIDATORS,
               useExisting: MaybeRequiredDirective,
               multi: true}]
})
export class MaybeRequiredDirective implements Validator {
  @Input("appMaybeRequired") required: boolean;

  validate(c: AbstractControl): {[key: string]: any} | null {
    if (!this.required) return null;
    let val = c.value;
    return (val == null || val.length === 0) ? {required: true} : null;
  }

}
