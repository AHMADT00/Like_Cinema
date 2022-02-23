import { RegistrationService } from './../../services/registration.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Registration } from 'src/app/interfaces/registration';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css'],
})
export class ClientRegistrationComponent implements OnInit {
  dataSource!: MatTableDataSource<Registration>;
  registration: Registration[] = [];
  displayedColumns: string[] = [
    'clientUserName',
    'clientPhoneNumber',
    'clientCarPlate',
    'selectedMovies',
    'clientId',
  ];
  row;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private register: RegistrationService) {}

  ngOnInit(): void {
    this.register.GetRegistration().subscribe(
      (res) => {
        this.registration = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });

        this.dataSource = new MatTableDataSource(this.registration);
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
}
