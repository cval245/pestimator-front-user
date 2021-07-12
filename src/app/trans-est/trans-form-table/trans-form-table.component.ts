import { Component, OnInit, Input } from '@angular/core';
import { IAllowTrans } from '../_models/AllowTrans.model';
import { ICountryOANum } from '../_models/CountryOANum.model';
import { ICustomFilTrans } from '../_models/CustomFilTrans.model';
import { IIssueTrans } from '../_models/IssueTrans.model';
import { IOATrans } from '../_models/OATrans.model';
import { IPublTrans } from '../_models/PublTrans.model';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from '@angular/forms';
import { Country } from 'src/app/characteristics/_models/Country.model';
import { ApplType } from 'src/app/characteristics/_models/applType.model';


@Component({
  selector: 'app-trans-form-table',
  templateUrl: './trans-form-table.component.html',
  styleUrls: ['./trans-form-table.component.scss']
})
export class TransFormTableComponent implements OnInit {
  @Input() countries: Country[] = [new Country(0, '', '')]
  @Input() applTypes: ApplType[] = [new ApplType]
  @Input() cstmFilTrans = new Array<ICustomFilTrans>()
  @Input() allowTrans = new Array<IAllowTrans>()
  @Input() publTrans = new Array<IPublTrans>()
  @Input() oaTrans = new Array<IOATrans>()
  @Input() issueTrans = new Array<IIssueTrans>()
  @Input() oaNum = new Array<ICountryOANum>()
  editingRow: number = 0;
  displayedColumns: string[] = ['id', 'country', 'prev_appl_type', 
                                 'appl_type', 'date_diff']
  public form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id : [''],
      country: ['', Validators.required],
      date_diff: ['', Validators.required],
      appl_type: ['', Validators.required],
      prev_appl_type: ['']
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log('cddd', this.cstmFilTrans)
  }

  editRow(row: ICustomFilTrans) {
    // edit row??? 
    // 
    console.log('rowo', row)
    this.editingRow = row.id
    if (row.prev_appl_type == undefined){
      row.prev_appl_type = ''
    }
    this.form.setValue({
      id: row.id,
      country: row.country,
      date_diff: row.date_diff,
      appl_type: row.appl_type,
      prev_appl_type: row.prev_appl_type,
    })
    console.log('editing row', row)
  }

  submit(){
    console.log('form = ', this.form)
  }
  cancel(){
    console.log('cancel')
    this.editingRow = 0
    this.form.reset()
  }
}
