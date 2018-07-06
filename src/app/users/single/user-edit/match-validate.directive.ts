//checks to make sure the password and confirm password fields match

import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, NgModel } from '@angular/forms';

@Directive({
  selector: '[checkAgainst]',
  providers: [{provide: NG_VALIDATORS,
               useExisting: MatchValidateDirective,
               multi: true}]
})
export class MatchValidateDirective implements Validator, OnChanges {
  @Input() checkAgainst: any;
  @Input() otherName: string;
  private _onChange: () => void;

  validate(c: AbstractControl): {[key: string]: any} | null {
    if (c.value != this.checkAgainst)
      return {match: this.otherName};
    return null;
  }

  // update errors when the other field changes as well as when this one does
  ngOnChanges(changes: SimpleChanges){
    if (this._onChange && "checkAgainst" in changes) this._onChange();
  }

  registerOnValidatorChange(func: () => void) {this._onChange = func;}

}
