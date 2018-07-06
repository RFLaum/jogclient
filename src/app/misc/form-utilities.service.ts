//utilites useful for managing forms

import { Injectable } from '@angular/core';
import { NgForm, ValidationErrors, AbstractControl } from '@angular/forms';

type ErrDetail = {name: string, errs: ValidationErrors, control: AbstractControl};
type ReadableError = {name: string, errs: string[], control: AbstractControl};

@Injectable({
  providedIn: 'root'
})
export class FormUtilitiesService {

  constructor() { }

  // parse a value into a valid string; null and undefined are rendered as
  // empty string.
  parseAsString(str: string): string {
    return str || "";
  }
  // string equality test that treats null and undefined as empty strings
  compareStrings(str1: string, str2: string): boolean {
    return this.parseAsString(str1) == this.parseAsString(str2);
  }

  // remove blank values from form data that's going to be serialized to JSON
  removeBlank(form: NgForm): any {
    let val = form.value;
    for (let prop in val)
      val[prop] = val[prop] || undefined;
    return val;
  }

  // get array all keys of a given object
  getKeys(obj: any): string[] {
    return obj === null ? null : Object.keys(obj);
  }

  // get errors of all child controls
  getChildErrors(f: NgForm): ErrDetail[] {
    let answer: ErrDetail[] = [];

    const controls = f.controls;
    for (let name in controls){
      const control = controls[name];
      const errs = control.errors;
      if (errs) answer.push({name: name, errs: errs, control: control});
    }

    return answer;
  }

  //set errors of child controls
  addChildErrors(f: NgForm, errs: ValidationErrors){
    for (let field in errs){
      let control: AbstractControl = f.controls[field];
      let oldErrors = this.errTranslate(control.errors);
      for (let message of errs[field])
        oldErrors[message] = true;
      control.setErrors(oldErrors);
    }
  }

  // get errors of child controls in a readable format
  getParsedErrors(f: NgForm): ReadableError[] {
    let answer: ReadableError[] = [];
    const rawErrors = this.getChildErrors(f);

    for (let detail of rawErrors){
      let outputs: string[] = [];
      for (let key in detail.errs)
        switch (key) {
          case "min": {outputs.push("is too low"); break;}
          case "max": {outputs.push("is too high"); break;}
          case "required": {outputs.push("is required"); break;}
          case "email": {outputs.push("is not a valid email address"); break;}
          case "minlength": {outputs.push("is too short"); break;}
          case "maxlength": {outputs.push("is too long"); break;}
          case "pattern": {
            outputs.push("does not match the required format"); break;
          }
          case "match": {outputs.push("must match " + detail.errs[key]); break;}
          default: {outputs.push(key); break;}
        }
      answer.push({name: detail.name, errs: outputs, control: detail.control});
    }

    return answer;
  }

  private errTranslate(input: ValidationErrors|null): ValidationErrors {
    return input || {};
  }
}
