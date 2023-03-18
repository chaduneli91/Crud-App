import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AddService} from './Services/add.service';
import { MatDrawer } from '@angular/material/sidenav';
import { debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FormControl } from '@angular/forms';
import { CrudInterface} from './interface/crud-interface'
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 

  displayedColumns: string[] = [ 'picture', 'email',  'firstName', 'lastName', 'roles', 'userStatus', 'edit', 'delete' ];

  dataSource!: MatTableDataSource<CrudInterface> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatDrawer) drawer!: MatDrawer;
  


  nameControl: FormControl= new  FormControl('');
  constructor(private _listService:AddService, private _matDialog: MatDialog, private _liveAnnouncer: LiveAnnouncer ){}
  
  editableItem = null;

  add() {
    this.edit(null);
  }

  edit(item: any) {
    this.editableItem = item;
    this.drawer.toggle();
  }

  
  
  
  ngOnInit(): void {
    this.getList();
    this.nameControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      res => {
        console.log(res) //თვალსაჩინოებისთვის
      }
    )
  }
  
  
getList(){
  this._listService.list().subscribe(
    (res: CrudInterface[]) => {
      
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      
    }
  )
  
}

deleteList(listId: number){
  
  const dialog = this._matDialog.open(DeleteDialogComponent, { });

  dialog.afterClosed().subscribe(
    res => {
      if (res) {
        this._listService.delete(listId).subscribe(() => this.getList())
      }

    } 
  )
  
};

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    if(this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }


  }
}
