import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { AddService } from '../Services/add.service';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Fruit } from '../interface/fruit';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  userForm! : FormGroup;
  successText!:string


  @Output('onFormSubmit') onFormSubmit: EventEmitter<any> = new EventEmitter();
  @Input('item') item: any = null;

  
  // users!:any[];
  status: string[] = [
    'Active',
    'Off',
  ]
  constructor( private _fb: FormBuilder, private _AddService: AddService, private _matDraWer: MatDrawer ){
    this.userForm=this._fb.group({
      firstName: ['', ([Validators.required, Validators.minLength(2)])],
      lastName: ['', ([Validators.required])],
      email: ['', ([Validators.required, Validators.email])],
      userStatus: ['', ([Validators.required])],
      roles: ['', ([Validators.required])]
    })
  }

  ngOnInit(): void {
    console.log('ng-init', this.item);
    if (this.item) {
      this.userForm.patchValue(this.item);
    }
  }

  cancelForm(){
    this._matDraWer.close()
  };

  onSubmit(){
    if (this.item) {
       // edit
       this._AddService.editTeg(this.item.id, this.userForm.value).subscribe((res: any) => {
        if (res) {
          this.cancelForm();
          this.onFormSubmit.emit('edit')
        }
       })
    } else {
      // add
      this._AddService.AddTeg(this.userForm.value).subscribe({
          next: (res: any) => {
            
            if(res){ 
              
            this.cancelForm();
            this.onFormSubmit.emit('add');
              //this.successText = 'You have successfully added a user'
          }
          }
        }
          // როდესაც subscrible-ს აკეთებ აქ შემოგდის ყველაფერი ის რაც გაგზავნის შემდეგ მოხდება 
          // res => this.users = res
        )
      }
    }
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    fruits: Fruit[] = [];
  
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
  
      // Add our fruit
      if (value) {
        this.fruits.push({name: value});
      }
  
      // Clear the input value
      event.chipInput!.clear();
    }
  
    remove(fruit: Fruit): void {
      const index = this.fruits.indexOf(fruit);
  
      if (index >= 0) {
        this.fruits.splice(index, 1);
      }
    }
  
    edit(fruit: Fruit, event: MatChipEditedEvent) {
      const value = event.value.trim();
  
      // Remove fruit if it no longer has a name
      if (!value) {
        this.remove(fruit);
        return;
      }
  
      // Edit existing fruit
      const index = this.fruits.indexOf(fruit);
      if (index >= 0) {
        this.fruits[index].name = value;
      }
    }
  }
  

