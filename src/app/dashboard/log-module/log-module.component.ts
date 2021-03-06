import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BotService } from '../../services/bot.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-module',
  templateUrl: './log-module.component.html',
  styleUrls: ['./log-module.component.css']
})
export class LogModuleComponent implements OnInit {
  displayedColumns: string[] = ['number', 'by', 'old', 'new', 'at'];
  dataSource = new MatTableDataSource();
  changes: any[] = [];
  botOwner: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private botService: BotService,
    public userService: UserService) {}

  async ngOnInit() { 
    const id = this.route.snapshot.paramMap.get('id');

    const log = await this.botService.getSavedLog(id);
    this.changes = log.changes.reverse();
    
    this.dataSource = new MatTableDataSource(this.changes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }
}
