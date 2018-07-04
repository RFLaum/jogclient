import { Injectable } from '@angular/core';
import { NgForm, ValidationErrors, AbstractControl } from '@angular/forms';

type ErrDetail = {name: string, errs: ValidationErrors, control: AbstractControl};
type ReadableError = {name: string, errs: string[], control: AbstractControl};

@Injectable({
  providedIn: 'root'
})
export class FormUtilitiesService {

  constructor() { }

  getKeys(obj: any): string[] {
    return obj === null ? null : Object.keys(obj);
  }

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
}
