import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TransportsService} from '../services/transports.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  transports=new Array();
  filteredOptions: Observable<string[]>;
  title: string = 'My first AGM project';
  lat: number = 16.753554;
  lng: number = -93.133517;
  route:{};
  constructor(public tranportService:TransportsService) {
    
  }
  
  ngOnInit() {
    
    // init this.user on startup
    this.tranportService.allTransports({limit:1000}).subscribe(data => {
      this.transports=data.data;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
      );
    }
    showRoute(route){
      this.route={};
      this.tranportService.getById(route).subscribe(data => {
          this.route=data.data;
      });
    }
    clearRoute(){
        this.route=Object.assign({},{});;
    }
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      
      return this.transports.filter(option => option.lineNumber.toLowerCase().includes(filterValue));
    }
    
  }
  