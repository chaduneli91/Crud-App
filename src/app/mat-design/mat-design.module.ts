import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatToolbarModule, MatSidenavModule, MatFormFieldModule, MatIconModule,
     MatInputModule, MatCardModule, MatSelectModule, MatButtonModule, MatTableModule,
      MatPaginatorModule, MatDialogModule, MatChipsModule ]
})
export class MatDesignModule { }
