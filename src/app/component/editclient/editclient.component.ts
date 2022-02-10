import { Client } from './../../interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
let undoClients: Client[] = [];
let undoEditClients: {};
let undoClientsId;
@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css'],
})
export class EditclientComponent implements OnInit {
  clients: Client[] = [];
  delete: string[] = [];
  deleteAll = false;
  displayedColumns: string[] = [
    'email',
    'userName',
    'phoneNumber',
    'teleNumber',
    'isadmin',
    'iptvSub',
    'edit',
  ];
  row;
  dataSource!: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ClientsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.service.GetClient().subscribe(
      (res) => {
        this.clients = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          data.checked = false;
          data.edit = false;
          return data;
        });
        this.dataSource = new MatTableDataSource(this.clients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        alert('Error while fetching data');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  IsAdmin(client) {
    if (client.isadmin == true) {
      return 'Yes';
    } else {
      return 'No';
    }
  }
  IPTVSub(client) {
    if (client.iptvSub == true) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  Edit(row, id) {
    if (row.edit == false) {
      undoClientsId = id;
      undoEditClients = {
        userName: row.userName,
        email: row.email,
        password: row.password,
        phoneNumber: row.phoneNumber,
        teleNumber: row.teleNumber,
        iptvSub: row.iptvSub,
        isadmin: row.isadmin,
      };
      row.edit = true;
    } else if (row.edit == true) {
      row.edit = false;
      this.openSnackBar('editsuccess');
      this.service.EditClient(row, id);
    }
  }
  AddtoDelete(n) {
    this.clients.forEach((Client) => {
      if (Client.id == n) {
        if (Client.checked == false) {
          this.delete.push(n);
        } else {
          for (var i = 0; i < this.delete.length; i++) {
            if (this.delete[i] == n) {
              this.delete.splice(i, 1);
            }
          }
        }
      }
    });
  }
  DeleteAll() {
    if (this.deleteAll == true) {
      this.clients.forEach((Client) => {
        this.AddtoDelete(Client.id);
        Client.checked = true;
      });
    } else {
      this.clients.forEach((Client) => {
        Client.checked = false;
        this.delete = [];
      });
    }
    this.deleteAll = false;
  }
  DeleteClient() {
    if (
      this.delete.length == 0 &&
      this.displayedColumns[this.displayedColumns.length - 1] != 'id'
    ) {
      this.openSnackBar('selectdelete');
      this.displayedColumns.push('id');
      for (var i = 0; i < this.displayedColumns.length; i++) {
        if (this.displayedColumns[i] == 'edit') {
          this.displayedColumns.splice(i, 1);
        }
      }
    } else {
      if (this.delete.length == 0) {
        this.openSnackBar('empty');
        for (var i = 0; i < this.displayedColumns.length; i++) {
          if (this.displayedColumns[i] == 'id') {
            this.displayedColumns.splice(i, 1);
          }
        }
        this.displayedColumns.push('edit');
      } else {
        this.delete.forEach((element) => {
          this.clients.forEach((movie) => {
            if (movie.id == element) {
              undoClients.push(movie);
            }
          });
          this.service.DeleteClient(element);
        });
        this.openSnackBar('deletesuccess');
        this.delete = [];
        for (var i = 0; i < this.displayedColumns.length; i++) {
          if (this.displayedColumns[i] == 'id') {
            this.displayedColumns.splice(i, 1);
          }
        }
        this.displayedColumns.push('edit');
        setTimeout(() => {
          undoClients = [];
        }, 4000);
      }
    }
  }
  openSnackBar(n) {
    if (n == 'selectdelete') {
      this._snackBar.openFromComponent(SelectDeleteComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    } else if (n == 'empty') {
      this._snackBar.openFromComponent(EmptyDeleteComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    } else if (n == 'deletesuccess') {
      this._snackBar.openFromComponent(DeleteSuccessComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    } else if (n == 'editsuccess') {
      this._snackBar.openFromComponent(EditSuccessComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    }
  }
}
@Component({
  selector: 'select-delete-snack',
  templateUrl: 'select-delete-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class SelectDeleteComponent {}

@Component({
  selector: 'empty-delete-snack',
  templateUrl: 'empty-delete-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class EmptyDeleteComponent {}
@Component({
  selector: 'delete-success-snack',
  templateUrl: 'delete-success-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
      button {
        border: none;
        background: none;
        color: red;
        font-weight: 900;
        font-size: 14px;
      }
    `,
  ],
})
export class DeleteSuccessComponent {
  constructor(private clientser: ClientsService) {}

  UndoDelete() {
    undoClients.forEach((Client) => {
      this.clientser.AddClient(Client);
    });
    undoClients = [];
  }
}
@Component({
  selector: 'edit-success-snack',
  templateUrl: 'edit-success-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
      button {
        border: none;
        background: none;
        color: red;
        font-weight: 900;
        font-size: 14px;
      }
    `,
  ],
})
export class EditSuccessComponent {
  constructor(private clientser: ClientsService) {}
  UndoEdit() {
    this.clientser.EditClient(undoEditClients, undoClientsId);
  }
}
